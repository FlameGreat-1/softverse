"use client";

import React from "react";
import Image from "next/image";

const allSkills = [
  { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "PHP (Laravel)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
  { name: "Shell", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", invert: true },
  { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", invert: true },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "SCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", invert: true },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "Django", icon: "https://api.iconify.design/logos/django-icon.svg" },
  { name: "REST APIs", icon: "https://api.iconify.design/mdi/api.svg?color=white" },
  { name: "WebSockets", icon: "https://api.iconify.design/logos/websocket.svg" },
  { name: "Microservices", icon: "https://api.iconify.design/logos/kubernetes.svg" },
  { name: "JWT", icon: "https://api.iconify.design/logos/jwt-icon.svg" },
  { name: "RBAC", icon: "https://api.iconify.design/flat-color-icons/privacy.svg" },
  { name: "OAuth 2.0", icon: "https://api.iconify.design/logos/oauth.svg" },
  { name: "AES-256", icon: "https://api.iconify.design/flat-color-icons/key.svg" },
  { name: "KMS / Vault", icon: "https://api.iconify.design/logos/vault-icon.svg" },
  { name: "TLS/SSL", icon: "https://api.iconify.design/flat-color-icons/lock.svg" },
  { name: "HIPAA", icon: "https://api.iconify.design/mdi/hospital-box.svg?color=white" },
  { name: "GDPR", icon: "https://api.iconify.design/flat-color-icons/ok.svg" },
  { name: "MiFID II", icon: "https://api.iconify.design/mdi/bank.svg?color=white" },
  { name: "ISO 27001", icon: "https://api.iconify.design/mdi/certificate.svg?color=white" },
  { name: "SOC 2", icon: "https://api.iconify.design/flat-color-icons/document.svg" },
  { name: "PCI-DSS", icon: "https://api.iconify.design/flat-color-icons/safe.svg" },
  { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "CI/CD", icon: "https://api.iconify.design/logos/github-actions.svg" },
  { name: "GitHub", icon: "https://api.iconify.design/mdi/github.svg?color=white" },
  { name: "Cloudflare", icon: "https://api.iconify.design/logos/cloudflare-icon.svg" },
  { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", invert: true },
  { name: "Oracle Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" },
  { name: "RunPod", icon: "/images/runpod.png" },
  { name: "Linux VPS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { name: "LLaMA 3", icon: "https://api.iconify.design/logos/meta-icon.svg" },
  { name: "QLoRA", icon: "https://api.iconify.design/flat-color-icons/mind-map.svg" },
  { name: "PEFT", icon: "https://api.iconify.design/flat-color-icons/settings.svg" },
  { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
  { name: "LangChain", icon: "https://api.iconify.design/simple-icons/langchain.svg?color=white" },
  { name: "RAG", icon: "https://api.iconify.design/flat-color-icons/search.svg" },
  { name: "Vector DB", icon: "https://api.iconify.design/mdi/database-outline.svg?color=white" },
  { name: "OpenAI", icon: "https://api.iconify.design/simple-icons/openai.svg?color=white" },
  { name: "Gemini", icon: "https://api.iconify.design/logos/google-gemini.svg" },
  { name: "Claude", icon: "https://api.iconify.design/simple-icons/anthropic.svg?color=white" },
  { name: "Whisper", icon: "https://api.iconify.design/flat-color-icons/voice-presentation.svg" },
  { name: "VAPI", icon: "https://api.iconify.design/mdi/microphone-message.svg?color=white" },
];

const row1 = allSkills.slice(0, Math.ceil(allSkills.length / 2));
const row2 = allSkills.slice(Math.ceil(allSkills.length / 2));

const aboutPage = () => {
  return (
    <section
      id="about"
      className="relative mt-32 mb-20 space-y-16 scroll-mt-10"
    >
      <Image
        src="/assets/ellipse-large.png"
        alt="bg"
        width={540}
        height={540}
        className="absolute top-[-200px] left-0 w-[200px] sm:w-[400px] opacity-20 h-auto"
      />
      <Image
        src="/assets/ellipse-large.png"
        alt="bg"
        width={540}
        height={540}
        className="absolute -bottom-40 -right-44 w-[200px] sm:w-[600px] h-auto"
      />
      <Image
        src="/assets/pattern-big.svg"
        alt="bg"
        width={540}
        height={540}
        className="absolute -bottom-40 -left-10 w-[50px] sm:w-[110px] opacity-30"
      />

      <Image
        src="/assets/line-horizontal.png"
        alt="line"
        width={0}
        height={0}
        className="w-96 h-[0.5px] sm:w-96 mx-auto"
      />
      <div className="flex lg:flex-row flex-col gap-20 justify-between items-center px-3 sm:px-12 lg:px-32 w-full">
        <div className="flex-[1.2]">
          <div className="flex items-center mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-l-xl rounded-r-full border border-my-primary/50 text-white w-max shrink-0 whitespace-nowrap">
              <span className="text-lg font-semibold"><span className="text-my-primary">#</span>about-me</span>
              <span className="text-lg">🤩</span>
            </div>
            <div className="ml-4 sm:ml-6">
              <Image
                src="/assets/line.png"
                alt="line"
                width={22}
                height={1}
                className="sm:w-60 w-32 h-auto"
              />
            </div>
          </div>
          <p className="text-center sm:text-left text-[1rem] pt-5 leading-relaxed font-mono">
            Full Stack Engineer and Founder with 6+ years of experience building scalable, production-grade systems across fintech, healthtech, edtech, and algorithmic trading. Expert in backend engineering, AI/LLM integration, cloud infrastructure, and system security — delivering high-performance, compliant platforms from microservices and real-time systems to fine-tuned LLMs and automated trading engines.
          </p>
        </div>
        <div className="flex-1 flex justify-center sm:mt-6 mt-10 relative min-h-[400px]">
          {/* bg patterns */}
          <Image
            src="/assets/star.svg"
            alt="star"
            width={120}
            height={120}
            className="z-10 md:-z-10 w-24 h-24 md:w-32 md:h-32 absolute -top-4 -left-4 md:-top-16 md:-left-24 lg:-top-16 lg:-left-20"
          />
          <Image
            src="/assets/smiley.svg"
            alt="smiley"
            width={100}
            height={100}
            className="z-10 md:-z-10 w-16 h-16 md:w-24 md:h-24 absolute top-16 -right-6 md:top-20 md:-right-28 lg:top-32 lg:-right-24"
          />
          <Image
            src="/assets/prop.webp"
            alt="prop"
            width={160}
            height={160}
            className="z-10 md:-z-10 w-28 h-28 md:w-40 md:h-40 absolute -bottom-6 -left-10 md:-bottom-20 md:-left-28 lg:-bottom-16 lg:-left-28"
          />

          <div className="w-full h-full flex items-center justify-center pt-8 md:pt-0">
            <div className="relative group perspective-1000 rotate-6 transition-transform duration-500 hover:rotate-0 mt-8 md:mt-0">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-my-primary to-purple-600 rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition duration-700"></div>
              <Image
                src="/images/my-picture-1.png"
                alt="My Picture"
                width={500}
                height={700}
                className="w-[280px] h-[380px] sm:w-[340px] sm:h-[460px] md:w-[420px] md:h-[580px] lg:w-[440px] lg:h-[600px] relative rounded-2xl object-cover shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 grayscale-[20%] hover:grayscale-0 border border-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-1 sm:mx-6 lg:mx-32 px-0 py-8 sm:py-10 lg:rounded-2xl lg:border lg:border-white/20 lg:bg-white/5 lg:backdrop-blur-sm lg:shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)] mt-12 sm:mt-0 overflow-hidden relative">
        <div className="flex items-center mb-8 px-4 sm:px-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-l-xl rounded-r-full border border-my-primary/50 text-white w-max">
            <span className="text-lg font-semibold"><span className="text-my-primary">/</span>skills</span>
            <span className="text-lg">🛠️</span>
          </div>
        </div>
        {/* Fading Edges for the marquee container */}
        <div className="hidden lg:block absolute left-0 top-[80px] bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#17141f] to-transparent z-10 pointer-events-none rounded-l-2xl"></div>
        <div className="hidden lg:block absolute right-0 top-[80px] bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#17141f] to-transparent z-10 pointer-events-none rounded-r-2xl"></div>

        <div className="space-y-6">
          {/* Marquee Row 1 */}
          <div className="relative w-full flex overflow-hidden whitespace-nowrap">
            <div className="animate-marquee flex gap-8 sm:gap-12 shrink-0 min-w-full group hover:[animation-play-state:paused]">
              {[...row1, ...row1, ...row1].map((skill, idx) => (
                <div key={`r1-${idx}`} className="flex flex-col items-center justify-center gap-2 px-4 py-2 hover:text-my-primary transition-colors cursor-default">
                  <img src={skill.icon} alt={skill.name} className={`w-8 h-8 md:w-10 md:h-10 object-contain ${skill.invert ? 'invert opacity-90' : ''}`} />
                  <span className="text-[14px] md:text-[16px] font-bold text-white/90">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 (Reverse) */}
          <div className="relative w-full flex overflow-hidden whitespace-nowrap">
            <div className="animate-marquee-reverse flex gap-8 sm:gap-12 shrink-0 min-w-full group hover:[animation-play-state:paused]">
              {[...row2, ...row2, ...row2].map((skill, idx) => (
                <div key={`r2-${idx}`} className="flex flex-col items-center justify-center gap-2 px-4 py-2 hover:text-my-primary transition-colors cursor-default">
                  <img src={skill.icon} alt={skill.name} className={`w-8 h-8 md:w-10 md:h-10 object-contain ${skill.invert ? 'invert opacity-90' : ''}`} />
                  <span className="text-[14px] md:text-[16px] font-bold text-white/90">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default aboutPage;