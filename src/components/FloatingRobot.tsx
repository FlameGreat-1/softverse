"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import robotSaysHi from "../animations/robot-says-hi.json";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import RagChat from "./RagChat";
import { loadStagedFiles, saveStagedFiles, clearStagedFiles } from "@/lib/fileStore";

export interface Attachment {
  name: string;
  mimeType: string;
  data: string;
}

export interface Message {
  sender: "user" | "bot";
  text: string;
  attachments?: Attachment[];
}

const STORAGE_KEY = "flamo_chat_session";
const TTL_DAYS = 7; // Auto-clears after 7 days of inactivity

interface StoredSession {
  messages: Message[];
  input?: string;
  // stagedFiles intentionally omitted: base64 is stripped before saving to prevent
  // localStorage QuotaExceeded. Without binary data, restoration is meaningless.
  // Users must re-select files after a page refresh. This is by design.
  expiresAt: number; // Unix timestamp ms
}

export default function FloatingRobot() {
  // State lives here — survives modal open/close, persists across all browser sessions
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  // Restore from localStorage on mount, respecting TTL
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const session: StoredSession = JSON.parse(raw);
        if (Date.now() < session.expiresAt) {
          setMessages(session.messages);
          if (session.input) setInput(session.input);
          // NOTE: staged files are NOT restored into selectedFiles.
          // Their base64 data is stripped before saving to prevent QuotaExceeded.
          // Without the binary data, the files cannot be re-sent to Gemini.
          // The user must re-select any files they want to send after a page refresh.
        } else {
          // TTL expired — silently remove stale session
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      // localStorage unavailable (private browsing, SSR) — silently ignore
    }
  }, []);

  // Load staged files from IndexedDB on mount.
  // IndexedDB is async, so this runs after the initial render.
  // It correctly restores full binary data — unlike localStorage which could not hold base64.
  useEffect(() => {
    loadStagedFiles().then((files) => {
      if (files.length > 0) {
        setSelectedFiles(files);
      }
    });
  }, []);

  // Persist staged files to IndexedDB whenever they change.
  // IndexedDB has no practical size limit — stores full base64 binary safely.
  // When the array is empty (files sent or removed), clear the store.
  useEffect(() => {
    if (selectedFiles.length > 0) {
      saveStagedFiles(selectedFiles);
    } else {
      clearStagedFiles();
    }
  }, [selectedFiles]);

  // Persist to localStorage on every message or input change, refreshing the TTL each time
  useEffect(() => {
    try {
      if (messages.length > 0 || input.trim()) {
        // Strip heavy base64 data before caching to prevent QuotaExceeded errors.
        // Staged files (selectedFiles) are intentionally NOT saved — their base64
        // data cannot be stored safely within localStorage's 5-10MB quota limit.
        // Users must re-select files after a page refresh. This is by design.
        const safeMessages = messages.map((msg) => {
          if (msg.attachments && msg.attachments.length > 0) {
            return {
              ...msg,
              attachments: msg.attachments.map(att => ({ ...att, data: "" })),
            };
          }
          return msg;
        });

        const session: StoredSession = {
          messages: safeMessages,
          input,
          expiresAt: Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      }
    } catch {
      // localStorage unavailable or Quota Exceeded — silently ignore
    }
  }, [messages, input]);

  return (
    <div className="flex flex-col items-center gap-3 z-50">
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] hover:scale-105 transition-transform animate-float">
              <Lottie
                animationData={robotSaysHi}
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <button
              className="md:px-6 md:py-2 px-2 py-1 text-[12px] md:text-sm font-bold text-black
              bg-white border border-white/20
              rounded-full shadow-md transition-all
              hover:shadow-[0_0_10px_#C778DD,0_0_30px_#C778DD]
              focus:outline-none focus:ring-2 focus:ring-[#C778DD]/50"
            >
              Ask AI about me!
            </button>
          </div>
        </DialogTrigger>

        <DialogContent
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="!fixed !w-screen md:!h-auto !max-w-none md:!w-full md:!max-w-2xl 
          rounded-none md:rounded-2xl shadow-none md:shadow-[0_0_60px_rgba(199,120,221,0.15)] p-0 overflow-hidden
          bg-black md:bg-gradient-to-b md:from-[#111118] md:to-[#0A0A0F] border-none md:border md:border-white/10 text-white
          flex flex-col 
          !top-0 !left-0 !bottom-0 !right-0 !translate-x-0 !translate-y-0 md:!top-[50%] md:!left-[50%] md:!bottom-auto md:!right-auto md:!-translate-x-1/2 md:!-translate-y-1/2"
        >
          {/* Header */}
          <div className="px-4 py-2 md:px-6 md:py-4 flex items-center justify-between">
            <DialogTitle className="text-sm md:text-lg font-semibold tracking-tight text-white/90">
              Chat Flamo{" "}
              <span className="inline-block animate-bounce text-xs md:text-sm">🤖</span>
            </DialogTitle>
          </div>

          {/* Chat body — state passed as props, NEVER reset on modal close */}
          <div className="px-2 md:px-3 pb-3 md:pb-4 flex-1 min-h-0">
            <RagChat
              messages={messages}
              setMessages={setMessages}
              input={input}
              setInput={setInput}
              loading={loading}
              setLoading={setLoading}
              isStreaming={isStreaming}
              setIsStreaming={setIsStreaming}
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
