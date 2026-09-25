"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AutonomsCaseStudy() {
  const [activeFeature, setActiveFeature] = useState<number | null>(0);

  const deviceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deviceRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1, 0.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0, 1, 1, 0]);

  const features = [
    { title: "Customer acquisition that runs itself 24/7", desc: "Your AI workforce coordinates research, omni-channel outreach, qualification, follow-up, and automated CRM workflows as one unified system. Agents share context, avoid duplication, and keep customer acquisition moving continuously." },
    { title: "One AI team. Every step of the sale.", desc: "From research to outreach to qualification to close — your AI team works as one system with a built-in CRM they update themselves. No manual logging. No handoff gaps. No dropped leads. Just booked meetings and closed deals." },
    { title: "Your private cloud. Your data. Yours alone.", desc: "Powered by OpenClaw orchestration and deployed in fully isolated infrastructure dedicated to your business. No shared environments. No co-mingled data. No 3rd party access. Your AI workforce runs in your cloud, trained on your data, and fully owned by you." },
    { title: "Self-improving AI teams that get smarter every day", desc: "Your agents don't just execute — they learn. Built-in routines optimize performance automatically. Agents communicate with each other to share context and avoid duplication. And every interaction makes the system sharper. Self-improving AI that compounds results over time." },
    { title: "AI teams. Human supervisors. One service.", desc: "We don't just deploy your AI workforce — we staff it with human operators who supervise, correct, and optimize in real-time. AI scale. Managed accountability. One human-in-the-loop per team included at no extra cost." },
    { title: "Deploy across your entire org. Instantly.", desc: "Start with sales, then scale your AI workforce to marketing, customer service, recruiting, finance, and operations. Same platform. Same speed. New teams live in days, not months — without rebuilding, retraining, or starting over." },
    { title: "Inbox Talk to your team. Get answers instantly.", desc: "Everything your agents produce lands in a clean, filterable table. Prospect profiles, emails sent, meetings booked, all in one place, ready to export." }
  ];

  return (
    <div className="min-h-screen text-white px-4 sm:px-12 lg:px-32 py-32 bg-[#0b090f] overflow-x-hidden">
      {/* Top Nav */}
      <div className="mb-12">
        <Link href="/projects" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-semibold tracking-wide">
          <span>&lt;</span> All Projects
        </Link>
      </div>

      {/* Header Section */}
      <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-tight mb-16">
        Autonoms AI — Your AI workforce, hired! Deploy in minutes. Talk to them. Watch them work.
      </h1>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-b border-gray-800 py-8 mb-16">
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Timeline</h4>
          <p className="font-semibold text-sm">May 2022 — Jan 2024</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Type</h4>
          <p className="font-semibold text-sm">AI Workforce Platform</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Client</h4>
          <p className="font-semibold text-sm">Autonoms AI</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Role</h4>
          <p className="font-semibold text-sm">Fullstack Engineer</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Status</h4>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
            <p className="font-semibold text-sm">Active</p>
          </div>
        </div>
      </div>

      {/* Hero Video */}
      <div className="mb-16 w-full aspect-video rounded-2xl overflow-hidden border border-gray-800 bg-black relative">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          poster="/images/autonoms.png"
          className="w-full h-full object-cover"
        >
          <source src="/images/autonoms.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Intro & Actions */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
        <div className="space-y-8">
          <p className="text-gray-400 text-lg leading-relaxed">
            Meet Jane, Marcus, Piper, Atlas and the rest of your AI workforce — deployed in your private cloud, trained on your business, and working across customer acquisition around the clock. 
          </p>

          <div className="flex gap-6 items-center">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">120+</span>
              <span className="text-xs text-my-primary font-bold tracking-widest uppercase">Live AI Employees</span>
            </div>
            <div className="w-[1px] h-10 bg-gray-800"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">147+</span>
              <span className="text-xs text-my-primary font-bold tracking-widest uppercase">Enterprise Clients</span>
            </div>
          </div>

          <div className="flex items-center justify-start gap-2 sm:gap-4 pt-4 w-full">
            <button onClick={() => {
              document.getElementById('case-study-details')?.scrollIntoView({ behavior: 'smooth' });
            }} className="px-3 sm:px-6 py-3 bg-[#111] hover:bg-gray-800 border border-gray-700 rounded-full text-[10px] sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none">
              CONTINUE READING <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </button>
            <Link href="https://autonoms.ai/" target="_blank" className="px-3 sm:px-6 py-3 bg-my-primary hover:bg-[#a65abf] shadow-[0_0_20px_#C778DD55] rounded-full text-white text-[10px] sm:text-sm font-semibold transition-all flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none">
              VISIT WEBSITE <span className="-rotate-45">➔</span>
            </Link>
          </div>
        </div>

        <motion.div 
          ref={deviceRef} 
          style={{ scale, opacity }} 
          className="relative w-full h-[300px] lg:h-[450px]"
        >
          <Image 
            src="/images/autonoms-org.webp" 
            alt="Autonoms Application Screenshot" 
            fill 
            className="object-contain" 
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </motion.div>
      </div>

      {/* Content Sections */}
      <div id="case-study-details" className="space-y-32 scroll-mt-32">
        
        {/* The Problem / Solution Narrative */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">The Challenge</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              Scaling outbound operations typically means scaling human headcount, which introduces massive overhead, communication silos, and data hygiene issues. Sales, marketing, and operations teams often operate in disjointed tools, creating gaps in customer acquisition.
            </p>
            <p>
              Autonoms AI sought to completely redefine this by providing an entire autonomous AI workforce that doesn't just assist, but actually executes omni-channel outreach, qualification, follow-ups, and CRM workflows end-to-end as one unified system.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">The Solution & My Role</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              As a Fullstack Engineer at Autonoms, I was deeply involved in architecting and developing the core AI workforce platform. Our system needed to seamlessly coordinate specialist outbound agents—from research and enrichment to outreach and scheduling.
            </p>
            <p>
              I engineered and maintained the high-throughput agent deployment pipeline. This backend architecture powered our custom multi-agent orchestration layer, robustly integrating with Email, LinkedIn, calendar/booking systems, and CRM APIs to facilitate fully automated, omni-channel outbound workflows.
            </p>
            <p>
              On the frontend, I built the marketplace storefront and the comprehensive seller/buyer portal using Server-Side Rendering (SSR) via Next.js. This ensured pristine SEO and sub-200ms page performance, enabling users to easily discover and deploy over 120 live AI agents.
            </p>
          </div>
        </div>

        {/* Why Autonoms? */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Why Autonoms?</h2>
            <p className="text-gray-500 mt-4 text-sm font-semibold uppercase tracking-widest">Built for real teams</p>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <div className="space-y-8">
              <div>
                <h4 className="text-white font-semibold mb-2">Set up in minutes, not weeks</h4>
                <p>Pick your agents, connect your tools, and launch. No engineers, no long onboarding required.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">A human is always one message away</h4>
                <p>A dedicated Human Operator is on standby monitoring, intervening, and keeping things on track.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Full visibility into everything your AI does</h4>
                <p>We continuously monitor and optimize your automation to ensure it keeps delivering value and maintains outcome-based pricing.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Capabilities</h2>
            <p className="text-gray-500 mt-4 text-sm font-semibold uppercase tracking-widest">Modern Workforce Operations</p>
          </div>
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-3">
              {features.map((feature, idx) => (
                <div key={idx} className="border border-gray-800 rounded-xl overflow-hidden bg-[#15121b]">
                  <button 
                    onClick={() => setActiveFeature(activeFeature === idx ? null : idx)}
                    className={`w-full flex justify-between items-center px-6 py-4 font-semibold text-sm transition-colors text-left ${activeFeature === idx ? 'bg-[#8b31ff] text-white' : 'text-gray-300 hover:bg-[#1a1721]'}`}
                  >
                    <span>{feature.title}</span>
                    <svg className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${activeFeature === idx ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {activeFeature === idx && (
                    <div className="px-6 py-5 text-gray-400 text-sm leading-relaxed bg-[#110e16]">
                      {feature.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technologies Used */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Technologies Used</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-8 leading-relaxed">
            <p>
              Delivering autonomous agents across 147 enterprise clients securely required a highly scalable, isolated, and robust infrastructure:
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-2">Frontend & Storefront</h4>
                <p>Built with React, Next.js, and TypeScript. Next.js SSR was crucial for delivering sub-200ms page performance and high SEO visibility for the marketplace portal.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Backend Pipeline & Orchestration</h4>
                <p>Node.js and PostgreSQL powered the heavy-lifting of the custom multi-agent orchestration layer, natively hooking into LinkedIn, Email, Calendars, and CRMs.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Cloud & Deployment</h4>
                <p>Delivered on AWS using stringent CI/CD automation. The architecture ensured fully isolated per-client infrastructure and private cloud deployments for maximum data sovereignty and 24/7 uptime.</p>
              </div>
            </div>

            {/* Tech Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {[
                { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
                { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invert: true },
                { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
                { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
                { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
                { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', invert: true },
                { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invert: true }
              ].map((tech, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center gap-3 p-4 border border-gray-800 rounded-xl bg-[#110e16] hover:border-gray-600 transition-colors">
                  <img src={tech.icon} alt={tech.name} className={`w-8 h-8 object-contain ${tech.invert ? 'invert' : ''}`} />
                  <span className="text-xs font-semibold text-gray-300">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Footer Nav */}
      <div className="border-t border-gray-800 pt-12 flex justify-between items-center">
        <Link href="/projects/cosmicforge" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-semibold tracking-wide">
          <span>&lt;</span> PREVIOUS PROJECT
        </Link>
        <Link href="/projects" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-semibold tracking-wide">
          NEXT PROJECT <span>➔</span>
        </Link>
      </div>

    </div>
  );
}
