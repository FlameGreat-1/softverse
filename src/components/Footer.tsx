"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-transparent border-t border-white/5 pt-24 pb-12 px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Massive CTA */}
        <div className="flex justify-center mb-32">
          <Link href="/consultation" className="group flex items-center gap-4 hover:opacity-80 transition-opacity">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-my-primary to-purple-400">
              Let's Work
            </h1>
            <span className="text-5xl md:text-7xl lg:text-8xl text-my-primary group-hover:translate-x-4 transition-transform duration-300">
              ➔
            </span>
          </Link>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-24">
          
          {/* Brand & Bio */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-black text-white tracking-tight mb-6">EMMANUEL</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Full-Stack Engineer harnessing AI, architecture, and code to rapidly deliver enterprise-grade global solutions.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/+2348136872013" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#1A1A24] flex items-center justify-center hover:bg-my-primary hover:scale-110 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6 object-contain" />
              </a>
              <a href="https://github.com/FlameGreat-1" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#1A1A24] flex items-center justify-center hover:bg-my-primary hover:scale-110 transition-all">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" className="w-6 h-6 object-contain filter invert" />
              </a>
              <a href="https://www.linkedin.com/in/flamegreat/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#1A1A24] flex items-center justify-center hover:bg-my-primary hover:scale-110 transition-all">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="w-6 h-6 object-contain" />
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#1A1A24] flex items-center justify-center hover:bg-my-primary hover:scale-110 transition-all">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg" alt="Facebook" className="w-6 h-6 object-contain" />
              </a>
            </div>
          </div>

          {/* Pages */}
          <div className="flex flex-col gap-4 lg:ml-auto">
            <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-2">Pages</h3>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Me</Link>
            <Link href="/#projects" className="text-gray-400 hover:text-white transition-colors text-sm">Projects</Link>
            <Link href="/#experience" className="text-gray-400 hover:text-white transition-colors text-sm">Experience</Link>
            <Link href="/consultation" className="text-gray-400 hover:text-white transition-colors text-sm">Consultation</Link>
          </div>

          {/* Learn */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-2">Learn</h3>
            <Link href="https://github.com/FlameGreat-1" target="_blank" className="text-gray-400 hover:text-white transition-colors text-sm group flex items-center gap-1">
              Source Code <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/consultation" className="text-gray-400 hover:text-white transition-colors text-sm group flex items-center gap-1">
              Consult Me <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="https://www.linkedin.com/in/flamegreat/" target="_blank" className="text-gray-400 hover:text-white transition-colors text-sm group flex items-center gap-1">
              LinkedIn <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Downloads */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-2">Downloads</h3>
            <Link href="/consultation" className="text-gray-400 hover:text-white transition-colors text-sm group flex items-center gap-1">
              Corporate Profile <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/Emmanuel_CV.pdf" target="_blank" className="text-gray-400 hover:text-white transition-colors text-sm">
              CV / Résumé
            </Link>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-2">Connect</h3>
            <Link href="https://www.linkedin.com/in/flamegreat/" target="_blank" className="text-gray-400 hover:text-white transition-colors text-sm group flex items-center gap-1">
              LinkedIn <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="https://www.facebook.com/" target="_blank" className="text-gray-400 hover:text-white transition-colors text-sm group flex items-center gap-1">
              Facebook <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="https://wa.me/+2348136872013" target="_blank" className="text-gray-400 hover:text-white transition-colors text-sm group flex items-center gap-1">
              WhatsApp <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="https://github.com/FlameGreat-1" target="_blank" className="text-gray-400 hover:text-white transition-colors text-sm group flex items-center gap-1">
              GitHub <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <p className="text-gray-500 text-xs mb-4 md:mb-0">
            © 2024-2026 Emmanuel U. Iziogo. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 bg-my-primary rounded-full flex items-center justify-center text-white hover:bg-[#a65abf] transition-colors shadow-[0_0_20px_#C778DD55]"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
