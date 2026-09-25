"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Carousel from "@/components/Carousel";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PortfolioCaseStudy() {
  const deviceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deviceRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1, 0.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0, 1, 1, 0]);

  const carouselImages = [
    { src: "/images/Portfolio.png", caption: "Personal Portfolio Overview" },
    { src: "/images/Portfolio.png", caption: "Projects Showcase" },
    { src: "/images/Portfolio.png", caption: "Experience Timeline" },
  ];

  return (
    <div className="min-h-screen text-white px-4 sm:px-12 lg:px-32 py-32 bg-[#0b090f] overflow-x-hidden">
      {/* Top Nav */}
      <div className="mb-12">
        <Link href="/projects/all" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-semibold tracking-wide">
          <span>&lt;</span> All Projects
        </Link>
      </div>

      {/* Header Section */}
      <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-tight mb-16">
        Portfolio Website — A highly dynamic, animated personal portfolio engineered to showcase full-stack experience, projects, and achievements.
      </h1>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-b border-gray-800 py-8 mb-16">
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Year</h4>
          <p className="font-semibold text-sm">2026</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Type</h4>
          <p className="font-semibold text-sm">Web Application</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Client</h4>
          <p className="font-semibold text-sm">Personal</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Role</h4>
          <p className="font-semibold text-sm">Full Stack Engineer</p>
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
            This portfolio was designed and engineered from the ground up to reflect my identity as a Full-Stack Engineer and Founder. It serves not just as a standard resume, but as a full-stack proof of concept—showcasing advanced UI/UX interactions, complex animations, performance optimization, clean component architecture, and a robust backend infrastructure powering dynamic features like the upcoming blogging engine.
          </p>

          <div className="flex gap-6 items-center">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">100%</span>
              <span className="text-xs text-my-primary font-bold tracking-widest uppercase">Custom Architecture</span>
            </div>
            <div className="w-[1px] h-10 bg-gray-800"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">&lt;1s</span>
              <span className="text-xs text-my-primary font-bold tracking-widest uppercase">Load Times</span>
            </div>
          </div>

          <div className="flex items-center justify-start gap-2 sm:gap-4 pt-4 w-full">
            <button onClick={() => {
              document.getElementById('case-study-details')?.scrollIntoView({ behavior: 'smooth' });
            }} className="px-3 sm:px-6 py-3 bg-[#111] hover:bg-gray-800 border border-gray-700 rounded-full text-[10px] sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none">
              CONTINUE READING <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </button>
            <Link href="/" className="px-3 sm:px-6 py-3 bg-my-primary hover:bg-[#a65abf] shadow-[0_0_20px_#C778DD55] rounded-full text-white text-[10px] sm:text-sm font-semibold transition-all flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none">
              VIEW LIVE SITE <span className="-rotate-45">➔</span>
            </Link>
          </div>
        </div>

        <motion.div 
          ref={deviceRef} 
          style={{ scale, opacity }} 
          className="relative w-full h-[200px] lg:h-[300px]"
        >
          <Image 
            src="/images/testimonial-emoji.png" 
            alt="Portfolio Device Display" 
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
            <h2 className="text-3xl font-bold">The Vision</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              In the modern tech landscape, a developer's portfolio is their most critical asset. I needed a platform that did more than list my experience—it needed to embody my engineering principles. The goal was to build a site with institutional-grade quality, seamless animations, and a distinct aesthetic that instantly communicates competence and creativity.
            </p>
            <p>
              Every interaction on this site, from the scroll-triggered animations to the dynamic page transitions, was meticulously engineered to provide a frictionless and deeply engaging user experience.
            </p>
          </div>
        </div>
        
        {/* Tech Stack */}
        <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-my-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <h2 className="text-2xl font-bold mb-8">Technical Architecture</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-2">Frontend Framework</h4>
              <p className="text-gray-400 text-sm">Next.js 14 (App Router)</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Backend & API</h4>
              <p className="text-gray-400 text-sm">Node.js, Express & Serverless</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Styling & UI</h4>
              <p className="text-gray-400 text-sm">Tailwind CSS & Framer Motion</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Infrastructure</h4>
              <p className="text-gray-400 text-sm">Vercel & Custom Backend Deployment</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
