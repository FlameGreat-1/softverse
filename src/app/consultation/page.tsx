"use client";

import { useEffect } from "react";
import Image from "next/image";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function ConsultationPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#a65abf" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white pt-32 pb-20 px-4 sm:px-8 font-sans overflow-x-hidden relative flex flex-col items-center">
      
      {/* Background Decorations (Matching Home Page) */}
      <Image
        src="/assets/dots-small.svg"
        alt="Background pattern"
        className="absolute top-16 left-10 sm:left-40 md:left-80 w-10 sm:w-16 pointer-events-none"
        width={80}
        height={80}
      />
      <Image
        src="/assets/pattern-small.svg"
        alt="Background pattern"
        className="absolute top-64 right-0 w-14 md:w-16 opacity-30 pointer-events-none"
        width={80}
        height={80}
      />
      <Image
        src="/assets/pattern-big.svg"
        alt="Background pattern"
        className="absolute top-96 left-10 sm:left-1/4 w-28 md:w-36 opacity-30 pointer-events-none"
        width={140}
        height={140}
      />
      <Image
        src="/assets/dots-small.svg"
        alt="Background pattern"
        className="absolute top-[650px] right-10 sm:right-44 w-10 sm:w-16 pointer-events-none"
        width={80}
        height={80}
      />
      <Image
        src="/assets/ellipse-large.png"
        alt="Background pattern"
        className="absolute top-[-150px] right-[-150px] w-[250px] sm:w-[540px] h-auto pointer-events-none"
        width={540}
        height={540}
      />
      <Image
        src="/assets/ellipse-large.png"
        alt="Background pattern"
        className="absolute top-[420px] left-[-120px] w-[250px] sm:w-[540px] h-auto pointer-events-none"
        width={540}
        height={540}
      />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-my-primary/10 border border-my-primary/30 text-my-primary text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-my-primary animate-pulse" />
            Free Consultation
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-my-primary to-purple-400">incredible.</span>
          </h1>
          <p className="text-gray-400 max-w-4xl mx-auto text-lg">
            Book a free 30-minute discovery call to discuss your project requirements, architecture, and how we can bring your vision to life.
          </p>
        </div>

        {/* Cal.com Embed Container */}
        <div className="w-full relative min-h-[600px] mt-8">
          <Cal 
            calLink="flame-great" // Links to the user's Cal.com profile
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", theme: "dark" }}
          />
        </div>

      </div>
    </div>
  );
}
