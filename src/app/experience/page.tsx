"use client";

import Image from "next/image";
import ScrollReveal from "@/components/scroll-reveal";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
      className="relative pl-12 sm:pl-20 pb-16"
    >
      {children}
    </motion.div>
  );
};

const experiencePage = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  // Calculate ball position based on scroll - moves from 0% to 100% of timeline height
  const ballY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="relative space-y-16 my-40 px-6 lg:px-28 scroll-mt-10 md:scroll-mt-32"
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

      <div ref={timelineRef} className="relative md:px-[73px] overflow-hidden">
        {/* Vertical line */}
        <div className="absolute left-4 sm:left-24 top-0 bottom-0 w-[2px] bg-white/10 rounded-full"></div>

        {/* Single Animated Circle Marker - moves with scroll */}
        <motion.div 
          className="absolute left-[11px] sm:left-[91px] w-3 h-3 bg-my-primary rounded-full shadow-[0_0_10px_#c779dd] z-10"
          style={{ 
            top: ballY
          }}
        />

        {/* Experience 1 - JTNC GROUP */}
        <ExperienceSection index={0}>
          <p className="text-sm font-semibold text-gray-300 mb-2">2022 — 2024</p>

          <ScrollReveal
            size="md"
            align="left"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.03}
            containerClassName="mb-1"
            textClassName="text-xl font-semibold text-white"
          >
            Backend Engineer
          </ScrollReveal>

          <p className="text-my-primary font-medium mt-1">
            <a href="https://qfaa.jtncgroup.com" target="_blank">
              JTNC GROUP
            </a>
          </p>

          <p className="text-gray-400 text-sm mt-1">
            November 2022 — October 2024 · 2 years
          </p>
          <p className="text-gray-400 text-sm">
            U.S.A · Full-time (Remote)
          </p>

          <ul className="mt-4 max-w-2xl space-y-2 list-disc list-inside">
            <ExperienceItem delay={0.1}>
              Designed and Rebuilt backend trading infrastructure in Python, replacing the existing React/Tailwind architecture with a microservice-based system deployed on Oracle Cloud
            </ExperienceItem>
            <ExperienceItem delay={0.2}>
              Designed a client-facing portal and control center for managing algorithmic trading signals and broker order routing on behalf of clients
            </ExperienceItem>
            <ExperienceItem delay={0.3}>
              Built a secondary server to replicate the production environment alongside a dedicated testing and staging pipeline with CI/CD automation
            </ExperienceItem>
            <ExperienceItem delay={0.4}>
              Stack: Python, Oracle Cloud, CI/CD pipelines, microservices architecture
            </ExperienceItem>
          </ul>
        </ExperienceSection>

        {/* Experience 2 - Autonoms AI */}
        <ExperienceSection index={1}>
          <p className="text-sm font-semibold text-gray-300 mb-2">2022 — 2023</p>

          <ScrollReveal
            size="md"
            align="left"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.03}
            containerClassName="mb-1"
            textClassName="text-xl font-semibold text-white"
          >
            Fullstack Engineer
          </ScrollReveal>

          <p className="text-my-primary font-medium mt-1">
            <a href="https://autonoms.ai" target="_blank">
              Autonoms AI
            </a>
          </p>

          <p className="text-gray-400 text-sm mt-1">
            November 2022 — April 2023 · 6 months
          </p>
          <p className="text-gray-400 text-sm">
            Remote · Full-time
          </p>

          <ul className="mt-4 max-w-2xl space-y-2 list-disc list-inside">
            <ExperienceItem delay={0.1}>
              Contributed to the development of an AI agent marketplace platform enabling businesses and enterprises to browse, purchase, and deploy pre-built AI agents
            </ExperienceItem>
            <ExperienceItem delay={0.2}>
              Built and maintained the agent deployment pipeline, supporting seamless developer integrations and automated deployment workflows for enterprise clients
            </ExperienceItem>
            <ExperienceItem delay={0.3}>
              Contributed to frontend development of the marketplace storefront and seller/buyer portal, supporting agent listings, discovery, and transactions
            </ExperienceItem>
            <ExperienceItem delay={0.4}>
              Delivered using React, Next.js, TypeScript, and PostgreSQL, deployed on AWS with CI/CD automation
            </ExperienceItem>
          </ul>
        </ExperienceSection>

        {/* Experience 3 - Sidesone */}
        <ExperienceSection index={2}>
          <p className="text-sm font-semibold text-gray-300 mb-2">2024</p>

          <ScrollReveal
            size="md"
            align="left"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.03}
            containerClassName="mb-1"
            textClassName="text-xl font-semibold text-white"
          >
            Fullstack Engineer
          </ScrollReveal>

          <p className="text-my-primary font-medium mt-1">
            <a href="https://sidesone.no" target="_blank">
              Sidesone
            </a>
          </p>

          <p className="text-gray-400 text-sm mt-1">
            October 2024 · Contract
          </p>
          <p className="text-gray-400 text-sm">
            Norway · Remote
          </p>

          <ul className="mt-4 max-w-2xl space-y-2 list-disc list-inside">
            <ExperienceItem delay={0.1}>
              Recovered locked production server using chroot environment, restoring full codebases, databases (3,200+ records), SSL certificates, and n8n automation workflows with zero data loss
            </ExperienceItem>
            <ExperienceItem delay={0.2}>
              Rebuilt and refactored one of 4 production applications, achieving 62% performance improvement and containerizing all services to eliminate resource contention and daily crashes
            </ExperienceItem>
            <ExperienceItem delay={0.3}>
              Re-engineered broken Stripe payment integration with Webhooks and 3D Secure 2 authentication, resolving false payment confirmations and ensuring PCI compliance
            </ExperienceItem>
            <ExperienceItem delay={0.4}>
              Migrated from single-VPS to isolated containerized environments, serving 3,000+ users on stable, scalable infrastructure
            </ExperienceItem>
          </ul>
        </ExperienceSection>

        {/* Experience 4 - CosmicForge Healthnet */}
        <ExperienceSection index={3}>
          <p className="text-sm font-semibold text-gray-300 mb-2">2025</p>

          <ScrollReveal
            size="md"
            align="left"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.03}
            containerClassName="mb-1"
            textClassName="text-xl font-semibold text-white"
          >
            AI Engineer
          </ScrollReveal>

          <p className="text-my-primary font-medium mt-1">
            <a href="https://cosmicforge-frontend.vercel.app" target="_blank">
              CosmicForge Healthnet Limited
            </a>
          </p>

          <p className="text-gray-400 text-sm mt-1">
            January 2025 — July 2025 · 7 months
          </p>
          <p className="text-gray-400 text-sm">
            Lagos State, Nigeria · Full-time (Hybrid)
          </p>

          <ul className="mt-4 max-w-2xl space-y-2 list-disc list-inside">
            <ExperienceItem delay={0.1}>
              Fine-tuned and deployed LLaMA 3 (70B parameters) to RunPod cloud for diagnosis, lab analysis, and genetics insights
            </ExperienceItem>
            <ExperienceItem delay={0.2}>
              Developed RESTful APIs using Python and FastAPI serving AI predictions with real-time patient analytics
            </ExperienceItem>
            <ExperienceItem delay={0.3}>
              Integrated AI voice assistant (VAPI + Whisper) for interactive patient communication and clinical support
            </ExperienceItem>
            <ExperienceItem delay={0.4}>
              Managed Azure cloud deployment ensuring secure, scalable, production-ready infrastructure
            </ExperienceItem>
          </ul>
        </ExperienceSection>

        {/* Experience 5 - Raspaas */}
        <ExperienceSection index={4}>
          <p className="text-sm font-semibold text-gray-300 mb-2">2021 — 2022</p>

          <ScrollReveal
            size="md"
            align="left"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.03}
            containerClassName="mb-1"
            textClassName="text-xl font-semibold text-white"
          >
            Software Developer
          </ScrollReveal>

          <p className="text-my-primary font-medium mt-1">
            <a href="https://raspaas.up.railway.app" target="_blank">
              Raspaas
            </a>
          </p>

          <p className="text-gray-400 text-sm mt-1">
            March 2021 — August 2022 · 1 year 6 months
          </p>
          <p className="text-gray-400 text-sm">
            Sri Lanka · Full-time (Remote)
          </p>

          <ul className="mt-4 max-w-2xl space-y-2 list-disc list-inside">
            <ExperienceItem delay={0.1}>
              Built and deployed 2 enterprise-grade systems: AI-powered invoice management platform (InvoTex OCR) and multi-tenant HR system with face recognition (ZKTeco) devices for &lt;1s real-time attendance logging
            </ExperienceItem>
            <ExperienceItem delay={0.2}>
              Engineered InvoTex OCR using Document AI, Google Cloud Vision, and LlamaLayoutMv5, achieving 97% extraction accuracy processing 1,000+ invoices (up to 1GB) in under 5 minutes via Django, FastAPI, React.js, and PostgreSQL
            </ExperienceItem>
            <ExperienceItem delay={0.3}>
              Architected RASPAAS HR system with Django, Celery, Docker, and PostgreSQL, integrating biometric (REALAND)
            </ExperienceItem>
            <ExperienceItem delay={0.4}>
              Implemented JWT authentication, RBAC authorization, multi-level approval workflows, and automated payroll with compliance tracking
            </ExperienceItem>
          </ul>
        </ExperienceSection>

        {/* Experience 6 - Exoper */}
        <ExperienceSection index={5}>
          <p className="text-sm font-semibold text-gray-300 mb-2">2025 — Present</p>

          <ScrollReveal
            size="md"
            align="left"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.03}
            containerClassName="mb-1"
            textClassName="text-xl font-semibold text-white"
          >
            Software Engineer
          </ScrollReveal>

          <p className="text-my-primary font-medium mt-1">
            <a href="https://exoper.com" target="_blank">
              Exoper
            </a>
          </p>

          <p className="text-gray-400 text-sm mt-1">
            September 2025 — Present · Contract
          </p>
          <p className="text-gray-400 text-sm">
            Owerri, Imo State, Nigeria
          </p>

          <ul className="mt-4 max-w-2xl space-y-2 list-disc list-inside">
            <ExperienceItem delay={0.1}>
              Leading design and development of zero-trust AI security, governance, and compliance platform
            </ExperienceItem>
            <ExperienceItem delay={0.2}>
              Architected secure API gateway with real-time threat detection, policy enforcement, and immutable audit logging
            </ExperienceItem>
            <ExperienceItem delay={0.3}>
              Implemented microservices architecture using Rust and Go for critical services with Kubernetes multi-region deployment
            </ExperienceItem>
            <ExperienceItem delay={0.4}>
              Built automated compliance tools aligned with GDPR, HIPAA, EU AI Act, and ISO standards
            </ExperienceItem>
          </ul>
        </ExperienceSection>

        {/* Experience 7 - FUTO (KEPT AS-IS) */}
        <ExperienceSection index={6}>
          <p className="text-sm font-semibold text-gray-300 mb-2">2022 — 2023</p>

          <ScrollReveal
            size="md"
            align="left"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.03}
            containerClassName="mb-1"
            textClassName="text-xl font-semibold text-white"
          >
            Lead Engineer
          </ScrollReveal>

          <p className="text-my-primary font-medium mt-1">
            <a href="https://futo.edu.ng" target="_blank">
              Federal University of Technology Owerri
            </a>
          </p>

          <p className="text-gray-400 text-sm mt-1">
            November 2022 — April 2023 · 6 months
          </p>
          <p className="text-gray-400 text-sm">
            Imo State, Nigeria · Full-time
          </p>

          <ul className="mt-4 max-w-2xl space-y-2 list-disc list-inside">
            <ExperienceItem delay={0.1}>
              Led team of 6 engineers designing innovative feed composition variation system for distillation column optimization
            </ExperienceItem>
            <ExperienceItem delay={0.2}>
              Architected scalable backend using Node.js and PostgreSQL, integrating system into industrial workflows
            </ExperienceItem>
            <ExperienceItem delay={0.3}>
              Developed RESTful APIs and data pipelines automating process data collection, analysis, and visualization
            </ExperienceItem>
            <ExperienceItem delay={0.4}>
              Implemented real-time monitoring and control interfaces supporting operational decision-making
            </ExperienceItem>
          </ul>
        </ExperienceSection>
      </div>
    </section>
  );
};

export default experiencePage;