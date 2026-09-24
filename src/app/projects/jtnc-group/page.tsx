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
    <div className="min-h-screen text-white px-4 sm:px-12 lg:px-32 py-32 bg-[#0b090f] overflow-hidden">
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
            src="/images/jtnc.png"
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
        
        {/* About & Bridging the Gap */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">About JTNC Group</h2>
            <p className="text-my-primary mt-2 font-medium">Decades of Experience. One Mission: Empower the Modern Trader.</p>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              At JTNC Group, we bring together over 20 years of real-world trading experience with a relentless drive to deliver institutional-quality tools to individual investors. Our founders have managed the movement of tens of millions of dollars across global markets, leading trading desks, building hedge fund strategies, and advising clients through every type of market condition, from bubbles to breakdowns.
            </p>
            <p>
              That depth of experience isn't theoretical, it's lived, earned, and embedded into everything we build.
            </p>
            <h3 className="text-xl font-semibold text-white pt-6">Bridging the Gap Between Retail and Institutional</h3>
            <p>
              What sets JTNC Group apart isn't just our trading pedigree, it's our vision for the future of retail trading. We've built a proprietary technology stack that leverages machine learning, predictive analytics, and advanced market structure analysis tools that were once the exclusive domain of hedge funds and investment banks.
            </p>
            <p>
              With our platform, we bring this edge to individual traders. Our mission is to democratize alpha, providing everyday investors access to powerful tools once reserved for institutions.
            </p>
          </div>
        </div>

        {/* Where Insight Meets Innovation */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Where Insight Meets Innovation</h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-gray-400 leading-relaxed mb-8">
              Whether you're new to trading or a seasoned professional, our ecosystem is designed to help you succeed. We don't just sell signals. We provide the infrastructure, the logic, and the confidence to help you trade smarter and win more often.
            </p>
            <ul className="space-y-4">
              {[
                "Proprietary signal generation backed by statistical edge",
                "Battle-tested models built for dynamic markets",
                "Automated execution with full user control",
                "Education and support from a team that's traded through it all"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-my-primary shrink-0"></div>
                  <p className="text-gray-300">{item}</p>
                </li>
              ))}
            </ul>
            <p className="text-gray-400 leading-relaxed mt-8 font-medium">
              At JTNC Group, we don't follow the market. We anticipate it.
            </p>
          </div>
        </div>

        {/* Scaled Growth & Solutions */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Solutions & Scale</h2>
            <p className="text-my-primary mt-2 font-medium">Built for Today. Designed to Scale for Tomorrow.</p>
          </div>
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-3">
              {[
                { title: "Under $25K Accounts", desc: "We execute single-leg options trades to help you stay compliant with pattern day trading (PDT) rules. No complex spreads. Just clean, directional setups using Calls and Puts." },
                { title: "Over $25K Accounts", desc: "You'll have access to our spread-based strategies, which take advantage of volatility and price structure while maintaining defined risk." },
                { title: "Liquidity and Precision", desc: "At launch, Quantum Flo Auto Algo will trade only the most liquid options markets: SPY, SPX, and QQQ. Our first priority is execution quality, especially as our user base grows." },
                { title: "Intelligent Scaling Algorithms", desc: "Leveraging five proprietary execution models from our prime broker, the algo will scale in and out of trades across multiple strikes and timeframes avoiding size distortion or slippage." },
                { title: "Basket Expansion", desc: "We'll introduce a curated basket of highly liquid, option-rich stocks (think: AAPL, MSFT, NVDA, etc.) to diversify signal output and accommodate additional user flow." },
                { title: "Futures & Crypto Auto Algo", desc: "Dedicated versions for equity index futures and crypto markets are in the pipeline, offering global exposure, enhanced leverage, and around-the-clock volatility capture." }
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

        {/* How It Works */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-my-primary mt-2 font-medium">Institutional Intelligence. Retail Simplicity. Fully Automated.</p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-gray-400 leading-relaxed mb-8">
              The Quantum Flo Auto Algo is the culmination of years of development inside our hedge fund and trading research group. It borrows directly from our systematic trading technology, the same tools we've used for over two years in our Weekly Superstars service.
            </p>
            
            <div className="flex flex-col gap-3">
              {[
                { title: "1. Predict the Probable Range", desc: "Each day, the algo forecasts the likely price range of the market with a confidence level of 70% or higher. This range acts like a trading 'band,' guiding the algorithm on where price is expected to move in the next 24 hours." },
                { title: "2. Follow the Herd (When It Matters)", desc: "Next, the algo analyzes if herd behavior, largely driven by where institutional flows are likely to participate in a directional move. This logic is derived from our MSI indicator, which anticipates where sentiment and positioning are aligned to fuel momentum." },
                { title: "3. Strike with Accuracy", desc: "Armed with range and sentiment signals, the algo uses options market microstructure to identify high-probability entry points—levels that are either well-supported by buyers or heavily defended by sellers. The algo will wait for price to reach these levels and execute trades accordingly." },
                { title: "4. Automated Exits & Full Control", desc: "If herd behavior fades, or if price exits the predicted range, the trade is automatically closed preserving gains or minimizing risk. You maintain complete control at all times via your broker. Pause it. Shut it off. Take over a trade manually." }
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
                { name: 'Oracle Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg' },
                { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
                { name: 'CI/CD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg' }
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
