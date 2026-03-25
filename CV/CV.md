\documentclass[11pt,a4paper,sans]{moderncv}

% Modern CV theme
\moderncvstyle{classic}
\moderncvcolor{blue}

% Adjust the page margins
\usepackage[scale=0.75]{geometry}

% Clickable underlined blue links in PDF
\usepackage{hyperref}
\hypersetup{
    colorlinks=true,
    urlcolor=blue,
    linkcolor=blue
}
\usepackage{ulem}
\newcommand{\ulink}[2]{\href{#1}{\uline{#2}}}

% Personal data
\name{Emmanuel U.}{Iziogo}
\phone[mobile]{+234 8136872013}
\email{softverse.com@gmail.com}
\social[github]{FlameGreat-1}
\social[linkedin]{flamegreat}
\address{Owerri, Nigeria}

\begin{document}

\makecvtitle

% Professional Summary
\section{Professional Summary}
Full-Stack Engineer with 5+ years of experience architecting and deploying scalable applications, RESTful services, and AI-powered solutions. Proven expertise in end-to-end software development, cloud infrastructure, and system security across SaaS platforms and enterprise systems. Specialized in integrating LLMs, automating workflows, and delivering production-ready systems with high availability and real-time intelligence. Chemical Engineering background provides unique analytical approach to complex software challenges and data-driven solutions.

% Education
\section{Education}
\cventry{November 2018 -- April 2024}{B.Eng. in Chemical Engineering}{Federal University of Technology Owerri (FUTO)}{Owerri, Imo State, Nigeria}{}{}

% Skills
\section{Technical Skills}
\cvitem{Stack}{Go, Python, TypeScript, Node.js, Django, FastAPI, Next.js, React.js, Tailwind CSS, PostgreSQL, CI/CD}
\cvitem{AI/ML}{PyTorch, Tensorflow, Scikit-Learn, Numpy, Pandas, OpenAI API, LangChain, RAG, Vector DB, OCR, Whisper, VAPI}

% Languages
\section{Languages}
\cvitem{}{English --- Fluent \quad French --- Basic}

\vspace{6pt}
% Professional Experience
\section{Professional Experience}

\cventry{November 2022 -- October 2024}{Backend Engineer}{\ulink{https://qfaa.jtncgroup.com}{JTNC GROUP}}{U.S.A}{Full-time (Remote)}
{\begin{itemize}
\item Designed and Rebuilt backend trading infrastructure in Python, replacing the existing React/Tailwind architecture with a microservice-based system deployed on Oracle Cloud
\item Designed a client-facing portal and control center for managing algorithmic trading signals and broker order routing on behalf of clients
\item Built a secondary server to replicate the production environment alongside a dedicated testing and staging pipeline with CI/CD automation
\item Stack: Python, Oracle Cloud, CI/CD pipelines, microservices architecture
\end{itemize}}

\cventry{November 2022 -- April 2023}{Fullstack Engineer}{\ulink{https://autonoms.ai}{Autonoms AI}}{Remote}{Full-time}
{\begin{itemize}
\item Contributed to the development of an AI agent marketplace platform enabling businesses and enterprises to browse, purchase, and deploy pre-built AI agents
\item Built and maintained the agent deployment pipeline, supporting seamless developer integrations and automated deployment workflows for enterprise clients
\item Contributed to frontend development of the marketplace storefront and seller/buyer portal, supporting agent listings, discovery, and transactions
\item Delivered using React, Next.js, TypeScript, and PostgreSQL, deployed on AWS with CI/CD automation
\end{itemize}}

\cventry{January 2025 -- July 2025}{AI Engineer}{\ulink{https://cosmicforge-frontend.vercel.app}{CosmicForge Healthnet Limited}}{Lagos State, Nigeria}{Full-time (Hybrid)}
{\begin{itemize}
\item Fine-tuned and deployed LLaMA 3 (70B parameters) to RunPod cloud for diagnosis, lab analysis, and genetics insights
\item Developed RESTful APIs using Python and FastAPI serving AI predictions with real-time patient analytics
\item Integrated AI voice assistant (VAPI + Whisper) for interactive patient communication and clinical support
\item Managed Azure cloud deployment ensuring secure, scalable, production-ready infrastructure
\end{itemize}}

\cventry{March 2021 -- August 2022}{Software Developer}{\ulink{https://raspaas.up.railway.app}{Raspaas}}{Sri Lanka}{Full-time (Remote)}
{\begin{itemize}
\item Built and deployed 2 enterprise-grade systems: AI-powered invoice management platform (InvoTex OCR) and multi-tenant HR system with face recognition (ZKTeco) devices for $<$1s real-time attendance logging
\item Engineered InvoTex OCR using Document AI, Google Cloud Vision, and LlamaLayoutMv5, achieving 97\% extraction accuracy processing 1,000+ invoices (up to 1GB) in under 5 minutes via Django, FastAPI, React.js, and PostgreSQL
\item Architected RASPAAS HR system with Django, Celery, Docker, and PostgreSQL, integrating biometric (REALAND)
\item Implemented JWT authentication, RBAC authorization, multi-level approval workflows, and automated payroll with compliance tracking
\end{itemize}}

\cventry{October 2024}{Fullstack Engineer}{\ulink{https://sidesone.no}{Sidesone}}{Norway}{Contract (Remote)}
{\begin{itemize}
\item Recovered locked production server using chroot environment, restoring full codebases, databases (3,200+ records), SSL certificates, and n8n automation workflows with zero data loss
\item Rebuilt and refactored one of 4 production applications, achieving 62\% performance improvement and containerizing all services to eliminate resource contention and daily crashes
\item Re-engineered broken Stripe payment integration with Webhooks and 3D Secure 2 authentication, resolving false payment confirmations and ensuring PCI compliance
\item Migrated from single-VPS to isolated containerized environments, serving 3,000+ users on stable, scalable infrastructure
\end{itemize}}

\cventry{September 2025 -- Present}{Software Engineer}{\ulink{https://exoper.com}{Exoper}}{Owerri, Imo State, Nigeria}{Contract}
{\begin{itemize}
\item Leading design and development of zero-trust AI security, governance, and compliance platform
\item Architected secure API gateway with real-time threat detection, policy enforcement, and immutable audit logging
\item Implemented microservices architecture using Rust and Go for critical services with Kubernetes multi-region deployment
\item Built automated compliance tools aligned with GDPR, HIPAA, EU AI Act, and ISO standards
\end{itemize}}

\end{document}