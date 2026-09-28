"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import robotSaysHi from "../animations/robot-says-hi.json";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import RagChat from "./RagChat";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const STORAGE_KEY = "flamo_chat_session";
const TTL_DAYS = 7; // Auto-clears after 7 days of inactivity

interface StoredSession {
  messages: Message[];
  expiresAt: number; // Unix timestamp ms
}

export default function FloatingRobot() {
  // State lives here — survives modal open/close, persists across all browser sessions
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
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
        } else {
          // TTL expired — silently remove stale session
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      // localStorage unavailable (private browsing, SSR) — silently ignore
    }
  }, []);

  // Persist to localStorage on every message, refreshing the TTL each time
  useEffect(() => {
    try {
      if (messages.length > 0) {
        const session: StoredSession = {
          messages,
          expiresAt: Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      }
    } catch {
      // localStorage unavailable — silently ignore
    }
  }, [messages]);

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
          className="w-[calc(100vw-1rem)] max-w-2xl md:w-full rounded-2xl shadow-[0_0_60px_rgba(199,120,221,0.15)] p-0 overflow-hidden
          bg-gradient-to-b from-[#111118] to-[#0A0A0F] border border-white/10 text-white"
        >
          {/* Header */}
          <div className="px-4 md:px-6 pt-5 md:pt-6 pb-4 border-b border-white/5">
            <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight">
              Chat Flamo{" "}
              <span className="inline-block animate-bounce">🤖</span>
            </DialogTitle>
          </div>

          {/* Chat body — state passed as props, NEVER reset on modal close */}
          <div className="px-2 md:px-3 pb-3 md:pb-4">
            <RagChat
              messages={messages}
              setMessages={setMessages}
              input={input}
              setInput={setInput}
              loading={loading}
              setLoading={setLoading}
              isStreaming={isStreaming}
              setIsStreaming={setIsStreaming}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
