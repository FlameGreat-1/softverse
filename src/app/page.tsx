"use client";

import { useState, useEffect } from "react";
import FloatingRobot from "@/components/FloatingRobot";
import AboutPage from "@/app/about/page";
import Image from "next/image";
import ProjectsPage from "./projects/page";
import ContactPage from "./contact/page";
import ExperiencePage from "./experience/page";
import CustomCursor from "@/components/CustomCursor";

const titles = [
  "<Full-Stack Engineer/>",
  "<Founder/>",
];

const services = [
  { text: "Full-Stack website development services", color: "#60A5FA" }, // Blue
  { text: "AI-powered solutions", color: "#A78BFA" }, // Purple
  { text: "automation workflows", color: "#34D399" }, // Green
  { text: "cloud infrastructure services", color: "#F472B6" }, // Pink
];



export default function Home() {
  const [index, setIndex] = useState(0); // current title
  const [subIndex, setsubIndex] = useState(0); // current letter
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [serviceIndex, setServiceIndex] = useState(0); // current service
  const [isZooming, setIsZooming] = useState(true); // zoom animation state


  useEffect(() => {
    if (index === titles.length) return;

    if (subIndex === titles[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000); //pause at end
      return;
    }

    if (subIndex === 0 && reverse) {
      setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % titles.length); // next title
      }, 0);
      return;
    }

    const timeout = setTimeout(() => {
      setsubIndex((prev) => prev + (reverse ? -1 : 1));
    }, 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Service rotation with zoom animation
  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setIsZooming(false); // Start zoom out
      setTimeout(() => {
        setServiceIndex((prev) => (prev + 1) % services.length);
        setIsZooming(true); // Start zoom in
      }, 300); // Half of transition duration
    }, 3000); // Change service every 3 seconds

    return () => clearInterval(serviceInterval);
  }, []);

  // function to download CV
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/files/Emmanuel-Resume.pdf";
    link.download = "Emmanuel-Resume.pdf";
    link.click();
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] overflow-hidden">
      {/* Custom Cursor */}
      <div className="hidden lg:block">
        <CustomCursor />
      </div>

      {/* bg images */}
      <Image
        src="/assets/dots-small.svg"
        alt="Background pattern"
        className="absolute top-16 left-10 sm:left-40 md:left-80 w-10 sm:w-16"
        width={80}
        height={80}
      />
      <Image
        src="/assets/pattern-small.svg"
        alt="Background pattern"
        className="absolute top-64 right-0 w-14 md:w-16 opacity-30"
        width={80}
        height={80}
      />
      <Image
        src="/assets/pattern-big.svg"
        alt="Background pattern"
        className="absolute top-96 left-10 sm:left-1/4 w-28 md:w-36 opacity-30"
        width={140}
        height={140}
      />
      <Image
        src="/assets/dots-small.svg"
        alt="Background pattern"
        className="absolute top-[650px] right-10 sm:right-44 w-10 sm:w-16"
        width={80}
        height={80}
      />
      <Image
        src="/assets/ellipse-large.png"
        alt="Background pattern"
        className="absolute top-[-150px] right-[-150px] w-[250px] sm:w-[540px] h-auto"
        width={540}
        height={540}
      />
      <Image
        src="/assets/ellipse-large.png"
        alt="Background pattern"
        className="absolute top-[420px] left-[-120px] w-[250px] sm:w-[540px] h-auto"
        width={540}
        height={540}
      />

      <section className="relative z-10">


        <main className="text-white min-h-screen px-3 sm:px-8">
          {/* SEO boost */}
          <h1 className="sr-only">Emmanuel U. Iziogo Portfolio</h1>

          {/* home page */}
          <section
            className="relative min-h-[100vh] flex flex-col justify-between lg:gap-0 md:gap-[270px] gap-[230px]"
            id="home"
          >
            <div className="flex flex-col justify-center">
              <div className="text-center mt-[25vh] md:mt-[30vh] lg:mt-[38vh]">
                <h3 className="font-bold text-[18px] sm:text-[28px] md:text-[30px]">
                  Hi, I&apos;m{" "}
                  <span className="text-my-primary">Emmanuel U. Iziogo</span>
                </h3>
                <h1 className="font-bold text-[28px] sm:text-[40px] md:text-[50px] mt-5">
                  {titles[index].substring(0, subIndex)}
                  <span className="inline-block w-[1ch]">
                    {blink ? "|" : "|"}
                  </span>
                </h1>

                {/* Services Section with Zoom Animation */}
                <div className="mt-8 sm:mt-12 min-h-[60px] sm:min-h-[80px] flex items-center justify-center">
                  <p
                    className="font-semibold text-[16px] sm:text-[22px] md:text-[26px] transition-all duration-600 ease-in-out"
                    style={{
                      color: services[serviceIndex].color,
                      transform: isZooming ? "scale(1)" : "scale(0.8)",
                      opacity: isZooming ? 1 : 0,
                    }}
                  >
                    {services[serviceIndex].text}
                  </p>
                </div>

                {/* Craft Section */}
                <div className="mt-6 sm:mt-10">
                  <p className="font-medium text-[14px] sm:text-[18px] md:text-[20px] text-gray-300">
                    LET&apos;S CRAFT:{" "}
                    <span className="text-white font-semibold">
                      high availability and real-time intelligence systems
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* CV button */}
            <div className="fixed bottom-5 left-6 z-40">
              <button
                onClick={handleDownload}
                className="z-30 flex w-auto px-3 py-2 rounded-full border border-white/20 bg-white/1 backdrop-blur-sm text-white font-semibold transition-all duration-300 ease-in-out hover:shadow-[0_0_12px_#c779dd] hover:border-purple-400/50 active:shadow-[0_0_40px_#c779dd] active:scale-95 shadow-[inset_1px_1px_1px_rgba(255,255,255,0.8)]"
              >
                <span className="text-my-primary mr-1">{"{"}</span>
                CV{" "}
                <Image
                  src="/assets/download-icon.svg"
                  alt="download icon"
                  width={25}
                  height={25}
                />
                <span className="text-my-primary ml-1">{"}"}</span>
              </button>
            </div>

            {/* Robot */}
            <div className="absolute bottom-6 right-3">
              <FloatingRobot />
            </div>
          </section>

          <AboutPage />

          <ExperiencePage />

          <ProjectsPage />

          <ContactPage />
        </main>

        <footer className="text-center py-3 mb-0">
          <small className="text-white text-[10px]">
            Designed and Coded by{" "}
            <a
              href="https://www.linkedin.com/in/flamegreat"
              target="_blank"
              className="underline text-my-primary"
            >
             Softverse
            </a>
            . Copyright &copy; 2025
          </small>
        </footer>

        {/* social links */}
        <div className="fixed top-0 left-3 sm:left-6 z-20 sm:block hidden">
          <div className="flex justify-center items-center">
            <Image
              src="/assets/line-vertical.png"
              alt="line"
              width={2}
              height={0}
              className="sm:h-48 h-64 opacity-40 w-auto"
            />
          </div>

          <div className="flex flex-col gap-2 sm:gap-3 mt-6 sm:mt-10">
            <a href="https://github.com/FlameGreat-1" target="_blank">
              <Image
                src="/assets/github-icon.svg"
                alt="GitHub"
                width={35}
                height={35}
                className="sm:w-[45px] hover:scale-110 transition-all"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/flamegreat/"
              target="_blank"
            >
              <Image
                src="/assets/linkedIn-icon.svg"
                alt="LinkedIn"
                width={35}
                height={35}
                className="sm:w-[45px] hover:scale-110 transition-all"
              />
            </a>
            <a href="mailto:softverse.com@gmail.com" target="_blank">
              <Image
                src="/assets/gmail-icon.svg"
                alt="Gmail"
                width={35}
                height={35}
                className="sm:w-[45px] hover:scale-110 transition-all"
              />
            </a>
            <a href="https://wa.me/+2348136872013" target="_blank">
              <Image
                src="/assets/whatsapp-icon.svg"
                alt="WhatsApp"
                width={35}
                height={35}
                className="sm:w-[45px] hover:scale-110 transition-all"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}