"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  category: string;
  status: string;
  description: string;
  thumbnail: string;
  slug: string;
};

export default function ProjectCard({
  title,
  category,
  status,
  description,
  thumbnail,
  slug,
}: Props) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Thumbnail with Hover Overlay */}
      <Link href={`/projects/${slug}`} className="group relative w-full h-[250px] sm:h-[300px] overflow-hidden rounded-2xl block bg-[#1a1620]">
        <Image
          src={thumbnail}
          alt={`${title} thumbnail`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="px-6 py-3 bg-my-primary text-white font-bold rounded-full text-sm tracking-wide shadow-[0_0_30px_#C778DD] transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            VIEW CASE STUDY ➔
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-2 px-1">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-[20px] text-white">{title}</h3>
          <span className="px-2 py-0.5 bg-[#8b31ff] text-white text-[10px] font-bold tracking-wider rounded uppercase">
            {category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${status.toLowerCase() === 'active' ? 'bg-[#22c55e]' : 'bg-gray-400'}`}></div>
          <span className="text-gray-400 text-sm">{status}</span>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mt-1 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}