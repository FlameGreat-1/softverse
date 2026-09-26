"use client";

import Image from "next/image";
import ScrollReveal from "@/components/scroll-reveal";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Facebook, Linkedin, Twitter, Globe, Info } from "lucide-react";

// Types
type Experience = {
  id: string;
  companyName: string;
  logo: string;
  role: string;
  dateRange: string;
  duration: string;
  location: string;
  website: string;
  socials: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    pinterest?: string;
  };
  details: string[];
  hideNameText?: boolean;
  logoType?: "square" | "wide";
  logoClassName?: string;
  imageClassName?: string;
};

const experienceData: Experience[] = [
  {
    id: "jtnc",
    companyName: "JTNC GROUP",
    logo: "/images/Jtnc-logo.png",
    role: "Backend Engineer",
    dateRange: "February 2019 — March 2022",
    duration: "3 Years 1 Month",
    location: "U.S.A | Full-time (Remote)",
    website: "https://qfaa.jtncgroup.com",
    hideNameText: true,
    logoType: "wide",
    logoClassName: "w-24 h-8 sm:w-32 sm:h-10",
    imageClassName: "scale-[1.5] sm:scale-[1.8] origin-left",
    socials: {},
    details: [
      "Rebuilt and maintained core trading infrastructure in Python, migrating from a monolithic architecture to a scalable microservice-based system deployed on Oracle Cloud, supporting platform operations across $1B+ AUM; engineered and maintained the QuantumFlow algorithmic trading engine optimising low-latency order routing, signal processing, and real-time broker integration across multiple asset classes",
      "Designed a client-facing portal and control center for managing algorithmic trading signals, investor accounts, and broker order routing — supporting multi-client portfolio management at scale",
      "Implemented end-to-end security and compliance infrastructure including AES encryption, TLS/SSL, JWT, and RBAC with KYC/AML checks and SEC-aligned audit trails; built real-time trade monitoring dashboards, alerting pipelines, and immutable audit logging ensuring full operational visibility and regulatory traceability",
      "Established a mirrored staging environment with CI/CD automation for zero-downtime deployments and regression testing across all platform services. Stack: Python, Oracle Cloud, PostgreSQL, REST APIs, microservices, CI/CD, AES encryption, JWT, RBAC"
    ]
  },
  {
    id: "autonoms",
    companyName: "Autonoms AI",
    logo: "/images/Autonomous-Logo-14.svg",
    role: "Fullstack Engineer",
    dateRange: "May 2022 — January 2024",
    duration: "1 Year 8 Months",
    location: "U.S.A | Full-time (Remote)",
    website: "https://autonoms.ai",
    hideNameText: true,
    logoType: "wide",
    socials: {
      linkedin: "https://www.linkedin.com/company/autonoms-ai/"
    },
    details: [
      "Contributed to the architecture and development of an AI workforce platform (React, Next.js, TypeScript) coordinating specialist outbound agents — research, enrichment, outreach, qualification, scheduling, and CRM hygiene — deployed across 147 enterprise clients",
      "Engineered and maintained the agent deployment pipeline (Node.js, PostgreSQL) powering the custom multi-agent orchestration layer, integrating with email, LinkedIn, calendar/booking, and CRM APIs to support automated omni-channel outbound workflows",
      "Built the marketplace storefront and seller/buyer portal with SSR via Next.js for SEO and sub-200ms page performance, supporting discovery and deployment of 120+ live AI agents with human-in-the-loop oversight; delivered on AWS with CI/CD automation, private cloud deployment, and isolated per-client infrastructure ensuring data sovereignty and 24/7 agent execution"
    ]
  },
  {
    id: "cosmicforge",
    companyName: "CosmicForge Healthnet Limited",
    logo: "/images/cosmicforge-logo.svg",
    role: "Full Stack Developer",
    dateRange: "March 2024 — February 2025",
    duration: "11 Months",
    location: "Nigeria | Full-time (Hybrid)",
    website: "https://www.cosmicforge-healthnet.com",
    hideNameText: true,
    logoType: "wide",
    socials: {
      twitter: "https://x.com/cf_healthnet?s=21"
    },
    details: [
      "Led a team of 4 engineers to Architect and deliver a full-stack telemedicine and patient management platform (React, Next.js, FastAPI, PostgreSQL) supporting health records, appointment scheduling, lab orders, prescriptions, pharmacy, AI-assisted diagnosis, real-time chat, and integrated wallet/billing — onboarding 171 patients and 37 verified doctors across multiple specialties",
      "Fine-tuned LLaMA 3 (70B) on PubMed and MIMIC-III clinical datasets using QLoRA and PEFT, deployed on RunPod with 4-bit quantization for memory-efficient inference achieving sub-200ms inference latency; integrated VAPI and Whisper for AI voice-based patient communication, reducing average consultation response time by 40%",
      "Engineered secure RESTful APIs and WebSocket-based real-time services with JWT, RBAC, AES-256, and HIPAA-compliant PHI handling; integrated Paystack with webhook signature verification, idempotency controls, ACID-compliant transactions, and automated reconciliation; deployed on Azure with Docker, CI/CD, auto-scaling, 99% uptime, and sub-130ms API response times"
    ]
  },
  {
    id: "razpaas",
    companyName: "Razpaas",
    logo: "/images/Raspaas-logo.png",
    role: "Software Developer",
    dateRange: "February 2025 — December 2025",
    duration: "10 Months",
    location: "Sri Lanka | Contract (Remote)",
    website: "https://razpaas.lk/",
    socials: {
      facebook: "https://www.facebook.com/Razpaas.lk",
      pinterest: "https://www.pinterest.com/razpaash/"
    },
    details: [
      "Built and deployed 2 enterprise-grade systems: engineered InvoTex OCR (Document AI, Google Cloud Vision, LlamaLayoutMv5, Django, FastAPI, React.js, PostgreSQL) achieving 97% extraction accuracy processing 1,000+ invoices up to 1GB in under 5 minutes; and a multi-tenant HR system with ZKTeco face recognition devices delivering sub-1s real-time attendance logging",
      "Architected RAZPAAS HR system with Django, Celery, Docker, and PostgreSQL integrating REALAND biometric devices for automated multi-tenant attendance tracking; implemented JWT authentication, RBAC, multi-level approval workflows, and automated payroll with compliance tracking"
    ]
  },
  {
    id: "esq1",
    companyName: "ESQ1 Tech",
    logo: "/images/esq1-logo.jpeg",
    role: "Software Engineer",
    dateRange: "February 2026 — August 2026",
    duration: "6 Months",
    location: "Nigeria | Contract",
    website: "https://www.esq1techhub.com/",
    socials: {
      linkedin: "https://www.linkedin.com/company/esq1-tech-hub",
      twitter: "https://x.com/Esq1_tech_hub"
    },
    details: [
      "Designed and rebuilt Instapay (PHP Laravel, PostgreSQL, TypeScript), a fintech platform supporting utility bill payments, airtime/data top-ups, and peer-to-peer transfers; integrated Flutterwave with webhook signature verification, idempotency controls, ACID-compliant transactions, automated reconciliation, B2B identity verification, KYC/AML compliance, and real-time fraud detection",
      "Architected a Marketplace Escrow system within Instapay with automated fund holding, conditional release workflows, dispute resolution logic, double-entry bookkeeping, and AES-256 encryption — ensuring trustless, auditable transactions at scale",
      "Built and deployed Inflexa Technologies (Node.js, TypeScript, PostgreSQL, Docker), a multi-vendor e-commerce platform for physical and digital flashcard packs; integrated Stripe and Paystack with PCI-DSS-compliant checkout, idempotent payment flows, and webhook event handling; connected EasyPost, ShipEngine, Shippo, and EasyShip for real-time shipping rate calculation, label generation, and automated order fulfilment; enforced RBAC, JWT, rate limiting, and input sanitization across both platforms"
    ]
  },
  {
    id: "exoper",
    companyName: "Exoper",
    logo: "/images/exoper-logo.svg",
    role: "Founder & Lead Engineer",
    dateRange: "September 2025 — Present",
    duration: "1 Year",
    location: "Nigeria | Full-time",
    website: "https://app.exoper.com",
    socials: {
      facebook: "https://www.facebook.com/exoperhq",
      linkedin: "https://www.linkedin.com/company/exoper"
    },
    details: [
      "Founded and led a team of 3 engineers in end-to-end architecture and development of Exoper, a non-custodial AI-powered trading technology platform supporting forex, metals, crypto, and stocks — serving 163 active traders with 300K+ trades executed, 60%+ signal accuracy, and 97% platform uptime",
      "Engineered a multi-LLM analysis engine (OpenAI, Gemini, Claude) with RAG pipelines and TradingEconomics API integration, performing full top-down technical analysis across 13 timeframes and macroeconomic analysis across all macro indicators — completing end-to-end analysis and order routing to broker in 50–70 seconds with millisecond execution latency",
      "Architected a MetaTrader terminal provisioning system on Linux VPS using Wine, Xvfb, and Kubectl for headless broker connectivity across all brokers and prop firms; built MQL5 Expert Advisors for automated trade execution, management, and closure with real-time WebSocket streaming and monitoring",
      "Implemented microservices architecture (Go, Rust, FastAPI, TypeScript) with Kubernetes multi-region deployment, Helm, Envoy proxy, and edge ingress; integrated MetaAPI, Paddle, and NowPayments; enforced AES-256 encryption, JWT, RBAC, immutable audit logging, real-time threat detection, and compliance with GDPR, MiFID II, EU AI Act, and ISO 27001"
    ]
  }
];

