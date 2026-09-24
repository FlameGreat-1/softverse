"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import Carousel from "@/components/Carousel";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CosmicForgeCaseStudy() {
  const [activeFeature, setActiveFeature] = useState<number | null>(0);

  const deviceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deviceRef,
    offset: ["start end", "end start"]
  });

  // Scroll UP (element moves down viewport toward 0): Gets bigger (1.5) and disappears (opacity 0)
  // Scroll DOWN (element moves up viewport toward 1): Gets smaller (0.1) and disappears (opacity 0)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1, 0.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const carouselImages = [
    { src: "/images/cosmicforge1.png", caption: "Dashboard Overview" },
    { src: "/images/cosmicforge2.png", caption: "Patient Communications" },
    { src: "/images/cosmicforge3.png", caption: "Scheduling Calendar" },
  ];

  const features = [
    { title: "Telemedicine", desc: "See your doctor from anywhere with video, audio, chat, and remote monitoring that feels just like an in-person visit." },
    { title: "Patient Management", desc: "Your entire medical history, prescriptions, hospital stays, and vaccinations in one secure place always ready when you need it." },
    { title: "Pharmacy", desc: "Prescriptions connect directly to partner pharmacies for fast orders, easy tracking, and timely patient updates." },
    { title: "Lab", desc: "Skip the delays with digital test orders, faster results, and instant sharing between labs, doctors, and patients." },
    { title: "Medical Tour", desc: "Traveling for care is seamless, track every stage of your journey from departure to recovery with full transparency." },
    { title: "AI Tools Feature", desc: "Smarter care at your fingertips, AI checks symptoms, supports diagnosis, and recommends treatments based on real data." },
    { title: "AR VR Feature", desc: "Step inside your care plan with immersive visuals that make medical explanations clearer and easier to understand." },
    { title: "Virtual Communities", desc: "Join trusted spaces where patients and doctors connect, learn, and support each other beyond hospital walls." }
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

      {/* Hero Carousel */}
      <div className="mb-16">
        <Carousel
          slides={carouselImages}
          autoPlay={true}
          autoPlayInterval={5000}
          showIndicators={true}
          showArrows={true}
          className="h-[300px] sm:h-[500px] lg:h-[700px] rounded-2xl"
        />
      </div>

      {/* Intro & Actions */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
        <div className="space-y-8">
          <p className="text-gray-400 text-lg leading-relaxed">
            CosmicForge HealthNet connects patients with healthcare professionals from local doctors to international specialists, breaking down geographical barriers to quality medical care. In regions with inadequate healthcare infrastructure, especially rural and underserved areas, CosmicForge delivers top-tier medical expertise through innovative digital channels.
          </p>

          <div className="flex gap-6 items-center">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">37+</span>
              <span className="text-xs text-my-primary font-bold tracking-widest uppercase">Verified Doctors & Nurses</span>
            </div>
            <div className="w-[1px] h-10 bg-gray-800"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">71+</span>
              <span className="text-xs text-my-primary font-bold tracking-widest uppercase">Verified Patients</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button onClick={() => {
              document.getElementById('case-study-details')?.scrollIntoView({ behavior: 'smooth' });
            }} className="px-6 py-3 bg-[#111] hover:bg-gray-800 border border-gray-700 rounded-full text-sm font-semibold transition-colors flex items-center gap-2">
              CONTINUE READING <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </button>
            <Link href="https://www.cosmicforge-healthnet.com" target="_blank" className="px-6 py-3 bg-my-primary hover:bg-[#a65abf] shadow-[0_0_20px_#C778DD55] rounded-full text-white text-sm font-semibold transition-all flex items-center gap-2">
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
            src="/images/CosmicForgeDevice.png" 
            alt="CosmicForge Device Application" 
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
              For years, remote healthcare has been bottlenecked by fragmented tools. On one side are complex enterprise EHR systems demanding months of onboarding; on the other, disconnected video conferencing tools that lack compliance and workflow integration. For patients and providers, this friction is more than just an inconvenience—it's a barrier to effective care.
            </p>
            <p>
              Imagine needing urgent medical advice, but you are forced to juggle three different platforms just to schedule a meeting, share your medical history, and speak to a doctor. You're hitting a brick wall the moment you try to seek care online.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">The Solution</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              CosmicForge wanted to tear down the technical wall between patients and providers. That is where I came in and built <strong className="text-white">CosmicForge HealthNet</strong>. It is a unified platform that lets clinics manage appointments, conduct virtual consultations, and handle patient data seamlessly without dealing with complex, legacy pipelines.
            </p>
            <p>
              Beyond video calls, CosmicForge includes an AI-powered triage system that helps direct patient queries to the appropriate specialists instantly, making the remote healthcare experience feel more natural and less technical.
            </p>
          </div>
        </div>

        {/* For Doctors */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">For Doctors</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              As a doctor, you can use the platform to manage patients with less administrative work. Every patient has a comprehensive profile with medical history, lab results, and prescriptions. This reduces repeated questions and shortens consultation times.
            </p>
            <p>
              You can consult from anywhere using either video, audio, or chat while maintaining full visibility of patient information. You can order lab tests and prescriptions directly through the system, and your patients get to receive their results without delay, and share updates with you as a doctor instantly.
            </p>
            <p>
              The platform's AI-driven features assist with identifying patterns, improving diagnostic accuracy, and reducing errors. The platform was designed to support efficiency without losing the human side of care.
            </p>
          </div>
        </div>

        {/* For Patients */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">For Patients</h2>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              As a patient, CosmicForge connects you to trusted healthcare providers remotely. Appointments are booked with a few clicks, and consultations take place securely. Every patient profile is comprehensive and includes history, hospitalizations, vaccinations, and prescriptions. This means your doctor always has the right information for your care.
            </p>
            <p>
              CosmicForge hosts all your test results and prescriptions securely in one place to minimize confusion and cases of missed treatments. You can also directly interact with labs and doctors at any given time.
            </p>
            <p>
              Your safety is a top priority. Advanced encryption and strict compliance measures are used to protect sensitive information. Patients traveling for medical procedures are also supported through a partnership with tour guides. Your full journey, from departure to recovery, is tracked for clarity and peace of mind.
            </p>
            <p>
              With Cosmicforge HealthNet, you can experience healthcare that is accessible, organized, and reliable.
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
              I am a core Full Stack Developer behind the CosmicForge platform. Building a comprehensive, production-grade telemedicine tool from scratch is an immense undertaking, but it's a challenge I ran toward. 
            </p>
            <p>
              I didn't just write the code; I helped engineer the entire ecosystem—from the complex backend architecture in Python FastAPI to the highly responsive patient portals using TypeScript and Next.js.
            </p>
          </div>
        </div>

        {/* Features */}
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
                <h4 className="text-white font-semibold mb-2">Frontend & UI/UX</h4>
                <p>Designed in Figma, then built with React, Next.js, and TypeScript to form the backbone of the platform, ensuring type-safe, fast, and scalable user interfaces.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Backend & API</h4>
                <p>Node.js drives the core backend services, while Python FastAPI is dedicated to handling AI/ML workflows, orchestrating highly concurrent requests, and complex data validations.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Database Architecture</h4>
                <p>MongoDB cleanly manages the schema and state of patient records, schedules, and unstructured medical logs.</p>
              </div>
            </div>

            {/* Tech Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {[
                { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
                { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
                { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invert: true },
                { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
                { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
                { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
                { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
                { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' }
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
