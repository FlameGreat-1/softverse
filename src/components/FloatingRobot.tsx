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

          {/* Chat body */}
          <div className="px-2 md:px-3 pb-3 md:pb-4">
            <RagChat />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
