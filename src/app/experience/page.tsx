"use client";

import Image from "next/image";
import ScrollReveal from "@/components/scroll-reveal";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const ExperienceItem = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="text-gray-300 leading-relaxed text-[15px]"
    >
      {children}
    </motion.li>
  );
};

const ExperienceSection = ({ children, index }: { children: React.ReactNode; index: number }) => {
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
      {children}
    </motion.div>
  );
};

const experiencePage = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  
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

      <div ref={timelineRef} className="relative md:px-[73px]">
        {/* Vertical line */}
        <div className="absolute left-0 sm:left-4 lg:left-24 top-0 bottom-0 w-[2px] bg-white/10 rounded-full"></div>

        {/* Single Animated Circle Marker - moves with scroll */}
        <motion.div 
          className="absolute left-[-5px] sm:left-[11px] lg:left-[91px] w-3 h-3 bg-my-primary rounded-full shadow-[0_0_10px_#c779dd] z-10"
          style={{ 
            top: ballY
          }}
        />

        {/* Experience 1 - JTNC GROUP */}
        <ExperienceSection index={0}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <ScrollReveal
              size="md"
              align="left"
              enableBlur={true}
              baseOpacity={0.2}
              staggerDelay={0.03}
              containerClassName="mb-1"
              textClassName="text-2xl font-bold text-white tracking-wide"
            >
              Backend Engineer
            </ScrollReveal>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-my-primary bg-my-primary/10 px-3 py-1 rounded-full border border-my-primary/20">
                February 2019 — March 2022
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
            <h3 className="text-lg font-medium text-my-primary">
              <a href="https://qfaa.jtncgroup.com" target="_blank">
                JTNC GROUP
              </a>
            </h3>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
              U.S.A <span className="text-gray-600">|</span> Full-time (Remote)
            </p>
          </div>

          <ul className="mt-4 max-w-4xl space-y-2 list-disc list-inside">
            <ExperienceItem delay={0.1}>
              Rebuilt and maintained core trading infrastructure in Python, migrating from a monolithic architecture to a scalable microservice-based system deployed on Oracle Cloud, supporting platform operations across $1B+ AUM; engineered and maintained the QuantumFlow algorithmic trading engine optimising low-latency order routing, signal processing, and real-time broker integration across multiple asset classes
            </ExperienceItem>
            <ExperienceItem delay={0.2}>
              Designed a client-facing portal and control center for managing algorithmic trading signals, investor accounts, and broker order routing — supporting multi-client portfolio management at scale
            </ExperienceItem>
            <ExperienceItem delay={0.3}>
              Implemented end-to-end security and compliance infrastructure including AES encryption, TLS/SSL, JWT, and RBAC with KYC/AML checks and SEC-aligned audit trails; built real-time trade monitoring dashboards, alerting pipelines, and immutable audit logging ensuring full operational visibility and regulatory traceability
            </ExperienceItem>
            <ExperienceItem delay={0.4}>
              Established a mirrored staging environment with CI/CD automation for zero-downtime deployments and regression testing across all platform services. Stack: Python, Oracle Cloud, PostgreSQL, REST APIs, microservices, CI/CD, AES encryption, JWT, RBAC
            </ExperienceItem>
          </ul>
        </ExperienceSection>

        {/* Experience 2 - Autonoms AI */}
        <ExperienceSection index={1}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <ScrollReveal
              size="md"
              align="left"
              enableBlur={true}
              baseOpacity={0.2}
              staggerDelay={0.03}
              containerClassName="mb-1"
              textClassName="text-2xl font-bold text-white tracking-wide"
            >
              Fullstack Engineer
            </ScrollReveal>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-my-primary bg-my-primary/10 px-3 py-1 rounded-full border border-my-primary/20">
                May 2022 — January 2024
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
            <h3 className="text-lg font-medium text-my-primary">
              <a href="https://autonoms.ai" target="_blank">
                Autonoms AI
              </a>
            </h3>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
              U.S.A <span className="text-gray-600">|</span> Full-time (Remote)
            </p>
          </div>

          <ul className="mt-4 max-w-4xl space-y-2 list-disc list-inside">
            <ExperienceItem delay={0.1}>
              Contributed to the architecture and development of an AI workforce platform (React, Next.js, TypeScript) coordinating specialist outbound agents — research, enrichment, outreach, qualification, scheduling, and CRM hygiene — deployed across 147 enterprise clients
            </ExperienceItem>
            <ExperienceItem delay={0.2}>
              Engineered and maintained the agent deployment pipeline (Node.js, PostgreSQL) powering the custom multi-agent orchestration layer, integrating with email, LinkedIn, calendar/booking, and CRM APIs to support automated omni-channel outbound workflows
            </ExperienceItem>
            <ExperienceItem delay={0.3}>
              Built the marketplace storefront and seller/buyer portal with SSR via Next.js for SEO and sub-200ms page performance, supporting discovery and deployment of 120+ live AI agents with human-in-the-loop oversight; delivered on AWS with CI/CD automation, private cloud deployment, and isolated per-client infrastructure ensuring data sovereignty and 24/7 agent execution
            </ExperienceItem>
          </ul>
        </ExperienceSection>

        {/* Experience 3 - CosmicForge Healthnet Limited */}
        <ExperienceSection index={2}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <ScrollReveal
              size="md"
              align="left"
              enableBlur={true}
              baseOpacity={0.2}
              staggerDelay={0.03}
              containerClassName="mb-1"
              textClassName="text-2xl font-bold text-white tracking-wide"
            >
              Full Stack Developer
            </ScrollReveal>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-my-primary bg-my-primary/10 px-3 py-1 rounded-full border border-my-primary/20">
                March 2024 — February 2025
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
            <h3 className="text-lg font-medium text-my-primary">
              <a href="https://www.cosmicforge-healthnet.com" target="_blank">
                CosmicForge Healthnet Limited
              </a>
            </h3>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
              Nigeria <span className="text-gray-600">|</span> Full-time (Hybrid)
            </p>
          </div>

          <ul className="mt-4 max-w-4xl space-y-2 list-disc list-inside">
            <ExperienceItem delay={0.1}>
              Led a team of 4 engineers to Architect and deliver a full-stack telemedicine and patient management platform (React, Next.js, FastAPI, PostgreSQL) supporting health records, appointment scheduling, lab orders, prescriptions, pharmacy, AI-assisted diagnosis, real-time chat, and integrated wallet/billing — onboarding 71 patients and 13 verified doctors across multiple specialties
            </ExperienceItem>
            <ExperienceItem delay={0.2}>
              Fine-tuned LLaMA 3 (70B) on PubMed and MIMIC-III clinical datasets using QLoRA and PEFT, deployed on RunPod with 4-bit quantization for memory-efficient inference achieving sub-200ms inference latency; integrated VAPI and Whisper for AI voice-based patient communication, reducing average consultation response time by 40%
            </ExperienceItem>
            <ExperienceItem delay={0.3}>
              Engineered secure RESTful APIs and WebSocket-based real-time services with JWT, RBAC, AES-256, and HIPAA-compliant PHI handling; integrated Paystack with webhook signature verification, idempotency controls, ACID-compliant transactions, and automated reconciliation; deployed on Azure with Docker, CI/CD, auto-scaling, 99% uptime, and sub-130ms API response times
            </ExperienceItem>
          </ul>
        </ExperienceSection>

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* Experience 4 - Raspaas */}
              <ExperienceSection index={3}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <ScrollReveal
              size="md"
              align="left"
              enableBlur={true}
              baseOpacity={0.2}
              staggerDelay={0.03}
              containerClassName="mb-1"
              textClassName="text-2xl font-bold text-white tracking-wide"
            >
              Software Developer
            </ScrollReveal>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-my-primary bg-my-primary/10 px-3 py-1 rounded-full border border-my-primary/20">
                February 2025 — December 2025
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
            <h3 className="text-lg font-medium text-my-primary">
              <a href="https://raspaas.up.railway.app" target="_blank">
                Raspaas
              </a>
            </h3>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
              Sri Lanka <span className="text-gray-600">|</span> Contract (Remote)
            </p>
          </div>

          <ul className="mt-4 max-w-4xl space-y-2 list-disc list-inside">
            <ExperienceItem delay={0.1}>
              Built and deployed 2 enterprise-grade systems: engineered InvoTex OCR (Document AI, Google Cloud Vision, LlamaLayoutMv5, Django, FastAPI, React.js, PostgreSQL) achieving 97% extraction accuracy processing 1,000+ invoices up to 1GB in under 5 minutes; and a multi-tenant HR system with ZKTeco face recognition devices delivering sub-1s real-time attendance logging
            </ExperienceItem>
            <ExperienceItem delay={0.2}>
              Architected RASPAAS HR system with Django, Celery, Docker, and PostgreSQL integrating REALAND biometric devices for automated multi-tenant attendance tracking; implemented JWT authentication, RBAC, multi-level approval workflows, and automated payroll with compliance tracking
            </ExperienceItem>
          </ul>
        </ExperienceSection>

        {/* Experience 5 - ESQ1 Tech */}
        <ExperienceSection index={4}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <ScrollReveal
              size="md"
              align="left"
              enableBlur={true}
              baseOpacity={0.2}
              staggerDelay={0.03}
              containerClassName="mb-1"
              textClassName="text-2xl font-bold text-white tracking-wide"
            >
              Software Engineer
            </ScrollReveal>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-my-primary bg-my-primary/10 px-3 py-1 rounded-full border border-my-primary/20">
                February 2026 — August 2026
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
            <h3 className="text-lg font-medium text-my-primary">
              <a href="https://esq1tech.com" target="_blank">
                ESQ1 Tech
              </a>
            </h3>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
              Nigeria <span className="text-gray-600">|</span> Contract
            </p>
          </div>

          <ul className="mt-4 max-w-4xl space-y-2 list-disc list-inside">
            <ExperienceItem delay={0.1}>
              Designed and rebuilt <a href="https://instapay9ja.ng" target="_blank" className="underline text-my-primary hover:text-white transition-colors">Instapay</a> (PHP Laravel, PostgreSQL, TypeScript), a fintech platform supporting utility bill payments, airtime/data top-ups, and peer-to-peer transfers; integrated Flutterwave with webhook signature verification, idempotency controls, ACID-compliant transactions, automated reconciliation, B2B identity verification, KYC/AML compliance, and real-time fraud detection
            </ExperienceItem>
            <ExperienceItem delay={0.2}>
              Architected a Marketplace Escrow system within Instapay with automated fund holding, conditional release workflows, dispute resolution logic, double-entry bookkeeping, and AES-256 encryption — ensuring trustless, auditable transactions at scale
            </ExperienceItem>
            <ExperienceItem delay={0.3}>
              Built and deployed <a href="https://inflexatechnologies.com" target="_blank" className="underline text-my-primary hover:text-white transition-colors">Inflexa Technologies</a> (Node.js, TypeScript, PostgreSQL, Docker), a multi-vendor e-commerce platform for physical and digital flashcard packs; integrated Stripe and Paystack with PCI-DSS-compliant checkout, idempotent payment flows, and webhook event handling; connected EasyPost, ShipEngine, Shippo, and EasyShip for real-time shipping rate calculation, label generation, and automated order fulfilment; enforced RBAC, JWT, rate limiting, and input sanitization across both platforms
            </ExperienceItem>
          </ul>
        </ExperienceSection>

        {/* Experience 6 - Exoper */}
        <ExperienceSection index={5}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <ScrollReveal
              size="md"
              align="left"
              enableBlur={true}
              baseOpacity={0.2}
              staggerDelay={0.03}
              containerClassName="mb-1"
              textClassName="text-2xl font-bold text-white tracking-wide"
            >
              Founder & Lead Engineer
            </ScrollReveal>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-my-primary bg-my-primary/10 px-3 py-1 rounded-full border border-my-primary/20">
                September 2025 — Present
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
            <h3 className="text-lg font-medium text-my-primary">
              <a href="https://app.exoper.com" target="_blank">
                Exoper
              </a>
            </h3>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
              Nigeria <span className="text-gray-600">|</span> Full-time
            </p>
          </div>

          <ul className="mt-4 max-w-4xl space-y-2 list-disc list-inside">
            <ExperienceItem delay={0.1}>
              Founded and led a team of 3 engineers in end-to-end architecture and development of Exoper, a non-custodial AI-powered trading technology platform supporting forex, metals, crypto, and stocks — serving 163 active traders with 300K+ trades executed, 60%+ signal accuracy, and 97% platform uptime
            </ExperienceItem>
            <ExperienceItem delay={0.2}>
              Engineered a multi-LLM analysis engine (OpenAI, Gemini, Claude) with RAG pipelines and TradingEconomics API integration, performing full top-down technical analysis across 13 timeframes and macroeconomic analysis across all macro indicators — completing end-to-end analysis and order routing to broker in 50–70 seconds with millisecond execution latency
            </ExperienceItem>
            <ExperienceItem delay={0.3}>
              Architected a MetaTrader terminal provisioning system on Linux VPS using Wine, Xvfb, and Kubectl for headless broker connectivity across all brokers and prop firms; built MQL5 Expert Advisors for automated trade execution, management, and closure with real-time WebSocket streaming and monitoring
            </ExperienceItem>
            <ExperienceItem delay={0.4}>
              Implemented microservices architecture (Go, Rust, FastAPI, TypeScript) with Kubernetes multi-region deployment, Helm, Envoy proxy, and edge ingress; integrated MetaAPI, Paddle, and NowPayments; enforced AES-256 encryption, JWT, RBAC, immutable audit logging, real-time threat detection, and compliance with GDPR, MiFID II, EU AI Act, and ISO 27001
            </ExperienceItem>
          </ul>
        </ExperienceSection>
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
    </section>
  );
};

export default experiencePage;