const ExperienceModal = ({ exp, onClose }: { exp: Experience; onClose: () => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = scrollRef.current;
        setShowScrollArrow(scrollHeight > clientHeight && scrollTop < 20);
      }
    };

    const timer = setTimeout(checkScroll, 100);
    window.addEventListener('resize', checkScroll);

    return () => {
      document.body.style.overflow = 'unset';
      clearTimeout(timer);
      window.removeEventListener('resize', checkScroll);
    };
  }, [exp]);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowScrollArrow(scrollRef.current.scrollHeight > scrollRef.current.clientHeight && scrollRef.current.scrollTop < 20);
    }
  };

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center pt-16 pb-2 px-2 sm:px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-[#111] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-full"
      >
        {/* Header styling like macOS */}
        <div className="bg-[#1a1a1a] px-4 py-3 border-b border-gray-800 flex items-center justify-end gap-2 shrink-0">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 min-h-0 px-4 py-6 sm:p-6 md:p-8 overflow-y-auto lg:[&::-webkit-scrollbar]:hidden lg:[-ms-overflow-style:none] lg:[scrollbar-width:none]"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className={`relative ${exp.logoClassName || (exp.logoType === 'wide' ? 'w-32 h-12 sm:w-48 sm:h-16' : 'w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1a1a1a] border border-gray-800')} flex items-center justify-center overflow-hidden shrink-0`}>
              <Image
                src={exp.logo}
                alt={exp.companyName}
                fill
                className={`object-contain ${exp.logoType === 'wide' ? 'object-left' : 'p-2'} ${exp.imageClassName || ''}`}
              />
            </div>
            <div>
              {!exp.hideNameText && (
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">{exp.companyName}</h2>
              )}
              <p className="text-gray-400 font-medium">{exp.role}</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {exp.details.map((detail, idx) => (
              <p key={idx} className="text-gray-300 text-sm leading-relaxed">
                {detail}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 w-full mt-4">
            <Link
              href={exp.website}
              target="_blank"
              className="flex items-center gap-2 bg-my-primary hover:bg-[#a65abf] text-white px-4 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-[0_0_15px_#C778DD44] whitespace-nowrap shrink-0"
            >
              <Globe className="w-4 h-4" />
              Visit Website
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              {exp.socials.linkedin && (
                <Link href={exp.socials.linkedin} target="_blank" className="w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#222] border border-gray-800 flex items-center justify-center transition-transform hover:scale-110">
                  <img src="https://api.iconify.design/logos:linkedin-icon.svg" alt="LinkedIn" className="w-5 h-5" />
                </Link>
              )}
              {exp.socials.twitter && (
                <Link href={exp.socials.twitter} target="_blank" className="w-10 h-10 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-transform hover:scale-110">
                  <img src="https://api.iconify.design/simple-icons:x.svg" alt="X (Twitter)" className="w-5 h-5" />
                </Link>
              )}
              {exp.socials.facebook && (
                <Link href={exp.socials.facebook} target="_blank" className="w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#222] border border-gray-800 flex items-center justify-center transition-transform hover:scale-110">
                  <img src="https://api.iconify.design/logos:facebook.svg" alt="Facebook" className="w-5 h-5" />
                </Link>
              )}
              {exp.socials.pinterest && (
                <Link href={exp.socials.pinterest} target="_blank" className="w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#222] border border-gray-800 flex items-center justify-center transition-transform hover:scale-110">
                  <img src="https://api.iconify.design/logos:pinterest.svg" alt="Pinterest" className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Arrow Overlay */}
        <AnimatePresence>
          {showScrollArrow && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={scrollDown}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer z-10 flex flex-col items-center animate-bounce"
            >
              <div className="w-10 h-10 rounded-full bg-my-primary/20 border border-my-primary/50 flex items-center justify-center shadow-[0_0_15px_#C778DD] backdrop-blur-sm">
                <svg className="w-5 h-5 text-my-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const ExperienceSection = ({ exp, index, onSelect }: { exp: Experience; index: number; onSelect: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative pl-4 sm:pl-10 lg:pl-20 pb-16"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <ScrollReveal
          size="md"
          align="left"
          enableBlur={true}
          baseOpacity={0.2}
          staggerDelay={0.03}
          containerClassName="mb-1"
          textClassName="text-2xl font-bold text-white tracking-wide"
        >
          {exp.role}
        </ScrollReveal>
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm font-medium text-my-primary bg-my-primary/10 px-3 py-1 rounded-full border border-my-primary/20">
            {exp.dateRange}
          </span>
          <span className="text-xs text-gray-500 mr-2">{exp.duration}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className={`relative ${exp.logoClassName || (exp.logoType === 'wide' ? 'w-24 h-8 sm:w-32 sm:h-10' : 'w-10 h-10 rounded-full bg-[#111] border border-gray-800 shadow-sm')} flex items-center justify-start overflow-hidden shrink-0`}>
            <Image
              src={exp.logo}
              alt={exp.companyName}
              fill
              className={`object-contain ${exp.logoType === 'wide' ? 'object-left' : 'p-1'} ${exp.imageClassName || ''}`}
            />
          </div>
          {!exp.hideNameText && (
            <h3 className="text-lg font-medium text-my-primary">
              <a href={exp.website} target="_blank">{exp.companyName}</a>
            </h3>
          )}
          <motion.button
            onClick={onSelect}
            onMouseEnter={onSelect}
            whileHover="hover"
            whileTap="tap"
            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors shrink-0 group cursor-pointer"
            title="View Details"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" className="stroke-my-primary transition-colors" />
              <motion.g
                variants={{
                  hover: { y: [0, -5, 0], transition: { duration: 0.4, ease: "easeOut" } },
                  tap: { scale: 0.8 }
                }}
                className="stroke-white"
              >
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </motion.g>
            </svg>
          </motion.button>
        </div>

        <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-600"></div>
        <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
          {exp.location}
        </p>
      </div>
    </motion.div>
  );
};

const ExperiencePage = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  // Calculate ball position based on scroll - moves from 0% to 100% of timeline height
  const ballY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="relative space-y-16 my-40 px-3 sm:px-12 lg:px-32 scroll-mt-10 md:scroll-mt-32"
    >
      <h2 className="font-semibold text-[24px] lg:text-[32px] flex items-center mb-20">
        <span className="text-my-primary">#</span>experience{" "}
        <span className="ml-6">
          <Image
            src="/assets/line.png"
            alt="line"
            width={22}
            height={1}
            className="w-40 h-[0.5px]"
          />
        </span>
      </h2>

      <div ref={timelineRef} className="relative md:pl-[73px] md:pr-4 lg:pr-[73px]">
        {/* Vertical line */}
        <div className="absolute left-0 sm:left-4 lg:left-24 top-0 bottom-0 w-[2px] bg-white/10 rounded-full"></div>

        {/* Single Animated Circle Marker - moves with scroll */}
        <motion.div
          className="absolute left-[-5px] sm:left-[11px] lg:left-[91px] w-3 h-3 bg-my-primary rounded-full shadow-[0_0_10px_#c779dd] z-10"
          style={{
            top: ballY
          }}
        />

        {/* First 3 Experiences */}
        {experienceData.slice(0, 3).map((exp, index) => (
          <ExperienceSection
            key={exp.id}
            exp={exp}
            index={index}
            onSelect={() => setSelectedExp(exp)}
          />
        ))}

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* Remaining Experiences */}
              {experienceData.slice(3).map((exp, index) => (
                <ExperienceSection
                  key={exp.id}
                  exp={exp}
                  index={index + 3}
                  onSelect={() => setSelectedExp(exp)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!showAll && (
          <div className="flex justify-center mt-8 pb-12 relative z-20">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 rounded-full border border-my-primary/50 text-my-primary font-semibold hover:bg-my-primary/10 transition-all duration-300 shadow-[0_0_15px_rgba(199,121,221,0.3)] hover:shadow-[0_0_25px_rgba(199,121,221,0.6)] flex items-center gap-2 group"
            >
              <span>View Full Experience</span>
              <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedExp && (
          <ExperienceModal
            exp={selectedExp}
            onClose={() => setSelectedExp(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperiencePage;