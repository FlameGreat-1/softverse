"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  title: string;
  subtitle: string;
  thumbnail: string;
  stack: string;
  liveUrl?: string;
  githubUrl?: string;
};

export default function ProjectCard({
  title,
  subtitle,
  thumbnail,
  stack,
  liveUrl,
  githubUrl,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 100; // Adjust this value as needed
  const shouldTruncate = subtitle.length > MAX_LENGTH;

  const displaySubtitle = shouldTruncate && !isExpanded 
    ? subtitle.slice(0, MAX_LENGTH) + "..."
    : subtitle;

  return (
    <div className="bg-[#0f0f12] border border-white/6 w-full h-[450px] overflow-hidden shadow-lg">
      {/* Thumbnail */}
      <div className="h-[40%] w-full bg-gradient-to-br from-[#1f1b22] to-[#2b232f] relative">
        <Image
          src={thumbnail}
          alt={`${title} thumbnail`}
          width={280}
          height={140}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-[55%]">
        <div 
          className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <p className="text-xs text-gray-400">{stack}</p>

          <h3 className="mt-2 font-mono text-[18px] font-semibold">{title}</h3>

          <p className="text-[12px] text-gray-400 mt-1">
            {displaySubtitle}
          </p>
          
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-my-primary text-[11px] mt-1 hover:underline"
            >
              {isExpanded ? "less" : "more"}
            </button>
          )}
        </div>

        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="flex gap-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white px-2 py-1 cursor-pointer hover:bg-white/10 transition"
              >
                Live ↔
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white px-2 py-1 cursor-pointer hover:bg-white/10 transition"
              >
                Github &gt;
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}