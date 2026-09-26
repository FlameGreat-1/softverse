"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, PenTool, LogOut, Settings, Calendar, Menu, X, Mail } from "lucide-react";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname === "/admin/login") return null;

  const links = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { href: "/admin/requests", label: "Requests", icon: <Mail size={18} /> },
    { href: "/admin/new", label: "New Post", icon: <PenTool size={18} /> },
    { href: "/admin/scheduled", label: "Scheduled", icon: <Calendar size={18} /> },
    { href: "/admin/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-6 right-6 z-40 p-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`w-64 min-h-screen bg-[#0b090f] border-r border-white/10 flex flex-col fixed md:sticky top-0 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white tracking-wider">
            <span className="text-my-primary">FLAMO</span> CMS
          </Link>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
      
      <div className="flex-1 py-6 px-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                isActive 
                  ? "bg-my-primary text-black shadow-[0_0_15px_rgba(199,120,221,0.2)]" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl transition-all font-medium text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
    </>
  );
}
