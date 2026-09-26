"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, PenTool, LogOut, Settings, Calendar, Menu, X, Mail } from "lucide-react";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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

      <aside className={`min-h-screen bg-[#0b090f] border-r border-white/10 flex flex-col fixed md:sticky top-0 z-50 transition-all duration-300 ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 w-64'} ${isCollapsed ? 'md:w-20' : 'md:w-64'}`}>
        <div className={`p-6 border-b border-white/10 flex items-center ${isCollapsed ? 'md:justify-center md:p-4 justify-between' : 'justify-between'}`}>
          <Link href="/" className={`text-xl font-bold text-white tracking-wider truncate ${isCollapsed ? 'md:hidden' : ''}`}>
            <span className="text-my-primary">FLAMO</span> CMS
          </Link>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="hidden md:flex text-gray-400 hover:text-white ml-auto font-mono font-bold tracking-widest text-lg"
          >
            &lt;&gt;
          </button>
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
              className={`flex items-center gap-3 py-3 rounded-xl transition-all font-medium text-sm ${
                isCollapsed ? 'md:justify-center md:px-0 px-4' : 'px-4'
              } ${
                isActive 
                  ? "bg-my-primary text-black shadow-[0_0_15px_rgba(199,120,221,0.2)]" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              title={isCollapsed ? link.label : undefined}
            >
              {link.icon}
              <span className={isCollapsed ? 'md:hidden' : ''}>{link.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut()}
          className={`flex items-center gap-3 py-3 w-full text-left rounded-xl transition-all font-medium text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 ${
            isCollapsed ? 'md:justify-center md:px-0 px-4' : 'px-4'
          }`}
          title={isCollapsed ? "Sign Out" : undefined}
        >
          <LogOut size={18} />
          <span className={isCollapsed ? 'md:hidden' : ''}>Sign Out</span>
        </button>
      </div>
    </aside>
    </>
  );
}
