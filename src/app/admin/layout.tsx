'use client';
import React, { useState } from 'react'
import { Users, BookOpen, Newspaper, LogOut, Home, Menu, X } from 'lucide-react';


export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Users, label: 'Users', active: false },
    { icon: BookOpen, label: 'Publications', active: false },
    { icon: Newspaper, label: 'News', active: false },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-[#0f3a66] to-[#1a4f7f] text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className=" border-b border-white/10">
          <div className="flex items-center justify-center">

            {sidebarOpen ? (
              <img src="/logos/Logo_White.png" className='w-26 h-26' alt="" />
            ) : (
              <div className="w-10 h-10 my-6 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold">AT</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${item.active
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10'
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-white/70 hover:bg-white/10 rounded-lg transition-all">
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
      {children}
    </div>

  )
}

