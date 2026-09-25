"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Carousel from "@/components/Carousel";

const carouselImages = [
  { src: "/images/Inflexa1.png" },
  { src: "/images/Inflexa3.png" },
  { src: "/images/Inflexa4.png" },
  { src: "/images/Inflexa5.png" }
];

export default function InflexaCaseStudy() {
  const [activeFeature, setActiveFeature] = useState<number | null>(0);
  const [activeIntegration, setActiveIntegration] = useState<number | null>(0);

  const deviceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deviceRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 0.8]);
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
        Inflexa Technologies — A scalable, multi-vendor e-commerce platform powering offline-first educational ecosystems.
      </h1>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-b border-gray-800 py-8 mb-16">
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Duration</h4>
          <p className="font-semibold text-sm">Feb 2026 — Aug 2026</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Type</h4>
          <p className="font-semibold text-sm">E-Commerce & EdTech</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Client</h4>
          <p className="font-semibold text-sm">ESQ1 Tech</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Role</h4>
          <p className="font-semibold text-sm">Software Engineer</p>
        </div>
        <div>
          <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Location</h4>
          <p className="font-semibold text-sm">Nigeria (Contract)</p>
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
            Built and deployed Inflexa Technologies, a robust multi-vendor e-commerce platform designed to distribute physical and printable educational flashcard packs. Architected the backend infrastructure in Node.js and TypeScript to securely process payments, aggregate multi-provider logistics, and support a scalable "Age Roadmap" progression system for young learners.
          </p>

          <div className="flex items-center justify-start gap-2 sm:gap-4 pt-4 w-full">
            <button onClick={() => {
              document.getElementById('case-study-details')?.scrollIntoView({ behavior: 'smooth' });
            }} className="px-3 sm:px-6 py-3 bg-[#111] hover:bg-gray-800 border border-gray-700 rounded-full text-[10px] sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none">
              CONTINUE READING <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </button>
            <Link href="https://inflexatechnologies.com/" target="_blank" className="px-3 sm:px-6 py-3 bg-my-primary hover:bg-[#a65abf] shadow-[0_0_20px_#C778DD55] rounded-full text-white text-[10px] sm:text-sm font-semibold transition-all flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none">
              VISIT WEBSITE <span className="-rotate-45">➔</span>
            </Link>
          </div>
        </div>

        <motion.div
          ref={deviceRef}
          style={{ scale, opacity, rotate: 12 }}
          whileHover={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[300px] lg:h-[450px] drop-shadow-2xl"
        >
          <Image
            src="/images/flashpack.jpg"
            alt="Inflexa Interface Preview"
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
            <p className="text-my-primary mt-2 font-medium">Powering Offline-First Education</p>
          </div>
          <div className="lg:col-span-8 text-gray-400 space-y-6 leading-relaxed">
            <p>
              Inflexa was created to deliver screen-free, offline-first educational resources for children aged 6 to 16. The core product revolves around physical and printable flashcard packs that align with British curriculum standards across mathematics, science, and literacy.
            </p>
            <p>
              As the Software Engineer contracted by ESQ1 Tech, my mandate was to design and deploy the e-commerce architecture capable of supporting this vast, tiered inventory. I built a multi-vendor platform that not only managed complex catalog hierarchies (Subject, Age Range, Learning Stage) but also handled robust financial processing and real-time physical logistics.
            </p>
          </div>
        </div>

        {/* Data Architecture & Progression System */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Curriculum Data Architecture</h2>
            <p className="text-my-primary mt-2 font-medium">Structuring a growing educational library</p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-gray-400 leading-relaxed mb-8">
              The platform required a complex relational schema to support an "Age Roadmap" progression system. Products needed to be intricately linked across 5 developmental stages, allowing parents to seamlessly navigate from Foundation (Ages 6-8) through to Pre-exam Readiness (Ages 14-16).
            </p>
            <div className="flex flex-col gap-3">
              {[
                { title: "Dynamic Multi-Variant Inventory", desc: "Engineered a PostgreSQL schema supporting complex multi-variant SKUs, allowing a single educational pack to be seamlessly sold as either a dynamically generated digital download (PDF) or a physical product requiring physical fulfillment." },
                { title: "Hierarchical Search & Filtering", desc: "Implemented performant backend filtering that queried product taxonomies across multiple dimensions: by Age (6-8, 10-12), by Subject (English, Maths, Science), and by Developmental Stage, ensuring fast, accurate catalog browsing." },
                { title: "Multi-Vendor Capability", desc: "Built multi-tenant data structures with strict row-level security and RBAC, laying the groundwork for different educational creators and vendors to list and manage their own curriculum packs on the platform." }
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

        {/* E-Commerce Operations */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Payments & Logistics</h2>
            <p className="text-my-primary mt-2 font-medium">Aggregating global APIs for seamless checkout</p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-gray-400 leading-relaxed mb-8">
              A major engineering focus was connecting the storefront to both financial and physical logistics networks. The system needed to confidently authorize payments across different geographic regions and instantly compute shipping rates for physical flashcards via major global couriers.
            </p>
            
            <div className="flex flex-col gap-3">
              {[
                { title: "Idempotent Financial Processing", desc: "Integrated Stripe and Paystack for PCI-DSS compliant checkouts. Built robust, idempotent webhook listeners that handled asynchronous payment intents, preventing duplicate orders during network latency and managing automated refunds." },
                { title: "Global Logistics Aggregation", desc: "Connected the Node.js backend to EasyPost, ShipEngine, Shippo, and EasyShip APIs. The system dynamically aggregates real-time shipping rate calculations during checkout based on cart volume/weight and customer geo-location." },
                { title: "Automated Order Fulfillment", desc: "Built workflows that instantly release secure download links for digital products upon payment confirmation, while simultaneously triggering automated shipping label generation and courier dispatch API calls for physical goods." },
                { title: "Platform Security & Integrity", desc: "Secured the entire API layer using strict JWT-based authentication, RBAC authorization, aggressive rate limiting, and robust input sanitization to protect user data and financial pipelines." }
              ].map((integration, idx) => (
                <div key={idx} className="border border-gray-800 rounded-xl overflow-hidden bg-[#15121b]">
                  <button 
                    onClick={() => setActiveIntegration(activeIntegration === idx ? null : idx)}
                    className={`w-full flex justify-between items-center px-6 py-4 font-semibold text-sm transition-colors text-left ${activeIntegration === idx ? 'bg-[#8b31ff] text-white' : 'text-gray-300 hover:bg-[#1a1721]'}`}
                  >
                    <span>{integration.title}</span>
                    <svg className={`w-5 h-5 transition-transform ${activeIntegration === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {activeIntegration === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 py-5 text-gray-400 text-sm leading-relaxed bg-[#110e16]">
                          {integration.desc}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-t border-gray-800 pt-32 pb-32">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold">Tech Stack</h2>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
                { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
                { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
                { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
                { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
                { name: 'Stripe', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg', invert: true },
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
