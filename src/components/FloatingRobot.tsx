"use client";

import Lottie from "lottie-react";
import robotSaysHi from "../animations/robot-says-hi.json";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import RagChat from "./RagChat";

export default function FloatingRobot() {
  return (
    <div className="flex flex-col items-center gap-3 z-50">
      {/* Dialog trigger */}
      <Dialog>
        <DialogTrigger asChild>
          <div>
            {/* Robot animation */}
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
              focus:outline-none focus:ring-2 focus:ring-[#C778DD]/50 "
            >
              Ask AI about me!
            </button>
          </div>
        </DialogTrigger>

        {/* Chatbox Dialog — enlarged & premium */}
        <DialogContent
          className="w-[95%] max-w-2xl md:w-full rounded-2xl shadow-[0_0_60px_rgba(199,120,221,0.15)] p-0 overflow-hidden
          bg-gradient-to-b from-[#111118] to-[#0A0A0F] border border-white/10 text-white"
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-white/5">
            <DialogTitle className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-my-primary/70 mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-my-primary animate-pulse" />
              AI Assistant
            </DialogTitle>
            <h2 className="text-2xl font-bold tracking-tight">
              Chat with my AI{" "}
              <span className="inline-block animate-bounce">🤖</span>
            </h2>
            <p className="text-sm text-gray-400 mt-1 leading-relaxed">
              Ask questions about me, my projects, tech stack, or anything on
              this site.
            </p>
          </div>

          {/* Chat body */}
          <div className="px-6 pb-6">
            <RagChat />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
