"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Detect bots
  const isBot =
    typeof navigator !== "undefined" &&
    /bot|crawler|spider|crawling/i.test(navigator.userAgent);

  // Check if first visit
  const isFirstVisit =
    typeof window !== "undefined" && !sessionStorage.getItem("hasLoadedBefore");

  useEffect(() => {
    if (!isLoading || isBot) {
      // Defer state update to avoid synchronous setState
      setTimeout(() => setIsLoading(false), 0);
      return;
    }

    sessionStorage.setItem("hasLoadedBefore", "true");

    let finished = false;

    const finishLoading = () => {
      if (finished) return;
      finished = true;
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setIsLoading(false), 300);
    };

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) {
          clearInterval(interval);
          return 94;
        }
        return prev + Math.random() * 8 + 6;
      });
    }, 140);

    const onLoad = () => finishLoading();

    if (document.readyState === "complete") {
      setTimeout(finishLoading, 800);
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", onLoad);
    };
  }, [isLoading, isBot]);

  if (isBot || (!isFirstVisit && !isLoading)) {
    // Render nothing for bots or repeat visitors
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#0A0A0F] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              <span className="text-purple-500">{"<"}</span>
              Softverse
              <span className="text-purple-500">{"/>"}</span>
            </h1>
          </motion.div>

          <div className="w-64 md:w-96 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          <p className="text-white/60 mt-4 text-sm font-mono">
            {Math.floor(progress)}%
          </p>

          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex gap-2 mt-6"
          >
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
          </motion.div>

          <p className="text-white/40 mt-4 text-xs">Loading portfolio...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
