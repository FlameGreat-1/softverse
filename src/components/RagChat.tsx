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

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    const userQuery = input;
    setInput("");
    setLoading(true);

    // Adds an empty bot message that updates as streaming happens
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
        throw new Error("Failed to fetch");
      }

      // Check if response is streaming or JSON
      const contentType = res.headers.get("content-type");

      if (contentType?.includes("text/plain")) {
        // Handle streaming response
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("No reader available");
        }

        let accumulatedText = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;

          // Update the last message (bot message) with accumulated text
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              sender: "bot",
              text: accumulatedText,
            };
            return newMessages;
          });
        }
      } else {
        // Handle JSON response (fallback for errors)
        const data = await res.json();
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            sender: "bot",
            text: data.answer || "No response.",
          };
          return newMessages;
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          sender: "bot",
          text: "Sorry, something went wrong.",
        };
        return newMessages;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[330px] w-full">
      {/* CHAT WINDOW */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-white/5 border border-white/10 rounded-lg p-4 space-y-4"
      >
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-10">
            Ask me anything about Ifeoluwa 👩🏽‍💻✨
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
              msg.sender === "user"
                ? "bg-my-primary/20 ml-auto border border-my-primary/40"
                : "bg-white/10 border border-white/20"
            }`}
          >
            {msg.text || (loading && i === messages.length - 1 ? "●" : "")}
          </div>
        ))}
      </div>

      {/* INPUT BAR */}
      <div className="mt-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
          disabled={loading}
          className="flex-1 p-2 text-sm bg-white/10 border border-white/20 rounded-lg outline-none disabled:opacity-50"
          placeholder="Ask a question..."
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-my-primary text-black font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

