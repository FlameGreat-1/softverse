"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "Emmanuel is the ultimate engineer you want to have on your team. I am always impressed with the depth and level of quality he produces. He saves us loads of time on iterations. It's just amazing how he makes complex backend architecture look easy.",
    name: "Chris Anthony",
    title: "Founder & CEO, JTNC GROUP, U.S.A",
    avatar: "/images/avatar-Chris.webp",
  },
  {
    text: "We have been working with Emmanuel and I'll tell you what, he has an incredible talent for blending technical expertise with product strategy. His systems are not just robust but also scalable. He worked magic on our infrastructure, and the results blew us away.",
    name: "Emmanuel Chibuike",
    title: "Founder, ESQ1 Tech, Nigeria",
    avatar: "/images/Emma.avif",
  },
  {
    text: "Emmanuel really gets it. His applications aren't just highly performant, they're built to scale. He understands system architecture like no one else, and it shows in the uptime and speed. Our platform has never been more stable. Plus, he's just a great guy to work with.",
    name: "Marie Christ",
    title: "Co-Founder BuildHive, AUSTRALIA",
    avatar: "/images/avatar-Nifemi.avif",
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const floaterRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: floaterRef,
    offset: ["start end", "end start"],
  });

  // Zoom out (get bigger) when scrolling down, zoom in (get smaller) when scrolling up
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -150]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section ref={containerRef} className="max-w-6xl mx-auto px-6 py-24 md:py-32 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        
        {/* Left Side: Titles and Floater */}
        <div className="flex flex-col items-start relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-transparent mb-8">
            <span className="text-sm font-semibold tracking-wide">Testimonials</span>
            <span>🏅</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            What people say.
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-my-primary mb-12">
            About me.
          </h2>

          <div className="w-full flex justify-center lg:justify-start mt-8 relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80 z-10 -ml-4 lg:-ml-8">
              <Image 
                src="/images/testimonial-emoji.png" 
                alt="Testimonial Emoji" 
                fill 
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Testimonial Carousel */}
        <div className="flex flex-col relative z-20 mt-16 lg:mt-0 pb-32">
          {/* Animated Background Floater */}
          <motion.div 
            ref={floaterRef}
            style={{ scale, opacity, y }}
            className="absolute -bottom-40 left-0 right-0 mx-auto w-[80%] h-64 md:h-[24rem] z-0 pointer-events-none"
          >
            <Image 
              src="/images/floater.png" 
              alt="Design Elements" 
              fill 
              className="object-contain"
            />
          </motion.div>

          <div className="mb-6 relative z-10">
            <Image 
              src="/images/quotes.png" 
              alt="Quotes" 
              width={60} 
              height={60} 
              className="opacity-90"
            />
          </div>

          <div className="min-h-[250px] relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-8"
              >
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                  {testimonials[currentIndex].text}
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-800">
                    <Image 
                      src={testimonials[currentIndex].avatar} 
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg">
                      {testimonials[currentIndex].name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {testimonials[currentIndex].title}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 mt-12 relative z-10">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx 
                      ? "w-6 bg-my-primary" 
                      : "w-2 bg-gray-700 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
