"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function JtncGroupCaseStudy() {
  const [activeFeature, setActiveFeature] = useState<number | null>(0);
  const [activeProcess, setActiveProcess] = useState<number | null>(0);

  const deviceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deviceRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1, 0.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div className="min-h-screen text-white px-4 sm:px-12 lg:px-32 py-32 bg-[#0b090f] overflow-x-hidden">
      {/* Top Nav */}
      <div className="mb-12">
        <Link href="/projects/all" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-semibold tracking-wide w-fit">
          <span>&lt;</span> More Projects
        </Link>
      </div>

      {/* Header Section */}
      <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-tight mb-16 max-w-5xl">
        JTNC GROUP — Backend trading infrastructure for managing algorithmic trading signals and broker order routing.
      </h1>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-b border-gray-800 py-8 mb-16">
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Duration</h4>
          <p className="font-semibold text-sm">Feb 2019 — Mar 2022</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Type</h4>
          <p className="font-semibold text-sm">Algorithmic Trading</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Company</h4>
          <p className="font-semibold text-sm">JTNC GROUP</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Role</h4>
          <p className="font-semibold text-sm">Backend Engineer</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Location</h4>
          <p className="font-semibold text-sm">U.S.A (Remote)</p>
        </div>
      </div>

      {/* Hero Carousel */}
      <div className="mb-16">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-800 bg-[#080808]">
          <Image
            src="/images/jtnc.png"
            alt="JTNC Group Main Preview"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Intro & Actions */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
        <div className="space-y-8">
          <p className="text-gray-400 text-lg leading-relaxed">
            Rebuilt and maintained core trading infrastructure in Python, migrating from a monolithic architecture to a scalable microservice-based system deployed on Oracle Cloud, supporting platform operations across $1B+ AUM; engineered and maintained the QuantumFlow algorithmic trading engine optimising low-latency order routing, signal processing, and real-time broker integration across multiple asset classes.
          </p>

          <div className="flex items-center justify-start gap-2 sm:gap-4 pt-4 w-full">
            <button onClick={() => {
              document.getElementById('case-study-details')?.scrollIntoView({ behavior: 'smooth' });
            }} className="px-3 sm:px-6 py-3 bg-[#111] hover:bg-gray-800 border border-gray-700 rounded-full text-[10px] sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none">
              CONTINUE READING <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </button>
            <Link href="https://qfaa.jtncgroup.com/" target="_blank" className="px-3 sm:px-6 py-3 bg-my-primary hover:bg-[#a65abf] shadow-[0_0_20px_#C778DD55] rounded-full text-white text-[10px] sm:text-sm font-semibold transition-all flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none">
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
            src="/images/Jntc2.jpg"
            alt="JTNC Group Application Screenshot"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </motion.div>
      </div>

      {/* Content Sections */}
      <div id="case-study-details" className="space-y-32 scroll-mt-32">
        
        {/* Project Context */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Project Context</h2>
            <p className="text-my-primary mt-2 font-medium">Democratizing Institutional Tools for Retail</p>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              JTNC Group's mission is to bridge the gap between retail trading and institutional hedge-fund capabilities by providing proprietary predictive analytics and advanced market structure tools. The product relies on processing massive streams of real-time financial data to automate complex execution logic on behalf of individual investors.
            </p>
            <p>
              During my tenure as a Backend Engineer, my core responsibility was architecting and rebuilding the trading infrastructure required to support this vision. This involved migrating legacy monolithic applications into a highly available microservices ecosystem capable of processing algorithmic signals at scale with minimal latency, supporting over $1B+ in AUM.
            </p>
          </div>
        </div>

        {/* Architecting for Scale */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Architecting for Scale</h2>
            <p className="text-my-primary mt-2 font-medium">Engineered for diverse accounts and robust growth</p>
          </div>
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-3">
              {[
                { title: "Dynamic Logic for Account Constraints", desc: "Engineered routing pipelines that adapted execution models based on the client's capital. For accounts under $25K, the system automatically routed single-leg options to comply with Pattern Day Trading (PDT) rules, while seamlessly transitioning to spread-based volatility strategies for larger portfolios." },
                { title: "Intelligent Scaling Algorithms", desc: "Integrated five proprietary execution models directly with prime brokers, allowing the Quantum Flo engine to dynamically scale in and out of trades across multiple strikes without inducing size distortion or slippage." },
                { title: "High-Liquidity Data Ingestion", desc: "Designed the initial data pipelines to strictly target the most liquid options markets (SPY, SPX, QQQ), ensuring maximum execution efficiency before expanding the architecture to support a curated basket of highly liquid tech equities." },
                { title: "Extensible Microservices", desc: "Built the foundation in Python and Oracle Cloud to allow rapid horizontal scaling, paving the way for future integrations such as the Futures Auto Algo and cross-border Crypto market execution without altering core system topology." }
              ].map((feature, idx) => (
                <div key={idx} className="border border-gray-800 rounded-xl overflow-hidden bg-[#15121b]">
                  <button 
                    onClick={() => setActiveFeature(activeFeature === idx ? null : idx)}
                    className={`w-full flex justify-between items-center px-6 py-4 font-semibold text-sm transition-colors text-left ${activeFeature === idx ? 'bg-[#8b31ff] text-white' : 'text-gray-300 hover:bg-[#1a1721]'}`}
                  >
                    <span>{feature.title}</span>
                    <svg className={`w-5 h-5 transition-transform ${activeFeature === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {activeFeature === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 py-5 text-gray-400 text-sm leading-relaxed bg-[#110e16]">
                          {feature.desc}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engine Implementation */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Algorithmic Engine</h2>
            <p className="text-my-primary mt-2 font-medium">Translating trading theory into reliable Python execution</p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-gray-400 leading-relaxed mb-8">
              A major technical challenge was translating JTNC's battle-tested trading models into a fully automated execution framework capable of analyzing market conditions and reacting with machine-speed precision. 
            </p>
            
            <div className="flex flex-col gap-3">
              {[
                { title: "Predictive Range Modeling", desc: "Developed the backend services that aggregated market data to calculate daily probable price ranges with 70%+ confidence intervals, generating trading 'bands' to constrain the algorithm's operational window." },
                { title: "MSI Indicator Integration", desc: "Built the signal processors necessary to interpret the proprietary Market State Indicator (MSI). This required ingesting massive sentiment and institutional flow data to detect herd behavior and align the system with directional momentum." },
                { title: "Options Microstructure Execution", desc: "Engineered the logic that parsed options market microstructure in real-time, identifying well-supported buyer/seller levels to pinpoint high-probability entries. The system autonomously awaited these thresholds before triggering API-based broker execution." },
                { title: "Risk Mitigation & Automated Exits", desc: "Implemented state machines that continuously evaluated open positions against the predicted range. If institutional flow faded or price exited the forecasted bands, the system autonomously liquidated positions, all while offering the client a manual override capability via the control center." }
              ].map((process, idx) => (
                <div key={idx} className="border border-gray-800 rounded-xl overflow-hidden bg-[#15121b]">
                  <button 
                    onClick={() => setActiveProcess(activeProcess === idx ? null : idx)}
                    className={`w-full flex justify-between items-center px-6 py-4 font-semibold text-sm transition-colors text-left ${activeProcess === idx ? 'bg-[#8b31ff] text-white' : 'text-gray-300 hover:bg-[#1a1721]'}`}
                  >
                    <span>{process.title}</span>
                    <svg className={`w-5 h-5 transition-transform ${activeProcess === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {activeProcess === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 py-5 text-gray-400 text-sm leading-relaxed bg-[#110e16]">
                          {process.desc}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Contributions & Tech Stack */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32 pb-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Engineering Contributions</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-8 leading-relaxed">
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-2">Scalable Microservices Migration</h4>
                <p>Designed and executed the transition from a monolithic architecture to a highly scalable, microservice-based system deployed on Oracle Cloud, ensuring high availability and robust performance across $1B+ AUM.</p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">Algorithmic Engine & Portal</h4>
                <p>Designed a client-facing portal and control center for managing algorithmic trading signals, investor accounts, and broker order routing — supporting multi-client portfolio management at scale.</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Security & Compliance Infrastructure</h4>
                <p>Implemented end-to-end security including AES encryption, TLS/SSL, JWT, and RBAC with KYC/AML checks. Built real-time trade monitoring dashboards, alerting pipelines, and immutable audit logging ensuring full regulatory traceability.</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">CI/CD & Zero-Downtime Deployments</h4>
                <p>Established a mirrored staging environment with CI/CD automation for zero-downtime deployments and comprehensive regression testing across all platform services.</p>
              </div>
            </div>

            {/* Tech Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {[
                { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
                { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
                { name: 'Oracle Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg' },
                { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
                { name: 'CI/CD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg' },
                { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invert: true }
              ].map((tech, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center gap-3 p-4 border border-gray-800 rounded-xl bg-[#110e16] hover:border-gray-600 transition-colors">
                  <img src={tech.icon} alt={tech.name} className={`w-8 h-8 object-contain ${tech.invert ? 'invert' : ''}`} />
                  <span className="text-xs font-semibold">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
