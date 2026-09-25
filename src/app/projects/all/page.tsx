"use client";

import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

const allProjects = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase my experience and skills.",
    thumbnail: "/images/Portfolio.png",
    category: "WEB",
    status: "Active",
    slug: "portfolio",
  },



  {
    title: "Sidesone",
    description:
      "Agency Freelance portfolio. Recovered locked production server, rebuilt and refactored applications achieving 62% performance improvement, re-engineered Stripe payment integration, and migrated to containerized infrastructure serving 3,000+ users.",
    thumbnail: "/images/sidesone.png",
    category: "INFRASTRUCTURE",
    status: "Completed",
    slug: "sidesone",
  },
  {
    title: "JTNC GROUP",
    description:
      "Backend trading infrastructure for managing algorithmic trading signals and broker order routing. Microservice-based system with a client-facing portal and control center deployed on Oracle Cloud.",
    thumbnail: "/images/jtnc.png",
    category: "FINTECH",
    status: "Active",
    slug: "jtnc-group",
  },
  {
    title: "Inflexa Technologies",
    description:
      "A scalable, multi-vendor e-commerce platform powering offline-first educational ecosystems. Node.js backend integrating global logistics and idempotent payments.",
    thumbnail: "/images/Inflexa1.png",
    category: "EDTECH",
    status: "Completed",
    slug: "inflexa",
  },
];

const AllProjectsPage = () => {
  const router = useRouter();

  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Navigate to home page
    router.push("/");

    // Try multiple times to find and scroll to the element
    let attempts = 0;
    const maxAttempts = 10;

    const scrollInterval = setInterval(() => {
      const element = document.getElementById("projects");

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        clearInterval(scrollInterval); // Stop trying once successful
      }

      attempts++;
      if (attempts >= maxAttempts) {
        clearInterval(scrollInterval); // Give up after 10 attempts
      }
    }, 100); // Check every 100ms
  };

  return (
    <section className="px-4 sm:px-12 lg:px-24 py-20 bg-bg-dark">
      <div className="mb-8">
        <Link
          href="/#projects"
          onClick={handleBackClick}
          className="text-sm text-my-primary underline cursor-pointer"
        >
          &larr; Back
        </Link>
      </div>

      <h2 className="font-semibold text-[20px] text-white lg:text-[32px] flex items-center mb-6">
        <span className="text-my-primary">/</span>more-projects{" "}
        <span className="ml-6">
          <Image
            src="/assets/line.png"
            alt="line"
            width={22}
            height={1}
            className="sm:60 w-32 h-auto"
          />
        </span>
      </h2>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 mt-10 md:mt-20 text-white">
        {allProjects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            thumbnail={project.thumbnail}
            category={project.category}
            status={project.status}
            slug={project.slug}
          />
        ))}
      </div>
      <p className="text-white mt-20">
        check out more on my github{" "}
        <a
          href="https://github.com/FlameGreat-1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-my-primary underline"
        >
          here!
        </a>
      </p>
    </section>
  );
};

export default AllProjectsPage;
