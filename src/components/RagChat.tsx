"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function RagChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

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
        body: JSON.stringify({ query: userQuery }),
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
            text: "Sorry, I encountered an error. Please try again.",
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
    <div className="flex flex-col h-[450px] w-full">
      {/* CHAT WINDOW — hidden scrollbar */}
      <div
        ref={scrollRef}
        className="chat-scroll flex-1 overflow-y-auto rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 space-y-5"
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
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-my-primary/10 border border-my-primary/20 flex items-center justify-center text-2xl">
              💬
            </div>
            <p className="text-gray-400 text-sm font-medium">
              Ask me anything about Emmanuel
            </p>
            <p className="text-gray-500 text-xs max-w-[260px]">
              Projects, skills, experience, tech stack — I&apos;m here to help.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 text-[14px] leading-relaxed whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "max-w-[75%] bg-my-primary/15 border border-my-primary/30 rounded-2xl rounded-br-sm text-gray-100"
                  : "w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl text-gray-300"
              }`}
            >
              {msg.sender === "bot" && (
                <span className="block text-[10px] uppercase tracking-widest text-my-primary/60 font-semibold mb-2">
                  AI
                </span>
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
      <div className="mt-4 flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl p-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading && input.trim()) {
              sendMessage();
            }
          }}
          disabled={loading}
          className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Type your question..."
        />

        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="px-5 py-2.5 bg-my-primary text-black text-sm font-bold rounded-lg
          hover:shadow-[0_0_20px_rgba(199,120,221,0.3)] transition-all duration-200
          disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
          active:scale-95"
        >
          {loading ? (
            <span className="inline-flex gap-1">
              <span className="w-1.5 h-1.5 bg-black/60 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-black/60 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></span>
              <span className="w-1.5 h-1.5 bg-black/60 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></span>
            </span>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
}