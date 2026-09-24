"use client";

import React from "react";
import Image from "next/image";

const skillsData = {
  Languages: ["Go", "JavaScript", "Python", "TypeScript", "PHP (Laravel)", "Shell"],
  Frontend: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "SCSS"],
  Backend: ["Node.js", "Express.js", "FastAPI", "Django", "REST APIs", "WebSockets", "Microservices"],
  Security: ["JWT", "RBAC", "OAuth 2.0", "AES-256", "KMS / Vault", "TLS/SSL", "HIPAA", "GDPR", "MiFID II", "ISO 27001", "SOC 2", "PCI-DSS"],
  Infrastructure: ["Kubernetes", "Docker", "CI/CD", "Azure", "AWS", "Oracle Cloud", "RunPod", "Linux VPS"],
  "AI/ML": ["LLaMA 3", "QLoRA", "PEFT", "PyTorch", "LangChain", "RAG", "Vector DB", "OpenAI", "Gemini", "Claude", "Whisper", "VAPI"]
};

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
          <h2 className="font-semibold text-[24px] lg:text-[32px] flex items-center mb-6">
            <span className="text-my-primary">#</span>about-me{" "}
            <span className="ml-6">
              <Image
                src="/assets/line.png"
                alt="line"
                width={22}
                height={1}
                className="sm:w-60 w-32 h-auto"
              />
            </span>
          </h2>
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

      <div className="mx-1 sm:mx-6 lg:mx-32 px-2 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm font-semibold shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)] mt-12 sm:mt-0">
        <p className="text-[22px]">
          <span className="text-my-primary text-[26px]">/</span>skills
        </p>

        <div className="space-y-5 mt-5">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-[16px] font-semibold mb-3 text-my-primary">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3 text-[14px] font-light">
                {skills.map((skill) => (
                  <p
                    key={skill}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between rounded-full bg-white/5 backdrop-blur-sm shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]"
                  >
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default aboutPage;