import re
import sys

file_path = "src/app/experience/page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Find the start and end indices of the experiences block
start_marker = "        {/* Experience 1 - JTNC GROUP */}"
end_marker = "        </ExperienceSection>"
last_end_marker_pos = content.rfind(end_marker)

start_idx = content.find(start_marker)
end_idx = last_end_marker_pos + len(end_marker)

if start_idx == -1 or last_end_marker_pos == -1:
    print("Markers not found!")
    sys.exit(1)

new_experiences = """        {/* Experience 1 - JTNC GROUP */}
        <ExperienceSection index={0}>
          <p className="text-sm font-semibold text-gray-300 mb-2">2019 — 2022</p>

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
            February 2019 — March 2022
          </p>
          <p className="text-gray-400 text-sm">
            U.S.A · Full-time (Remote)
          </p>

          <ul className="mt-4 max-w-2xl space-y-2 list-disc list-inside">
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
            Fullstack Engineer
          </ScrollReveal>

          <p className="text-my-primary font-medium mt-1">
            <a href="https://autonoms.ai" target="_blank">
              Autonoms AI
            </a>
          </p>

          <p className="text-gray-400 text-sm mt-1">
            May 2022 — January 2024
          </p>
          <p className="text-gray-400 text-sm">
            U.S.A · Full-time (Remote)
          </p>

          <ul className="mt-4 max-w-2xl space-y-2 list-disc list-inside">
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
          <p className="text-sm font-semibold text-gray-300 mb-2">2024 — 2025</p>

          <ScrollReveal
            size="md"
            align="left"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.03}
            containerClassName="mb-1"
            textClassName="text-xl font-semibold text-white"
          >
            Full Stack Developer
          </ScrollReveal>

          <p className="text-my-primary font-medium mt-1">
            <a href="https://www.cosmicforge-healthnet.com" target="_blank">
              CosmicForge Healthnet Limited
            </a>
          </p>

          <p className="text-gray-400 text-sm mt-1">
            March 2024 — February 2025
          </p>
          <p className="text-gray-400 text-sm">
            Nigeria · Full-time (Hybrid)
          </p>

          <ul className="mt-4 max-w-2xl space-y-2 list-disc list-inside">
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

        {/* Experience 4 - Raspaas */}
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
            Software Developer
          </ScrollReveal>

          <p className="text-my-primary font-medium mt-1">
            <a href="https://raspaas.up.railway.app" target="_blank">
              Raspaas
            </a>
          </p>

          <p className="text-gray-400 text-sm mt-1">
            February 2025 — December 2025
          </p>
          <p className="text-gray-400 text-sm">
            Sri Lanka · Contract (Remote)
          </p>

          <ul className="mt-4 max-w-2xl space-y-2 list-disc list-inside">
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
          <p className="text-sm font-semibold text-gray-300 mb-2">2026</p>

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
            <a href="https://esq1tech.com" target="_blank">
              ESQ1 Tech
            </a>
          </p>

          <p className="text-gray-400 text-sm mt-1">
            February 2026 — August 2026
          </p>
          <p className="text-gray-400 text-sm">
            Nigeria · Contract
          </p>

          <ul className="mt-4 max-w-2xl space-y-2 list-disc list-inside">
            <ExperienceItem delay={0.1}>
              Designed and rebuilt <a href="https://instapay9ja.ng" target="_blank" className="underline">Instapay</a> (PHP Laravel, PostgreSQL, TypeScript), a fintech platform supporting utility bill payments, airtime/data top-ups, and peer-to-peer transfers; integrated Flutterwave with webhook signature verification, idempotency controls, ACID-compliant transactions, automated reconciliation, B2B identity verification, KYC/AML compliance, and real-time fraud detection
            </ExperienceItem>
            <ExperienceItem delay={0.2}>
              Architected a Marketplace Escrow system within Instapay with automated fund holding, conditional release workflows, dispute resolution logic, double-entry bookkeeping, and AES-256 encryption — ensuring trustless, auditable transactions at scale
            </ExperienceItem>
            <ExperienceItem delay={0.3}>
              Built and deployed <a href="https://inflexatechnologies.com" target="_blank" className="underline">Inflexa Technologies</a> (Node.js, TypeScript, PostgreSQL, Docker), a multi-vendor e-commerce platform for physical and digital flashcard packs; integrated Stripe and Paystack with PCI-DSS-compliant checkout, idempotent payment flows, and webhook event handling; connected EasyPost, ShipEngine, Shippo, and EasyShip for real-time shipping rate calculation, label generation, and automated order fulfilment; enforced RBAC, JWT, rate limiting, and input sanitization across both platforms
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
            Founder & Lead Engineer
          </ScrollReveal>

          <p className="text-my-primary font-medium mt-1">
            <a href="https://app.exoper.com" target="_blank">
              Exoper
            </a>
          </p>

          <p className="text-gray-400 text-sm mt-1">
            September 2025 — Present
          </p>
          <p className="text-gray-400 text-sm">
            Nigeria · Full-time
          </p>

          <ul className="mt-4 max-w-2xl space-y-2 list-disc list-inside">
            <ExperienceItem delay={0.1}>
              Founded and led a team of 3 engineers in end-to-end architecture and development of Exoper, a non-custodial AI-powered trading technology platform supporting forex, metals, crypto, and stocks — serving 163 active traders with 300K+ trades executed, 60%+ signal accuracy, and 97% platform uptime
            </ExperienceItem>
            <ExperienceItem delay={0.2}>
              Engineered a multi-LLM analysis engine (OpenAI, Gemini, Claude) with RAG pipelines and TradingEconomics API integration, performing full top-down technical analysis across 13 timeframes and macroeconomic analysis across all macro indicators — completing end-to-end analysis and order routing to broker in 50-70 seconds with millisecond execution latency
            </ExperienceItem>
            <ExperienceItem delay={0.3}>
              Architected a MetaTrader terminal provisioning system on Linux VPS using Wine, Xvfb, and Kubectl for headless broker connectivity across all brokers and prop firms; built MQL5 Expert Advisors for automated trade execution, management, and closure with real-time WebSocket streaming and monitoring
            </ExperienceItem>
            <ExperienceItem delay={0.4}>
              Implemented microservices architecture (Go, Rust, FastAPI, TypeScript) with Kubernetes multi-region deployment, Helm, Envoy proxy, and edge ingress; integrated MetaAPI, Paddle, and NowPayments; enforced AES-256 encryption, JWT, RBAC, immutable audit logging, real-time threat detection, and compliance with GDPR, MiFID II, EU AI Act, and ISO 27001
            </ExperienceItem>
          </ul>
        </ExperienceSection>"""

new_content = content[:start_idx] + new_experiences + content[end_idx:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Updated successfully")
