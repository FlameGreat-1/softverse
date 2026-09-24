"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import Carousel from "@/components/Carousel";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ExoperCaseStudy() {
  const [activeFeature, setActiveFeature] = useState<number | null>(0);

  const deviceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deviceRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1, 0.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0, 1, 1, 0]);

  const carouselImages = [
    { src: "/images/exoper1.png", caption: "Connect your MT5 accounts securely" },
    { src: "/images/exoper2.png", caption: "Monitor and manage active trades" },
    { src: "/images/exoper3.png", caption: "Automated trade journaling" },
    { src: "/images/exoper4.png", caption: "AI dissects every trade setup" },
    { src: "/images/exoper5.png", caption: "Track performance and edge over time" },
    { src: "/images/exoper6.png", caption: "Structured Trading AI at the edge" },
  ];

  const features = [
    { title: "Broker", desc: "Provision your MT5 terminal securely and configure your risk parameters." },
    { title: "Analysis", desc: "Exoper AI executes Technical and Macroeconomics Analysis in seconds." },
    { title: "Execution", desc: "Executes trades with precision, discipline and confidence as a discretionary trader would." },
    { title: "Watcher", desc: "Monitors live trades and pending orders from execute to closure." },
    { title: "Control", desc: "Manage Risk, Watch live performance, review analytics, and withdraw at any time." }
  ];

  return (
    <div className="min-h-screen text-white px-4 sm:px-12 lg:px-32 py-32 bg-[#0b090f]">
      {/* Top Nav */}
      <div className="mb-12">
        <Link href="/projects" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-semibold tracking-wide">
          <span>&lt;</span> All Projects
        </Link>
      </div>

      {/* Header Section */}
      <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-tight mb-16">
        Exoper — Structured Trading AI at the Edge. Institutional analysis, systematic execution, and automated journaling for the top 1%.
      </h1>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-b border-gray-800 py-8 mb-16">
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Timeline</h4>
          <p className="font-semibold text-sm">Sep 2025 — Present</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Type</h4>
          <p className="font-semibold text-sm">Trading Technology</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Client</h4>
          <p className="font-semibold text-sm">Exoper</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Role</h4>
          <p className="font-semibold text-sm">Founder & Lead Engineer</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Status</h4>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
            <p className="font-semibold text-sm">Active</p>
          </div>
        </div>
      </div>

      {/* Hero Carousel */}
      <div className="mb-16">
        <Carousel
          slides={carouselImages}
          autoPlay={true}
          autoPlayInterval={5000}
          showIndicators={true}
          showArrows={true}
          className="w-full aspect-video rounded-2xl"
        />
      </div>

      {/* Intro & Actions */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
        <div className="space-y-8">
          <p className="text-gray-400 text-lg leading-relaxed">
            Exoper is a non-custodial trading technology platform designed to help traders operate with greater structure and discipline. The platform provides AI-powered technical and macroeconomic market analysis, automated and manual execution, trade management, journaling, and behavioral analytics.
          </p>

          <div className="flex gap-6 items-center">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">300K+</span>
              <span className="text-xs text-my-primary font-bold tracking-widest uppercase">Trades Executed</span>
            </div>
            <div className="w-[1px] h-10 bg-gray-800"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">160+</span>
              <span className="text-xs text-my-primary font-bold tracking-widest uppercase">Active Traders</span>
            </div>
          </div>

          <div className="flex items-center justify-start gap-2 sm:gap-4 pt-4 w-full">
            <button onClick={() => {
              document.getElementById('case-study-details')?.scrollIntoView({ behavior: 'smooth' });
            }} className="px-3 sm:px-6 py-3 bg-[#111] hover:bg-gray-800 border border-gray-700 rounded-full text-[10px] sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none">
              CONTINUE READING <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </button>
            <Link href="https://app.exoper.com/" target="_blank" className="px-3 sm:px-6 py-3 bg-my-primary hover:bg-[#a65abf] shadow-[0_0_20px_#C778DD55] rounded-full text-white text-[10px] sm:text-sm font-semibold transition-all flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none">
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
            src="/images/exoper2.png" 
            alt="Exoper Application Screenshot" 
            fill 
            className="object-contain" 
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </motion.div>
      </div>

      {/* Content Sections */}
      <div id="case-study-details" className="space-y-32 scroll-mt-32">
        
        {/* The Challenge / Core Vision */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">The Core Vision</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              Most traders fail not because of a bad strategy, but because of a lack of discipline and execution rigor. They drift from their own rules, fail to properly journal, and let psychology override logical decision-making. 
            </p>
            <p>
              Exoper was built for the top 1% to enforce trading discipline through AI. It evaluates trading history to identify patterns relating to habits, behavior, and performance, taking the heavy lifting out of technical and macroeconomic analysis so traders can focus on high-quality decision-making.
            </p>
          </div>
        </div>

        {/* The Solution & Engineering */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">My Role & Engineering</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              As Founder and Lead Engineer, I established the architectural vision and actively built Exoper alongside a team of 3 engineers. We developed a highly resilient platform supporting forex, metals, crypto, and stocks, achieving 97% platform uptime and over 60% signal accuracy out of the gate.
            </p>
            <p>
              I engineered a state-of-the-art multi-LLM analysis engine utilizing OpenAI, Gemini, and Claude. Integrated with RAG pipelines and the TradingEconomics API, it performs comprehensive top-down technical analysis across 13 timeframes and deep macroeconomic analysis across all indicators—completing end-to-end analysis and order routing to the broker in just 50–70 seconds with millisecond execution latency.
            </p>
            <p>
              Additionally, I architected a headless MetaTrader terminal provisioning system on Linux VPS using Wine, Xvfb, and Kubectl. This securely connects to brokers and prop firms, deploying custom MQL5 Expert Advisors for autonomous trade execution, trailing management, and real-time WebSocket monitoring.
            </p>
          </div>
        </div>

        {/* Why Exoper? */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Platform Pillars</h2>
            <p className="text-gray-500 mt-4 text-sm font-semibold uppercase tracking-widest">Built for the top 1%</p>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-2">Autonomous Trading</h4>
                <p className="text-sm">Technical analysis, macroeconomic analysis, execution, and trade management are handled autonomously with you in the loop while the system trades with precision and confidence.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Intelligent Infrastructure</h4>
                <p className="text-sm">Elevate your performance with a comprehensive trading system, advanced journaling, and an algorithmic engine designed for smarter, data-driven execution.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Absolute Fund Security</h4>
                <p className="text-sm">Maintain complete ownership and control over your capital. Our non-custodial framework ensures your funds never leave your secure broker accounts.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Granular Control</h4>
                <p className="text-sm">Command every aspect of your trading algorithms. Maintain absolute authority over market timing, trade execution, and dynamic risk management.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features / How It Works */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-gray-500 mt-4 text-sm font-semibold uppercase tracking-widest">Connection to Execution</p>
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
              Building an institutional-grade, low-latency financial trading platform requires a strictly typed, memory-safe, and highly distributed infrastructure:
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-2">Microservices Backend</h4>
                <p>Implemented a polyglot microservices architecture utilizing Go for high-concurrency order routing, Rust for compute-heavy analytic modules, FastAPI (Python) for AI interfacing, and TypeScript for real-time client streaming.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Infrastructure & Edge</h4>
                <p>Kubernetes multi-region deployment with Helm charts. Orchestrated Envoy proxy and edge ingress for global low-latency access and dynamic scaling.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Security & Compliance</h4>
                <p>Enforced AES-256 encryption, JWT authentication, and strict Role-Based Access Control (RBAC). Implemented immutable audit logging, real-time threat detection, and maintained compliance with GDPR, MiFID II, EU AI Act, and ISO 27001 standards.</p>
              </div>
            </div>

            {/* Tech Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {[
                { name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg' },
                { name: 'Rust', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg', invert: true },
                { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
                { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
                { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg' },
                { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' }
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
        <Link href="/projects/autonoms-ai" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-semibold tracking-wide">
          <span>&lt;</span> PREVIOUS PROJECT
        </Link>
        <Link href="/projects" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-semibold tracking-wide">
          NEXT PROJECT <span>➔</span>
        </Link>
      </div>

    </div>
  );
}
