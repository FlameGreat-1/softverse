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

        {/* The Problem & The Solution */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">The Problem</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              For years, retail traders have struggled not with a lack of strategy, but with a lack of execution rigor. The market is unforgiving, and emotional decision-making, psychological drift, and poor risk management consistently erode profitability. Most traders fail because they cannot maintain strict discipline over a sustained period of time.
            </p>
            <p>
              Additionally, the landscape of trading technology is heavily fragmented. Traders are forced to juggle external charting software, separate macroeconomic calendars, manual trade journals, and clunky broker terminals. This friction leads to missed opportunities, poor trade logging, and an inability to objectively review performance.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">The Solution</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              Exoper was engineered to eliminate emotional trading and enforce institutional-grade discipline. It is a unified, non-custodial trading technology platform that brings AI-powered technical and macroeconomic analysis, execution, and advanced behavioral analytics into a single seamless ecosystem.
            </p>
            <p>
              However, Exoper does not dictate how you trade. Instead, it empowers you to be the architect of your own edge. Users build their highly personalized Trading Systems—defining their identity, risk appetite, confluences, structural frameworks, and psychology rules. Exoper's AI then utilizes this unique system to power top-down technical and macroeconomic analysis precisely tailored to your edge.
            </p>
          </div>
        </div>

        {/* System & Execution */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Trading System & Execution</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              Once a user defines their Trading System, Exoper automatically generates a comprehensive Trading Plan. This includes an AI-generated profile of their unique edge, rigid account risk parameters (daily loss limits, weekly drawdowns), and weekly audit prompts designed to enforce discipline.
            </p>
            <p>
              When it comes to the market, traders have granular control over their Execution Rules. You configure exact parameters such as maximum concurrent trades, execution modes (Auto, Limit, Instant), and dynamic AI Guards. These guards act as safety nets—automatically blocking trades during high-impact news, low liquidity hours, or when minimum risk-to-reward ratios are not met.
            </p>
            <p>
              The platform executes these trades with the precision and confidence of a seasoned discretionary trader, but with the speed and structural rigor of a machine. Security remains paramount; Exoper's non-custodial framework ensures your funds never leave your secure broker accounts.
            </p>
          </div>
        </div>

        {/* Behavioral Analytics */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Behavioral Analytics</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              One of the most revolutionary aspects of Exoper is its approach to journaling and performance review. Instead of manually logging trades, Exoper automatically syncs every execution into a Daily Journal, calculating win rates, Risk-to-Reward ratios, and P&L with zero manual effort.
            </p>
            <p>
              The platform goes beyond simple numbers. It features a Discipline Scorecard that actively tracks rule adherence, emotional control, patience (waiting for sweeps), and execution precision. It dissects every setup, allowing you to review the decisions behind every trade.
            </p>
            <p>
              Over time, Exoper AI autonomously analyzes your performance, tracking your psychology and rule adherence to help you evolve into a master trader. It provides immediate feedback, letting you know exactly what is making you money and what behaviors are holding you back.
            </p>
          </div>
        </div>

        {/* My Role */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">My Role</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              As Founder and Lead Engineer, I established the architectural vision and actively built Exoper alongside a talented team of 3 engineers. Drawing from my 5 years of experience in forex trading, I intimately understood the bottlenecks traders faced and engineered the exact solution needed to overcome them.
            </p>
            <p>
              I personally architected the multi-LLM analysis engine (integrating OpenAI, Gemini, Claude) with RAG pipelines and the TradingEconomics API. This engine performs full top-down technical analysis across 13 timeframes and comprehensive macroeconomic analysis based strictly on the user's custom system, routing orders to the broker in just 50–70 seconds with millisecond execution latency.
            </p>
            <p>
              Furthermore, I developed the headless MetaTrader terminal provisioning system on Linux VPS using Wine, Xvfb, and Kubectl. This complex infrastructure allowed for seamless, secure connectivity across brokers and prop firms, powering the MQL5 Expert Advisors I built for real-time trade execution and WebSocket streaming.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Core Features</h2>
          </div>
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-3">
              {[
                { title: "Exoper Algorithm", desc: "The proprietary Exoper Algorithm powers the top-down technical and macroeconomic analysis, autonomously interpreting market conditions across 13 timeframes in strict alignment with the user's trading system." },
                { title: "Core Knowledge Base", desc: "The system is deeply integrated with an advanced RAG (Retrieval-Augmented Generation) pipeline. This core knowledge base works in tandem with the trader's personalized system, allowing the AI to trade with the nuanced discretion and contextual awareness of a professional trader." },
                { title: "Trading System Builder", desc: "Design your personalized edge across 14 deep categories including Identity, Risk, Structural Frameworks, Confluence, and Psychology." },
                { title: "Automated Trading Plan", desc: "The AI digests your Trading System to generate a rigid Trading Plan, complete with an edge summary, risk envelopes, and discipline scorecards." },
                { title: "Monitoring & Management", desc: "Autonomously monitor live and pending orders. The system actively runs confirmations, executes pending orders when confirmations are met, manages trades during high-impact news, moves stops to break-even, applies trailing stops, and closes trades efficiently." },
                { title: "Execution & AI Guards", desc: "Configure exact execution parameters and toggle automated safety guards to block trades during news, low liquidity, or when parameters are breached." },
                { title: "Multi-Asset Coverage", desc: "Trade seamlessly across a vast array of global markets including Forex, Metals, Stocks, Crypto, Deriv Synthetics, and Volatilities." },
                { title: "Broker Connectivity", desc: "Provision your MT5 terminal securely and connect to multiple accounts without your funds ever leaving your broker." },
                { title: "Automated Journaling", desc: "Exoper automatically syncs every execution, tracking R:R, win rates, and emotional discipline with zero manual entry required." }
              ].map((feature, idx) => (
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
                { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
                { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
                { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg' }
              ].map((tech, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center gap-3 p-4 border border-gray-800 rounded-xl bg-[#110e16] hover:border-gray-600 transition-colors">
                  <img src={tech.icon} alt={tech.name} className={`w-8 h-8 object-contain ${tech.invert ? 'invert' : ''}`} />
                  <span className="text-xs font-semibold text-gray-300">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Summary */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32 mb-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Project Summary</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              Exoper is a testament to the power of combining deep domain expertise with cutting-edge engineering. By merging advanced multi-LLM analysis with robust, low-latency execution infrastructure, we created a platform that genuinely levels the playing field for traders.
            </p>
            <p>
              It stands as proof that with the right technological guardrails and analytical rigor, emotional trading can be systematically eliminated, allowing traders to operate with institutional precision, structure, and absolute confidence.
            </p>
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
