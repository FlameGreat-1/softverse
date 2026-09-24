"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Carousel from "@/components/Carousel";

export default function CosmicForgeCaseStudy() {
  const [activeFeature, setActiveFeature] = useState<number | null>(0);

  const carouselImages = [
    { src: "/images/cosmicforge1.png", caption: "Dashboard Overview" },
    { src: "/images/cosmicforge2.png", caption: "Patient Communications" },
    { src: "/images/cosmicforge3.png", caption: "Scheduling Calendar" },
  ];

  const features = [
    {
      title: "AI-Powered Triage",
      desc: "The core of CosmicForge HealthNet. Users interact with a deeply integrated AI that understands medical context to efficiently route patients to the right specialists."
    },
    {
      title: "Secure Video Consultations",
      desc: "Low latency, end-to-end encrypted video streaming directly within the browser, ensuring HIPAA compliance and data privacy."
    },
    {
      title: "Real-time Patient Data Sync",
      desc: "Live synchronization of patient health records across different provider views without page reloads."
    },
    {
      title: "Automated Appointment Scheduling",
      desc: "Smart scheduling engine that cross-references provider availability and patient preferences instantly."
    }
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
      <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-tight mb-16 max-w-5xl">
        CosmicForge HealthNet — AI-powered telemedicine platform that connects patients with healthcare professionals for virtual consultations and medical advice.
      </h1>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-b border-gray-800 py-8 mb-16">
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Year</h4>
          <p className="font-semibold text-sm">2024</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Type</h4>
          <p className="font-semibold text-sm">Healthcare Software</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Client</h4>
          <p className="font-semibold text-sm">CosmicForge</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Role</h4>
          <p className="font-semibold text-sm">Full Stack Developer</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Status</h4>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
            <p className="font-semibold text-sm">Active</p>
          </div>
        </div>
      </div>

      <div className="mb-32">
        <Carousel
          slides={carouselImages}
          autoPlay={true}
          autoPlayInterval={5000}
          showIndicators={true}
          showArrows={true}
          className="h-[300px] sm:h-[500px] lg:h-[700px] rounded-2xl"
        />
      </div>

      {/* Content Sections */}
      <div className="space-y-32">
        
        {/* The Problem & The Solution */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">The Problem</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              For years, remote healthcare has been bottlenecked by fragmented tools. On one side are complex enterprise EHR systems demanding months of onboarding; on the other, disconnected video conferencing tools that lack compliance and workflow integration. For patients and providers, this friction is more than just an inconvenience—it's a barrier to effective care.
            </p>
            <p>
              Imagine needing urgent medical advice, but you are forced to juggle three different platforms just to schedule a meeting, share your medical history, and speak to a doctor. You're hitting a brick wall the moment you try to seek care online.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">The Solution</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              I wanted to tear down the technical wall between patients and providers. That is why I built <strong className="text-white">CosmicForge HealthNet</strong>. It is a unified platform that lets clinics manage appointments, conduct virtual consultations, and handle patient data seamlessly without dealing with complex, legacy pipelines.
            </p>
            <p>
              Beyond video calls, CosmicForge includes an AI-powered triage system that helps direct patient queries to the appropriate specialists instantly, making the remote healthcare experience feel more natural and less technical.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link href="https://www.cosmicforge-healthnet.com" target="_blank" className="px-6 py-3 bg-[#111] hover:bg-gray-800 border border-gray-700 rounded-full text-sm font-semibold transition-colors flex items-center gap-2">
                CONTINUE READING <span className="rotate-90">➔</span>
              </Link>
              <Link href="https://www.cosmicforge-healthnet.com" target="_blank" className="px-6 py-3 bg-my-primary hover:bg-[#a65abf] shadow-[0_0_20px_#C778DD55] rounded-full text-white text-sm font-semibold transition-all flex items-center gap-2">
                VISIT WEBSITE <span className="-rotate-45">➔</span>
              </Link>
            </div>
          </div>
        </div>

        {/* My Role & Features */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">My Role</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              I am a core Full Stack Developer behind the CosmicForge platform. Building a comprehensive, production-grade telemedicine tool from scratch is an immense undertaking, but it's a challenge I ran toward. 
            </p>
            <p>
              I didn't just write the code; I helped engineer the entire ecosystem—from the complex backend architecture in Python FastAPI to the highly responsive patient portals using TypeScript and Next.js.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Features</h2>
          </div>
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-3">
              {features.map((feature, idx) => (
                <div key={idx} className="border border-gray-800 rounded-xl overflow-hidden bg-[#15121b]">
                  <button 
                    onClick={() => setActiveFeature(activeFeature === idx ? null : idx)}
                    className={`w-full flex justify-between items-center px-6 py-4 font-semibold text-sm transition-colors ${activeFeature === idx ? 'bg-[#8b31ff] text-white' : 'text-gray-300 hover:bg-[#1a1721]'}`}
                  >
                    {feature.title}
                    <svg className={`w-5 h-5 transition-transform duration-300 ${activeFeature === idx ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              To bring this ambitious platform to life, I carefully architected a modern, high-performance tech stack:
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-2">Frontend & Framework</h4>
                <p>React, Next.js, and TypeScript form the backbone of the platform, ensuring type-safe, fast, and scalable user interfaces.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Backend & API</h4>
                <p>Python FastAPI handles the heavy lifting, orchestrating highly concurrent requests, WebSocket connections, and complex data validations.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Database Architecture</h4>
                <p>MongoDB cleanly manages the schema and state of patient records, schedules, and unstructured medical logs.</p>
              </div>
            </div>

            {/* Tech Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center justify-center gap-3 p-6 border border-gray-800 rounded-xl bg-[#110e16] hover:border-gray-600 transition-colors">
                <span className="text-xs font-semibold text-gray-300">Python</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 p-6 border border-gray-800 rounded-xl bg-[#110e16] hover:border-gray-600 transition-colors">
                <span className="text-xs font-semibold text-gray-300">TypeScript</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 p-6 border border-gray-800 rounded-xl bg-[#110e16] hover:border-gray-600 transition-colors">
                <span className="text-xs font-semibold text-gray-300">React</span>
              </div>
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
              CosmicForge HealthNet is a testament to the power of combining modern technologies with relentless execution. It bridges the gap between imagination and reality, offering a frictionless path for anyone to receive care online.
            </p>
            <p>
              Developed alongside a talented team, it stands as proof that with enough zeal and organizational command, we can build platforms that truly empower the next generation of healthcare.
            </p>
          </div>
        </div>

      </div>

      {/* Footer Nav */}
      <div className="border-t border-gray-800 pt-12 flex justify-end">
        <Link href="/projects/autonoms-ai" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-semibold tracking-wide">
          NEXT PROJECT <span>➔</span>
        </Link>
      </div>

    </div>
  );
}
