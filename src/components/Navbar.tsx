"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "home" },
  { href: "/#about", label: "about" },
  { href: "/#projects", label: "projects" },
  { href: "/#experience", label: "experience" },
  { href: "/#contact", label: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href === "/") {
      router.push("/");
      return;
    }
    
    const sectionId = href.split("#")[1];
    
    // If we are already on the home page, just scroll
    if (pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // If we are on another page, navigate to home with the hash
      router.push(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 px-4 sm:px-8 py-3 flex items-center justify-between w-[90%] sm:w-[70%] lg:w-[55%] h-14 sm:h-16 rounded-full border border-white/20 bg-white/1 backdrop-blur-sm font-semibold shadow-[inset_1px_0.5px_2px_rgba(255,255,255,0.9)] text-white">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/assets/softverse.svg"
            alt="Softverse Logo"
            width={35}
            height={35}
            className="sm:w-[75px] h-auto"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-3 lg:gap-4 font-semibold text-[14px]">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center hover:underline hover:text-my-primary transition-colors"
              >
                <span className="text-my-primary text-[16px] lg:text-[18px] mr-1">
                  #
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Mobile dropdown */}
        <ul
          className={`absolute top-16 right-0 w-full md:hidden bg-[#0f0f12] border border-my-primary/40 backdrop-blur-md rounded-xl p-4 flex flex-col gap-4 font-semibold transition-all duration-300 overflow-hidden shadow-2xl ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="flex items-center hover:underline hover:text-my-primary"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <span className="text-my-primary text-[18px] mr-1">#</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
