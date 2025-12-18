'use client';
import React, { useState } from 'react';
import { Users, BookOpen, Newspaper, LogOut, Home, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/admin', active: false },
    { icon: Users, label: 'Users', href: '/admin/users', active: false },
    { icon: BookOpen, label: 'Publications', href: '/admin/publications', active: false },
    { icon: Newspaper, label: 'News', href: '/admin/news', active: false },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin' || pathname === '/admin/';
    }
    return pathname?.startsWith(href);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-[#0f3a66] to-[#1a4f7f] text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center justify-center">
            {sidebarOpen ? (
              <div className="text-xl font-bold">AT</div>
            ) : (
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold">AT</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-white/20 text-white shadow-md'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-white/70 hover:bg-white/10 rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <div className="p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center py-2 text-white/70 hover:text-white transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-[#0f3a66]">Welcome Back!</h1>
        </div>
        {children}
      </div>
    </div>
  );
}