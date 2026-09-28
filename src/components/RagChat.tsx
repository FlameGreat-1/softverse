"use client";

import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import { ArrowUp, X } from "lucide-react";
import { Attachment, Message } from "./FloatingRobot";

interface RagChatProps {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isStreaming: boolean;
  setIsStreaming: Dispatch<SetStateAction<boolean>>;
  selectedFiles: Attachment[];
  setSelectedFiles: Dispatch<SetStateAction<Attachment[]>>;
}

export default function RagChat({
  messages,
  setMessages,
  input,
  setInput,
  loading,
  setLoading,
  isStreaming,
  setIsStreaming,
  selectedFiles,
  setSelectedFiles,
}: RagChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // CRITICAL: Snapshot the FileList immediately — on real mobile devices (Android/iOS)
    // the FileList reference can be invalidated as soon as we touch the input element.
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    // Snapshot into a plain array before any async work
    const files = Array.from(fileList);

    const validFiles = files.filter((f) => {
      if (f.size > 5 * 1024 * 1024) {
        alert(`"${f.name}" is too large. Max file size is 5MB.`);
        return false;
      }
      // Guard against cloud file references not yet downloaded to device.
      // On Android, a Google Drive file that isn't cached locally has size 0
      // and cannot be read by any browser API.
      if (f.size === 0) {
        alert(`"${f.name}" could not be read. If it is a cloud file, download it to your device first.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    /**
     * Converts an ArrayBuffer to a base64 string safely.
     * Uses byte-by-byte loop — avoids String.fromCharCode.apply() argument
     * stack limits that crash low-end Android devices on files larger than ~500KB.
     */
    const bufferToBase64 = (buffer: ArrayBuffer): string => {
      const bytes = new Uint8Array(buffer);
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    };

    /**
     * 3-strategy fallback file reader — each strategy falls through to the next on failure.
     *
     * Strategy 1 — file.arrayBuffer() [PRIMARY]
     *   Promise-based, handles Android content:// URIs most reliably.
     *   Supported: Chrome 76+, Safari 14+, Firefox 69+.
     *
     * Strategy 2 — FileReader.readAsArrayBuffer() [FALLBACK A]
     *   Callback-based, wrapped in a Promise. Reads binary without data-URL parsing.
     *   Works on older Android Chrome versions where arrayBuffer() may not exist.
     *
     * Strategy 3 — FileReader.readAsDataURL() [FALLBACK B - LEGACY]
     *   Last resort for the oldest browsers. Parses data:mime;base64,DATA format.
     */
    const readFile = async (file: File): Promise<{ name: string; mimeType: string; data: string }> => {
      const mimeType = file.type || 'application/octet-stream';

      // Strategy 1
      if (typeof file.arrayBuffer === 'function') {
        try {
          const buffer = await file.arrayBuffer();
          return { name: file.name, mimeType, data: bufferToBase64(buffer) };
        } catch {
          // Fall through to Strategy 2
        }
      }

      // Strategy 2
      try {
        const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as ArrayBuffer);
          reader.onerror = () => reject(reader.error);
          reader.readAsArrayBuffer(file);
        });
        return { name: file.name, mimeType, data: bufferToBase64(buffer) };
      } catch {
        // Fall through to Strategy 3
      }

      // Strategy 3 (legacy)
      return new Promise<{ name: string; mimeType: string; data: string }>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (typeof result !== 'string' || !result) {
            reject(new Error(`Could not read: ${file.name}`));
            return;
          }
          const parts = result.split(',');
          if (parts.length < 2 || !parts[1]) {
            reject(new Error(`Invalid data URL for: ${file.name}`));
            return;
          }
          resolve({ name: file.name, mimeType, data: parts[1] });
        };
        reader.onerror = () => reject(new Error(`All strategies failed for: ${file.name}`));
        reader.readAsDataURL(file);
      });
    };

    // Read ALL files concurrently, then append to state in one atomic update
    Promise.all(validFiles.map(readFile))
      .then((attachments) => {
        setSelectedFiles((prev) => [...prev, ...attachments]);
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('File read error:', msg);
        alert('Failed to read file. If it is stored in the cloud (Google Drive, iCloud), please download it to your device first, then try again.');
      })
      .finally(() => {
        // Reset ONLY after all reads are complete — prevents mobile race condition
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      });
  };

  async function sendMessage() {
    if ((!input.trim() && selectedFiles.length === 0) || loading) return;

    const userQuery = input.trim();
    const attachmentPayload = selectedFiles.length > 0 ? selectedFiles : undefined;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userQuery, attachments: attachmentPayload },
    ]);
    
    setInput("");
    setSelectedFiles([]);
    setLoading(true);
    setIsStreaming(true);

    setMessages((prev) => [...prev, { sender: "bot", text: "" }]);

    try {
      const res = await fetch("/api/rag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          query: userQuery, 
          history: messages, 
          attachments: attachmentPayload 
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const contentType = res.headers.get("content-type");

      if (contentType?.includes("text/plain")) {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("No reader available");
        }

        let accumulatedText = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            setIsStreaming(false);
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;

          setMessages((prev) => {
            const newMessages = [...prev];
            if (newMessages.length > 0) {
              newMessages[newMessages.length - 1] = {
                sender: "bot",
                text: accumulatedText,
              };
            }
            return newMessages;
          });
        }
      } else if (contentType?.includes("application/json")) {
        const data = await res.json();
        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages.length > 0) {
            newMessages[newMessages.length - 1] = {
              sender: "bot",
              text: data.answer || "No response received.",
            };
          }
          return newMessages;
        });
        setIsStreaming(false);
      } else {
        throw new Error("Unexpected content type");
      }
    } catch (err) {
      console.error("Error in sendMessage:", err);
      setMessages((prev) => {
        const newMessages = [...prev];
        if (newMessages.length > 0) {
          newMessages[newMessages.length - 1] = {
            sender: "bot",
            text: "Flamo ran into an issue reaching the server. Please check your connection and try again.",
          };
        }
        return newMessages;
      });
      setIsStreaming(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full md:h-[580px] shrink min-h-0 w-full max-w-full overflow-hidden">
      {/* CHAT WINDOW — hidden scrollbar */}
      <div
        ref={scrollRef}
        className="chat-scroll flex-1 overflow-x-hidden overflow-y-auto p-2 md:p-4 space-y-6 md:space-y-8"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Hide webkit scrollbar via inline workaround */}
        <style>{`
          .chat-scroll::-webkit-scrollbar { display: none; }
        `}</style>

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-1">
            <div className="w-12 h-12 rounded-full bg-my-primary/10 border border-my-primary/20 flex items-center justify-center text-2xl">
              💬
            </div>
            <p className="text-gray-400 text-sm font-medium w-full break-words">
              Ask me anything about Emmanuel
            </p>
            <p className="text-gray-500 text-[11px] md:text-xs w-full max-w-[260px] break-words">
              Projects, skills, experience, tech stack — I&apos;m here to help.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex w-full min-w-0 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 text-[14px] leading-relaxed min-w-0 ${
                msg.sender === "user"
                  ? "max-w-[80%] bg-my-primary/15 border border-my-primary/30 rounded-2xl rounded-br-sm text-gray-100"
                  : "w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl text-gray-300"
              }`}
              style={{
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
                overflow: "hidden",
              }}
            >
              {msg.sender === "bot" && (
                <span className="block text-base mb-1.5">🤖</span>
              )}
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {msg.attachments.map((att, idx) => (
                    <div key={idx}>
                      {att.mimeType.startsWith('image/') && att.data ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img 
                          src={`data:${att.mimeType};base64,${att.data}`} 
                          alt={att.name} 
                          className="max-w-full h-auto rounded-lg border border-white/10"
                          style={{ maxHeight: '200px' }}
                        />
                      ) : (
                        <div className="flex items-center gap-2 bg-black/20 px-3 py-2 rounded-lg border border-white/10 inline-flex max-w-full">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                          <span className="text-xs truncate">{att.name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {msg.text || (
                isStreaming &&
                i === messages.length - 1 && (
                  <span className="inline-flex gap-1.5 py-1">
                    <span className="w-2 h-2 bg-my-primary/50 rounded-full animate-bounce"></span>
                    <span
                      className="w-2 h-2 bg-my-primary/50 rounded-full animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-my-primary/50 rounded-full animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    ></span>
                  </span>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT BAR */}
      <div className="mt-2 relative bg-[#2f2f2f] rounded-[24px] w-full min-w-0 flex flex-col px-1.5 md:px-2 py-1 transition-colors focus-within:bg-[#383838]">
        {/* File Preview Area */}
        {selectedFiles.length > 0 && (
          <div className="px-3 md:px-4 pt-3 pb-1 flex flex-wrap gap-2">
            {selectedFiles.map((file, idx) => (
              <div key={idx} className="relative inline-flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 border border-white/20">
                <span className="text-xs text-white font-medium truncate max-w-[150px] md:max-w-[200px]">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== idx))}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Remove file"
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              // Enterprise standard: On mobile, Enter creates a new line. On desktop, Enter sends.
              const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
              if (!isMobile) {
                e.preventDefault(); // Prevent new line on desktop
                if (!loading && (input.trim() || selectedFiles.length > 0)) {
                  sendMessage();
                }
              }
            }
          }}
          disabled={loading}
          rows={1}
          className={`w-full px-3 md:px-4 ${selectedFiles.length > 0 ? 'pt-1' : 'pt-3'} pb-1 text-[16px] leading-relaxed bg-transparent outline-none placeholder:text-[#9b9b9b] text-white disabled:opacity-50 disabled:cursor-not-allowed resize-none overflow-y-auto no-scrollbar`}
          placeholder="Ask anything"
          style={{ minHeight: "44px", maxHeight: "200px" }}
        />

        <div className="flex justify-between items-center px-2 pb-1.5 pt-1">
          {/* Left action icons (matching ChatGPT + icon) */}
          <div className="flex items-center gap-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/jpeg,image/png,image/gif,image/webp,image/heic,image/heif,image/svg+xml,application/pdf"
              multiple
              onChange={handleFileChange}
            />
            <button 
              type="button"
              title="Add files"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 text-[#b4b4b4] hover:text-white transition-colors rounded-full" 
              aria-label="Attach file"
              disabled={loading}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14m-7-7h14"/></svg>
            </button>
          </div>
          
          {/* Right Send Button */}
          <button
            type="button"
            onClick={sendMessage}
            disabled={loading || (!input.trim() && selectedFiles.length === 0)}
            className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 
              ${input.trim() || selectedFiles.length > 0 ? 'bg-white text-black hover:bg-gray-200' : 'bg-transparent text-[#b4b4b4]'}
              disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Send message"
          >
            {loading ? (
              <span className="inline-flex gap-1">
                <span className="w-1 h-1 bg-black/60 rounded-full animate-bounce"></span>
                <span className="w-1 h-1 bg-black/60 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></span>
                <span className="w-1 h-1 bg-black/60 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></span>
              </span>
            ) : (
              <ArrowUp size={18} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}