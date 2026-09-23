\documentclass[10pt,a4paper,sans]{moderncv}

% Modern CV theme
\moderncvstyle{banking}
\moderncvcolor{blue}

% Adjust the page margins
\usepackage[scale=0.82]{geometry}

% Clickable underlined blue links in PDF
\usepackage{hyperref}
\hypersetup{
    colorlinks=true,
    urlcolor=blue,
    linkcolor=blue
}
\usepackage{ulem}
\newcommand{\ulink}[2]{\href{#1}{\uline{#2}}}

% Custom header packages
\usepackage{fontawesome5}
\usepackage{array}
\usepackage{xcolor}
\usepackage{needspace}

% Tighten list spacing globally
\usepackage{enumitem}
\setlist[itemize]{noitemsep, topsep=2pt, parsep=0pt, partopsep=0pt}

% Remove default moderncv title
\renewcommand*{\makecvtitle}{}

\begin{document}
\phantomsection
\pdfbookmark[0]{Emmanuel Iziogo --- Full Stack Engineer \& Founder}{name}

% ── CUSTOM HEADER ──────────────────────────────────────────────────────────────
\begin{center}
    {\Huge\bfseries\color{color1} Emmanuel Iziogo}\\[2pt]
    {\large\color{color2} Full Stack Engineer \& Founder}\\[4pt]
    \small
    \faPhone\ +234 8136872013 \quad\textbar\quad
    \faEnvelope\ \href{mailto:emmanuel@exoper.com}{emmanuel@exoper.com} \quad\textbar\quad
    \faGlobe\ \href{https://flamegreat.tech}{flamegreat.tech}\\[2pt]
    \faGithub\ \href{https://github.com/FlameGreat-1}{FlameGreat-1} \quad\textbar\quad
    \faLinkedin\ \href{https://linkedin.com/in/flamegreat}{flamegreat} \quad\textbar\quad
    \faMapMarker*\ Nigeria
\end{center}
\vspace{0pt}
\noindent\textcolor{color1}{\rule{\linewidth}{1.2pt}}
\vspace{-6pt}
% ───────────────────────────────────────────────────────────────────────────────

% Professional Summary
\section{Professional Summary}
Full Stack Engineer and Founder with 6+ years of experience building scalable, production-grade systems across fintech, healthtech, edtech, and algorithmic trading. Expert in backend engineering, AI/LLM integration, cloud infrastructure, and system security --- delivering high-performance, compliant platforms from microservices and real-time systems to fine-tuned LLMs and automated trading engines.

% Education
\section{Education}
\cventry{Nov. 2018 -- Jun. 2023}{B.Eng. in Chemical Engineering}{Federal University of Technology Owerri (FUTO)}{Owerri, Imo State, Nigeria}{}{}

% Technical Skills
\section{Technical Skills}
\cvitem{Stack}{Go, Rust, Python, TypeScript, PHP (Laravel), MQL5, Node.js, FastAPI, Django, REST APIs, WebSockets, Kubernetes, Helm, Docker, Envoy, CI/CD, Azure, AWS, Oracle Cloud, PostgreSQL, Redis}
\cvitem{AI/ML \& Security}{LLaMA 3, QLoRA, PEFT, PyTorch, LangChain, RAG, OpenAI, Gemini, Claude, Whisper, AES-256, JWT, RBAC, GDPR, MiFID II, PCI-DSS}

% Professional Experience
\section{Professional Experience}

\needspace{6\baselineskip}
\cventry{Feb. 2019 -- Mar. 2022}{Backend Engineer}{\ulink{https://qfaa.jtncgroup.com}{JTNC GROUP}}{U.S.A}{Full-time (Remote)}
{\begin{itemize}
\item Rebuilt and maintained core trading infrastructure in Python, migrating from a monolithic architecture to a scalable microservice-based system deployed on Oracle Cloud, supporting platform operations across \$1B+ AUM; engineered and maintained the QuantumFlow algorithmic trading engine optimising low-latency order routing, signal processing, and real-time broker integration across multiple asset classes
\item Designed a client-facing portal and control center for managing algorithmic trading signals, investor accounts, and broker order routing --- supporting multi-client portfolio management at scale
\item Implemented end-to-end security and compliance infrastructure including AES encryption, TLS/SSL, JWT, and RBAC with KYC/AML checks and SEC-aligned audit trails; built real-time trade monitoring dashboards, alerting pipelines, and immutable audit logging ensuring full operational visibility and regulatory traceability
\item Established a mirrored staging environment with CI/CD automation for zero-downtime deployments and regression testing across all platform services. Stack: Python, Oracle Cloud, PostgreSQL, REST APIs, microservices, CI/CD, AES encryption, JWT, RBAC
\end{itemize}}

\needspace{6\baselineskip}
\cventry{May 2022 -- Jan. 2024}{Fullstack Engineer}{\ulink{https://autonoms.ai}{Autonoms AI}}{U.S.A}{Full-time (Remote)}
{\begin{itemize}
\item Contributed to the architecture and development of an AI workforce platform (React, Next.js, TypeScript) coordinating specialist outbound agents --- research, enrichment, outreach, qualification, scheduling, and CRM hygiene --- deployed across 147 enterprise clients
\item Engineered and maintained the agent deployment pipeline (Node.js, PostgreSQL) powering the custom multi-agent orchestration layer, integrating with email, LinkedIn, calendar/booking, and CRM APIs to support automated omni-channel outbound workflows
\item Built the marketplace storefront and seller/buyer portal with SSR via Next.js for SEO and sub-200ms page performance, supporting discovery and deployment of 120+ live AI agents with human-in-the-loop oversight; delivered on AWS with CI/CD automation, private cloud deployment, and isolated per-client infrastructure ensuring data sovereignty and 24/7 agent execution
\end{itemize}}

\needspace{6\baselineskip}
\cventry{Mar. 2024 -- Feb. 2025}{Full Stack Developer}{\ulink{https://www.cosmicforge-healthnet.com}{CosmicForge Healthnet Limited}}{Nigeria}{Full-time (Hybrid)}
{\begin{itemize}
\item Led a team of 4 engineers to Architect and deliver a full-stack telemedicine and patient management platform (React, Next.js, FastAPI, PostgreSQL) supporting health records, appointment scheduling, lab orders, prescriptions, pharmacy, AI-assisted diagnosis, real-time chat, and integrated wallet/billing --- onboarding 71 patients and 13 verified doctors across multiple specialties
\item Fine-tuned LLaMA 3 (70B) on PubMed and MIMIC-III clinical datasets using QLoRA and PEFT, deployed on RunPod with 4-bit quantization for memory-efficient inference achieving sub-200ms inference latency; integrated VAPI and Whisper for AI voice-based patient communication, reducing average consultation response time by 40\%
\item Engineered secure RESTful APIs and WebSocket-based real-time services with JWT, RBAC, AES-256, and HIPAA-compliant PHI handling; integrated Paystack with webhook signature verification, idempotency controls, ACID-compliant transactions, and automated reconciliation; deployed on Azure with Docker, CI/CD, auto-scaling, 99\% uptime, and sub-130ms API response times
\end{itemize}}

\needspace{6\baselineskip}
\cventry{Feb. 2025 -- Dec. 2025}{Software Developer}{\ulink{https://raspaas.up.railway.app}{Raspaas}}{Sri Lanka}{Contract (Remote)}
{\begin{itemize}
\item Built and deployed 2 enterprise-grade systems: engineered InvoTex OCR (Document AI, Google Cloud Vision, LlamaLayoutMv5, Django, FastAPI, React.js, PostgreSQL) achieving 97\% extraction accuracy processing 1,000+ invoices up to 1GB in under 5 minutes; and a multi-tenant HR system with ZKTeco face recognition devices delivering sub-1s real-time attendance logging
\item Architected RASPAAS HR system with Django, Celery, Docker, and PostgreSQL integrating REALAND biometric devices for automated multi-tenant attendance tracking; implemented JWT authentication, RBAC, multi-level approval workflows, and automated payroll with compliance tracking
\end{itemize}}

\needspace{6\baselineskip}
\cventry{Feb. 2026 -- Aug. 2026}{Software Engineer}{\ulink{https://esq1tech.com}{ESQ1 Tech}}{Nigeria}{Contract}
{\begin{itemize}
\item Designed and rebuilt \ulink{https://instapay9ja.ng}{Instapay} (PHP Laravel, PostgreSQL, TypeScript), a fintech platform supporting utility bill payments, airtime/data top-ups, and peer-to-peer transfers; integrated Flutterwave with webhook signature verification, idempotency controls, ACID-compliant transactions, automated reconciliation, B2B identity verification, KYC/AML compliance, and real-time fraud detection
\item Architected a Marketplace Escrow system within Instapay with automated fund holding, conditional release workflows, dispute resolution logic, double-entry bookkeeping, and AES-256 encryption --- ensuring trustless, auditable transactions at scale
\item Built and deployed \ulink{https://inflexatechnologies.com}{Inflexa Technologies} (Node.js, TypeScript, PostgreSQL, Docker), a multi-vendor e-commerce platform for physical and digital flashcard packs; integrated Stripe and Paystack with PCI-DSS-compliant checkout, idempotent payment flows, and webhook event handling; connected EasyPost, ShipEngine, Shippo, and EasyShip for real-time shipping rate calculation, label generation, and automated order fulfilment; enforced RBAC, JWT, rate limiting, and input sanitization across both platforms
\end{itemize}}

\needspace{6\baselineskip}
\cventry{Sep. 2025 -- Present}{Founder \& Lead Engineer}{\ulink{https://app.exoper.com}{Exoper}}{Nigeria}{Full-time}
{\begin{itemize}
\item Founded and led a team of 3 engineers in end-to-end architecture and development of Exoper, a non-custodial AI-powered trading technology platform supporting forex, metals, crypto, and stocks --- serving 163 active traders with 300K+ trades executed, 60\%+ signal accuracy, and 97\% platform uptime
\item Engineered a multi-LLM analysis engine (OpenAI, Gemini, Claude) with RAG pipelines and TradingEconomics API integration, performing full top-down technical analysis across 13 timeframes and macroeconomic analysis across all macro indicators --- completing end-to-end analysis and order routing to broker in 50--70 seconds with millisecond execution latency
\item Architected a MetaTrader terminal provisioning system on Linux VPS using Wine, Xvfb, and Kubectl for headless broker connectivity across all brokers and prop firms; built MQL5 Expert Advisors for automated trade execution, management, and closure with real-time WebSocket streaming and monitoring
\item Implemented microservices architecture (Go, Rust, FastAPI, TypeScript) with Kubernetes multi-region deployment, Helm, Envoy proxy, and edge ingress; integrated MetaAPI, Paddle, and NowPayments; enforced AES-256 encryption, JWT, RBAC, immutable audit logging, real-time threat detection, and compliance with GDPR, MiFID II, EU AI Act, and ISO 27001
\end{itemize}}

\end{document}