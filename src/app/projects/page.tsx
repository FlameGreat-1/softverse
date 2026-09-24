"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import Carousel from "@/components/Carousel";
import { motion, AnimatePresence } from "framer-motion";

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState<"projects" | "achievements">(
    "projects"
  );

  const achievements = [
    {
      src: "/images/Loading_1.gif",
      caption: "Leader of the year award",
    },
    {
      src: "/images/Loading_1.gif",
      caption: "B.ENG (chemical engineering) from Federal University of Technology Owerri",
    },
    {
      src: "/images/Loading_1.gif",
      caption: "Full-Stack Engineering Certification from Coursera",
    },
  ];

  return (
    <section
      id="projects"
      className="space-y-16 my-40 px-4 sm:px-12 lg:px-24 relative scroll-mt-10 md:scroll-mt-32"
    >
      <Image
        src="/assets/dots-small.svg"
        alt="Background pattern"
        width={80}
        height={80}
        className="absolute top-16 md:right-60 right-10 w-10 sm:w-16"
      />

      <Image
        src="/assets/ellipse-large.png"
        alt="Background pattern"
        width={80}
        height={80}
        className="absolute top-48 -left-40 w-[250px] sm:w-[500px] -z-10"
      />

      <div>
        <h2 className="font-semibold text-[24px] lg:text-[32px] flex items-center mb-6">
          <span className="text-my-primary">#</span>projects/achievements{" "}
          <span className="ml-6">
            <Image
              src="/assets/line.png"
              alt="line"
              width={32}
              height={1}
              className="sm:w-60 w-32 h-auto"
            />
          </span>
        </h2>

        {/* tabs */}
        <div className="flex justify-between w-full lg:w-[70%] mx-auto my-10 text-[12px] lg:text-[18px] gap-3">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-2 rounded-full transition-all border backdrop-blur-sm
            ${
              activeTab === "projects"
                ? "bg-[#2b2035] border-[#C778DD] shadow-[0_0_20px_#C778DD33]"
                : "border-gray-700/60 hover:border-gray-500"
            }`}
          >
            {`{ Projects }`}
          </button>

          <button
            onClick={() => setActiveTab("achievements")}
            className={`px-6 py-2 rounded-full transition-all border backdrop-blur-sm
            ${
              activeTab === "achievements"
                ? "bg-[#2b2035] border-[#C778DD] shadow-[0_0_20px_#C778DD33]"
                : "border-gray-700/60 hover:border-gray-500"
            }`}
          >
            {`{ Achievements }`}
          </button>
        </div>

        {/* tab content with animation */}
        <div className="w-full mx-auto">
          <AnimatePresence mode="wait" initial={false}>
            {activeTab === "projects" ? (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  <ProjectCard
                    title="CosmicForge HealthNet"
                    category="HEALTHCARE"
                    status="Active"
                    description="AI-powered telemedicine platform that connects patients with healthcare professionals for virtual consultations and medical advice."
                    thumbnail="/images/cosmicforge1.png"
                    slug="cosmicforge"
                  />
                  <ProjectCard
                    title="Autonoms AI"
                    category="SOFTWARE"
                    status="Active"
                    description="AI agent marketplace platform enabling businesses and enterprises to browse, purchase, and deploy pre-built AI agents with seamless developer integrations."
                    thumbnail="/images/autonoms.png"
                    slug="autonoms-ai"
                  />
                  <ProjectCard
                    title="exoper"
                    category="SECURITY"
                    status="Active"
                    description="AI Security Guardrails. One Gateway. Every Model. Every AI request passes through EXOPER's zero-trust gateway."
                    thumbnail="/images/exoper.png"
                    slug="exoper"
                  />
                </div>

                <div className="flex justify-center mt-12 mb-10 w-full relative z-20">
                  <Link
                    href="/projects/all"
                    className="px-8 py-3 rounded-full border border-my-primary/50 text-my-primary font-semibold hover:bg-my-primary/10 transition-all duration-300 shadow-[0_0_15px_rgba(199,121,221,0.3)] hover:shadow-[0_0_25px_rgba(199,121,221,0.6)] flex items-center gap-2 group"
                  >
                    <span>VIEW ALL PROJECTS</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <div className="w-full lg:w-[85%] max-w-4xl">
                  <p className="text-center mx-auto mb-10 font-semibold text-[14px] sm:text-md">
                    Acievements / Certifications
                  </p>
                  <Carousel
                    slides={achievements}
                    autoPlay
                    autoPlayInterval={6000}
                    showIndicators
                    showArrows
                  />
                </div>

                <p className="mt-6 text-[10px] text-center sm:text-sm text-gray-300">
                  Swipe to explore — or use the arrows / dots.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
