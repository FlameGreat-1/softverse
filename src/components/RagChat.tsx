"use client";

import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import { ArrowUp } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface RagChatProps {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isStreaming: boolean;
  setIsStreaming: Dispatch<SetStateAction<boolean>>;
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
}: RagChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userQuery = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userQuery }]);
    setInput("");
    setLoading(true);
    setIsStreaming(true);

    setMessages((prev) => [...prev, { sender: "bot", text: "" }]);

    try {
      const res = await fetch("/api/rag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userQuery, history: messages }),
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
                if (!loading && input.trim()) {
                  sendMessage();
                }
              }
            }
          }}
          disabled={loading}
          rows={1}
          className="w-full px-3 md:px-4 pt-3 pb-1 text-[16px] leading-relaxed bg-transparent outline-none placeholder:text-[#9b9b9b] text-white disabled:opacity-50 disabled:cursor-not-allowed resize-none overflow-y-auto no-scrollbar"
          placeholder="Ask anything"
          style={{ minHeight: "44px", maxHeight: "200px" }}
        />

        <div className="flex justify-between items-center px-2 pb-1.5 pt-1">
          {/* Left action icons (matching ChatGPT + icon) */}
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-[#b4b4b4] hover:text-white transition-colors rounded-full" aria-label="Attach">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14m-7-7h14"/></svg>
            </button>
          </div>
          
          {/* Right Send Button */}
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 
              ${input.trim() ? 'bg-white text-black hover:bg-gray-200' : 'bg-transparent text-[#b4b4b4]'}
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