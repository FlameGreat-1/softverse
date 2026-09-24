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
          <div className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40">
            {/* SVG Spinner */}
            <svg
              className="absolute inset-0 w-full h-full animate-[spin_1.5s_linear_infinite]"
              viewBox="0 0 100 100"
            >
              <defs>
                <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C778DD" stopOpacity="1" />
                  <stop offset="100%" stopColor="#C778DD" stopOpacity="0.1" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#C778DD15"
                strokeWidth="4"
              />
              {/* Spinning Stroke (85% visible) */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="url(#spinnerGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="289"
                strokeDashoffset="43"
                filter="url(#glow)"
              />
            </svg>

            {/* Inner Content */}
            <div className="relative z-10 flex items-center">
              <span className="text-3xl md:text-4xl font-extrabold text-my-primary tracking-wider">
                &lt;
              </span>
              <motion.div 
                className="flex items-center origin-center"
                animate={{ scale: [1, 0.85, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-3xl md:text-4xl font-extrabold text-my-primary tracking-wider">
                  FG
                </span>
                <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white text-my-primary text-[9px] md:text-[11px] font-bold flex items-center justify-center mx-0.5 -translate-y-2.5 md:-translate-y-3 relative z-20">
                  2
                </span>
              </motion.div>
              <span className="text-3xl md:text-4xl font-extrabold text-my-primary tracking-wider">
                /&gt;
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
