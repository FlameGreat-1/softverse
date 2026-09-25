"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SidesoneCaseStudy() {
  const [activeFeature, setActiveFeature] = useState<number | null>(0);

  const deviceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deviceRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1, 0.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0, 1, 1, 0]);

  const features = [
    { title: "Production Server Recovery", desc: "Successfully recovered a locked production server, saving crucial agency data and preventing prolonged downtime." },
    { title: "Application Refactoring", desc: "Rebuilt and refactored legacy applications from the ground up, achieving a massive 62% improvement in overall system performance and load times." },
    { title: "Stripe Payment Re-engineering", desc: "Completely re-architected the Stripe payment integration to ensure secure, seamless, and error-free transactions for all portfolio services." },
    { title: "Containerized Infrastructure", desc: "Migrated the entire monolithic architecture to a modern, containerized infrastructure (Docker/Kubernetes), capable of reliably serving over 3,000 concurrent users." }
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
        Sidesone — Agency infrastructure overhauled. 62% performance boost and robust containerized scaling.
      </h1>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-b border-gray-800 py-8 mb-16">
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Timeline</h4>
          <p className="font-semibold text-sm">2022 — 2023</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Type</h4>
          <p className="font-semibold text-sm">Infrastructure</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Client</h4>
          <p className="font-semibold text-sm">Sidesone Agency</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Role</h4>
          <p className="font-semibold text-sm">Cloud/Backend Engineer</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Status</h4>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
            <p className="font-semibold text-sm">Completed</p>
          </div>
        </div>
      </div>

      {/* Intro & Actions */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
        <div className="space-y-8">
          <p className="text-gray-400 text-lg leading-relaxed">
            Sidesone is a prominent agency that faced a critical infrastructure crisis. Their production server was locked, applications were highly unoptimized, and the payment gateway was failing. I stepped in to recover the data, rebuild the architecture, and scale their infrastructure to easily handle their growing user base.
          </p>

          <div className="flex gap-6 items-center">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">62%</span>
              <span className="text-xs text-my-primary font-bold tracking-widest uppercase">Performance Boost</span>
            </div>
            <div className="w-[1px] h-10 bg-gray-800"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">3,000+</span>
              <span className="text-xs text-my-primary font-bold tracking-widest uppercase">Active Users</span>
            </div>
          </div>

          <div className="flex items-center justify-start gap-2 sm:gap-4 pt-4 w-full">
            <button onClick={() => {
              document.getElementById('case-study-details')?.scrollIntoView({ behavior: 'smooth' });
            }} className="px-3 sm:px-6 py-3 bg-[#111] hover:bg-gray-800 border border-gray-700 rounded-full text-[10px] sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none">
              CONTINUE READING <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </button>
            <Link href="#" className="px-3 sm:px-6 py-3 bg-my-primary hover:bg-[#a65abf] shadow-[0_0_20px_#C778DD55] rounded-full text-white text-[10px] sm:text-sm font-semibold transition-all flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none opacity-50 cursor-not-allowed">
              INTERNAL PROJECT
            </Link>
          </div>
        </div>

        <motion.div 
          ref={deviceRef} 
          style={{ scale, opacity }} 
          className="relative w-full h-[300px] lg:h-[450px] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(199,121,221,0.15)]"
        >
          <Image 
            src="/images/sidesone.png" 
            alt="Sidesone Project Screenshot" 
            fill 
            className="object-cover" 
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
              When an agency's core infrastructure fails, the entire business halts. Sidesone experienced a catastrophic scenario where their production server became completely locked. 
            </p>
            <p>
              Beyond the immediate crisis, their legacy monolithic applications were suffering from extreme technical debt, resulting in slow load times and unreliable Stripe payment webhooks that were directly impacting their revenue.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">The Solution & My Role</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              I immediately jumped into crisis management, safely extracting their critical data and restoring services on a temporary staging environment. With the bleeding stopped, I began a comprehensive audit and refactoring of their entire stack.
            </p>
            <p>
              I rebuilt their core applications, stripping out bloated dependencies and optimizing database queries, which directly resulted in a 62% increase in application speed. I completely re-engineered their Stripe integration to use modern, secure webhook handling ensuring zero dropped payments.
            </p>
            <p>
              Finally, to prevent future failures, I migrated their entire architecture into Docker containers orchestrated across a scalable cloud environment. The system now effortlessly handles over 3,000 users without breaking a sweat.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Key Milestones</h2>
            <p className="text-gray-500 mt-4 text-sm font-semibold uppercase tracking-widest">Engineering Achievements</p>
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
              The rescue and migration operation required a robust, modern devops toolchain:
            </p>
            
            {/* Tech Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {[
                { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
                { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg', invert: true },
                { name: 'Nginx', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg' },
                { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
                { name: 'Stripe', icon: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
                { name: 'DigitalOcean', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/digitalocean/digitalocean-original.svg' }
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
        <Link href="/projects/exoper" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-semibold tracking-wide">
          <span>&lt;</span> PREVIOUS PROJECT
        </Link>
        <Link href="/projects" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-semibold tracking-wide">
          ALL PROJECTS <span>➔</span>
        </Link>
      </div>

    </div>
  );
}
