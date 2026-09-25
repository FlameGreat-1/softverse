"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, User, LayoutGrid, Briefcase, Calendar, Mail, Rocket, X, ChevronRight, FileText } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#about", label: "About", icon: User },
  { href: "/#projects", label: "Projects", icon: LayoutGrid },
  { href: "/#experience", label: "Experience", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/consultation", label: "Consult Me", badge: "Free", icon: Calendar },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const router = useRouter();
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  useEffect(() => {
    // If not on the home page, just use the pathname
    if (pathname !== "/") {
      setActiveSection(pathname);
      return;
    }

    const handleScroll = () => {
      const sections = ["about", "projects", "experience", "contact"];
      let current = "/"; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is scrolled into view (with offset for navbar)
          if (rect.top <= 200) { 
            current = `/#${section}`;
          }
        }
      }
      
      // Default to home if near the very top
      if (window.scrollY < 100) {
        current = "/";
      }

      setActiveSection(current);
    };

    handleScroll(); // initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

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
    
    const sectionId = href.includes("#") ? href.split("#")[1] : null;
    
    // If we are already on the home page, just scroll
    if (pathname === "/" && sectionId) {
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
      <nav className="absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 px-4 sm:px-8 py-3 flex items-center justify-between w-[90%] sm:w-[90%] lg:w-[75%] h-14 sm:h-16 rounded-full border border-white/20 bg-white/1 backdrop-blur-sm font-semibold shadow-[inset_1px_0.5px_2px_rgba(255,255,255,0.9)] text-white">
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
        <ul className="hidden md:flex gap-4 lg:gap-6 font-semibold text-[16px] lg:text-[17px]">
          {navLinks.map((link) => (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex items-center hover:text-my-primary transition-colors relative tracking-wide ${
                  activeSection === link.href ? "text-my-primary underline underline-offset-8 decoration-2" : ""
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="absolute -top-3 -right-6 bg-my-primary/20 text-my-primary text-[9px] px-1.5 py-0.5 rounded-sm uppercase font-bold border border-my-primary/30 shadow-[0_0_8px_rgba(199,121,221,0.2)]">
                    {link.badge}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Start Project Button inside Navbar */}
        <div className="hidden md:block">
          <Link 
            href="/start-project" 
            className="px-5 py-2 rounded-full border border-my-primary/50 bg-[#1a1523]/80 text-my-primary font-bold text-[13px] tracking-wide hover:bg-my-primary hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(199,121,221,0.3)] hover:shadow-[0_0_25px_rgba(199,121,221,0.6)] animate-pulse flex items-center gap-2 group"
          >
            START A PROJECT <span className="group-hover:translate-x-1 transition-transform">➔</span>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-white ml-auto"
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

      </nav>

      {/* Full-screen Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#0A0A0F] z-50 md:hidden flex flex-col transition-all duration-300 overflow-hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image src="/assets/softverse.svg" alt="Logo" width={50} height={50} className="w-[100px] h-auto" />
          </Link>
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-my-primary transition-colors p-2">
            <X className="w-8 h-8" />
          </button>
        </div>
        
        {/* Menu Items */}
        <ul className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href;
            return (
              <li key={link.href} className="border-b border-gray-800/60 last:border-0">
                <a
                  href={link.href}
                  className={`flex items-center py-5 transition-colors group ${isActive ? "text-my-primary" : "text-gray-300"}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <Icon className={`w-6 h-6 mr-4 transition-colors ${isActive ? "text-my-primary" : "text-gray-500 group-hover:text-white"}`} />
                  <span className="text-xl tracking-wide font-medium">{link.label}</span>
                  {link.badge && (
                    <span className="ml-3 bg-my-primary/20 text-my-primary text-[10px] px-2 py-0.5 rounded-sm uppercase font-bold border border-my-primary/30">
                      {link.badge}
                    </span>
                  )}
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-my-primary" />
                  </div>
                </a>
              </li>
            );
          })}
          <li className="mt-8 pb-8">
            <Link 
              href="/start-project"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center py-4 px-6 rounded-2xl border border-my-primary/50 bg-[#1a1523]/80 text-my-primary group transition-all duration-300 shadow-[0_0_15px_rgba(199,121,221,0.3)] hover:shadow-[0_0_25px_rgba(199,121,221,0.6)] animate-pulse"
            >
              <Rocket className="w-6 h-6 mr-3 group-hover:-translate-y-1 transition-transform" />
              <span className="text-lg font-bold tracking-wide uppercase">Start A Project</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
