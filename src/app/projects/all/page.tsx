"use client";

import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

const allProjects = [
  {
    title: "Portfolio Website",
    subtitle:
      "A personal portfolio website to showcase my projects and skills.",
    thumbnail: "/images/Portfolio.png",
    stack: "Next.js · TypeScript · Tailwind ",
    liveUrl: "https://softverse.vercel.app/",
    githubUrl: "https://github.com/FlameGreat-1/Softverse",
  },
  {
    title: "Interneefy",
    subtitle:
      "An internship management system I built for my SIWES project-- designed to streamline the internship process for organizations.",
    thumbnail: "/images/exoper.png",
    stack:
      "Next.js · React.js · TypeScript · Tailwind CSS · Node.js · PostgreSQL · Prisma ",
    liveUrl: "https://interneefy-frontend.vercel.app/",
    githubUrl: "https://github.com/FlameGreat-1/interneefy-frontend",
  },
  {
    title: "Tic Tac Toe",
    subtitle:
      "This is a simple implementation of the classic Tic-Tac-Toe game. A project from TOP(The Odin Project).",
    thumbnail: "/images/raspaas.png",
    stack: "HTML · CSS · JavaScript ",
    liveUrl: "https://nuga25.github.io/Tic-Tac-Toe/",
    githubUrl: "https://github.com/FlameGreat-1/Tic-Tac-Toe",
  },
  {
    title: "Space Tourism Website",
    subtitle:
      "A frontend mentor challenge--responsive space tourism website that provides information about space travel and related services.",
    thumbnail: "/images/buildhive.png",
    stack: "TypeScript · React.js · Next.js · Tailwind CSS ",
    liveUrl: "https://space-tourism-website-henna.vercel.app/",
    githubUrl: "https://github.com/FlameGreat-1/space-tourism-website",
  },
  {
    title: "Etch A Sketch",
    subtitle:
      "A web-based drawing playground based on the popular etch a sketch drawing toy invented back in days.",
    thumbnail: "/images/sidesone.png",
    stack: "HTML · CSS · JavaScript ",
    liveUrl: "https://nuga25.github.io/odin-etch-a-sketch-proj/",
    githubUrl: "https://github.com/FlameGreat-1/odin-etch-a-sketch-proj",
  },
  {
    title: "Positivus Landing page",
    subtitle:
      "A landing page for Positivus, showcasing their products and services.",
    thumbnail: "/images/cosmicforge.png",
    stack: "HTML · CSS · JavaScript ",
    liveUrl: "https://positivus-phi-dun.vercel.app/",
    githubUrl: "https://github.com/FlameGreat-1/Positivus",
  },
  {
    title: "Loan Dashboard",
    subtitle:
      "A static loan dashboard application that helps users manage and track their loans effectively.",
    thumbnail: "/images/honestiq.png",
    stack: "React.js · Tailwind CSS · JavaScript · Chart.js ",
    liveUrl: "https://loan-dashboard-rouge.vercel.app/",
    githubUrl: "https://github.com/FlameGreat-1/loan-dashboard",
  },
  {
    title: "Todo List",
    subtitle:
      "A simple and intuitive todo list application to help users manage their tasks effectively.",
    thumbnail: "/images/basse.png",
    stack: "HTML · CSS · JavaScript · localStorage",
    liveUrl: "https://nuga25.github.io/Todo-List/",
    githubUrl: "https://github.com/FlameGreat-1/Todo-List",
  },
  {
    title: "E-commerce Product Page",
    subtitle:
      "A responsive e-commerce product page that displays product details. A challenge by Frontend Mentor.",
    thumbnail: "/images/nsw.png",
    stack: "React.js · Tailwind CSS · TypeScript ",
    liveUrl: "https://e-commerce-product-page-gray-gamma.vercel.app/",
    githubUrl: "https://github.com/FlameGreat-1/E-commerce-product-page",
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
    <section className="px-10 sm:px-32 py-20 bg-bg-dark">
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
            className="sm:60 w-32 h-[0.5px]"
          />
        </span>
      </h2>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 mt-10 md:mt-20 text-white">
        {allProjects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            subtitle={project.subtitle}
            thumbnail={project.thumbnail}
            stack={project.stack}
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
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
