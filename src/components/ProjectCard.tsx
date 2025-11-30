"use client";

import Image from "next/image";

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
        <div>
          <p className="text-xs text-gray-400">{stack}</p>

          <h3 className="mt-2 font-mono text-[18px] font-semibold">{title}</h3>

          <p className="text-[12px] text-gray-400 mt-1">{subtitle}</p>
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
