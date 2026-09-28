"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Slide = {
  src?: string;
  caption?: string;
  pdf?: string;       // path to PDF file in /public
  issuer?: string;    // certificate issuer name
};

type Props = {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
};

export default function Carousel({
  slides,
  autoPlay = true,
  autoPlayInterval = 3000,
  showIndicators = true,
  showArrows = true,
  className,
}: Props) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const imageIndex = ((page % slides.length) + slides.length) % slides.length;
  const timerRef = useRef<number | null>(null);
  const isPaused = useRef(false);

  // autoplay logic
  const startAutoPlay = () => {
    if (autoPlay && !timerRef.current && !isPaused.current) {
      timerRef.current = window.setInterval(() => {
        setPage(([p]) => [p + 1, 1]);
      }, autoPlayInterval);
    }
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [autoPlay, autoPlayInterval]);

  // swipe threshold
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;

  function paginate(newDirection: number) {
    setPage(([p]) => [p + newDirection, newDirection]);
  }

  function handleDragStart() {
    isPaused.current = true;
    stopAutoPlay();
  }

  function handleDragEnd(offset: number, velocity: number) {
    const swipe = swipePower(offset, velocity);
    if (swipe < -swipeConfidenceThreshold) paginate(1);
    else if (swipe > swipeConfidenceThreshold) paginate(-1);

    isPaused.current = false;
    startAutoPlay();
  }

  // strictly horizontal motion
  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
  };

  return (
    <div className="relative w-full select-none">
      <div
        className={`relative w-full overflow-hidden ${className || 'h-[250px] sm:h-[720px] rounded-md'}`}
        onMouseEnter={() => {
          isPaused.current = true;
          stopAutoPlay();
        }}
        onMouseLeave={() => {
          isPaused.current = false;
          startAutoPlay();
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.5 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDragEnd={(e, { offset, velocity }) =>
              handleDragEnd(offset.x, velocity.x)
            }
          >
            {/* Slide: image (with optional PDF open link in caption) */}
            <Image
              src={slides[imageIndex].src || ""}
              alt={slides[imageIndex].caption || `slide-${imageIndex}`}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-contain object-center w-full h-full bg-white"
              priority
              unoptimized={slides[imageIndex].src?.toLowerCase().endsWith('.gif')}
            />

            {/* Caption bar — shows for all slides, adds Open PDF if available */}
            {slides[imageIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/70 backdrop-blur-sm px-3 md:px-4 py-2 text-white text-[10px] md:text-xs z-10">
                <span className="font-semibold truncate">{slides[imageIndex].caption}</span>
                {slides[imageIndex].issuer && (
                  <span className="text-gray-300 truncate mx-2 hidden sm:inline">{slides[imageIndex].issuer}</span>
                )}
                {slides[imageIndex].pdf && (
                  <a
                    href={slides[imageIndex].pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 px-2 sm:px-3 py-1 bg-my-primary text-black text-[10px] sm:text-[11px] font-bold rounded-full hover:opacity-90 transition flex-shrink-0"
                  >
                    Open ↗
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      {showArrows && (
        <>
          <button
            aria-label="prev"
            onClick={() => {
              paginate(-1);
              startAutoPlay();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center"
          >
            ‹
          </button>
          <button
            aria-label="next"
            onClick={() => {
              paginate(1);
              startAutoPlay();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center"
          >
            ›
          </button>
        </>
      )}

      {/* Indicators — below the carousel, never overlapping */}
      {showIndicators && (
        <div className="flex gap-2 justify-center mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setPage([i, i > imageIndex ? 1 : -1]);
                startAutoPlay();
              }}
              className={`h-2 w-8 rounded-full transition-all ${
                i === imageIndex ? "bg-my-primary" : "bg-gray-600/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
