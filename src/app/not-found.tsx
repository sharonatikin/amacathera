// app/not-found.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-slate-100 to-blue-100 flex items-center justify-center px-6">
      
      {/* Subtle background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-100/20 rounded-full blur-2xl" />
      </div>

      <div
        className={`relative z-10 max-w-2xl w-full text-center transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Top Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-blue-100 text-blue-700 text-xs font-semibold tracking-widest uppercase mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Page Not Found
        </div>

        {/* 404 Large Text */}
        <div className="relative mb-6">
          <span className="text-[9rem] sm:text-[12rem] font-black text-blue-900/5 leading-none select-none absolute inset-0 flex items-center justify-center">
            404
          </span>
          <div className="relative py-8">
            {/* Molecule / Hydrogel SVG Icon */}
            <svg
              viewBox="0 0 120 120"
              className="w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Connecting lines */}
              <line x1="60" y1="60" x2="20" y2="30" stroke="#93C5FD" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="60" y1="60" x2="100" y2="30" stroke="#93C5FD" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="60" y1="60" x2="20" y2="90" stroke="#93C5FD" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="60" y1="60" x2="100" y2="90" stroke="#93C5FD" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="60" y1="60" x2="60" y2="15" stroke="#BFDBFE" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="60" y1="60" x2="60" y2="105" stroke="#BFDBFE" strokeWidth="2" strokeDasharray="4 2" />
              {/* Outer nodes */}
              <circle cx="20" cy="30" r="7" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
              <circle cx="100" cy="30" r="7" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
              <circle cx="20" cy="90" r="7" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
              <circle cx="100" cy="90" r="7" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
              <circle cx="60" cy="15" r="5" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1.5" />
              <circle cx="60" cy="105" r="5" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1.5" />
              {/* Center node */}
              <circle cx="60" cy="60" r="16" fill="#1E3A5F" />
              <circle cx="60" cy="60" r="10" fill="#2563EB" />
              <circle cx="60" cy="60" r="5" fill="white" opacity="0.9" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-3 leading-tight">
          This page is in development
        </h1>

        {/* Subtext */}
        <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-10">
          Just like our therapeutics, this feature is being carefully formulated. 
          Check back soon — great things take time.
        </p>

        {/* Progress bar */}
        <div className="max-w-xs mx-auto mb-10">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
            <span>In Progress</span>
            <span>Coming Soon</span>
          </div>
          <div className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000"
              style={{ width: mounted ? '65%' : '0%' }}
            />
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-900 text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-colors duration-200 shadow-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/contact-us"
            className="px-6 py-3 bg-white/70 backdrop-blur-sm text-blue-900 text-sm font-semibold rounded-xl border border-blue-100 hover:bg-white transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-12 text-xs text-slate-400 tracking-wide">
          AmacaThera · Transforming Therapeutics
        </p>
      </div>
    </div>
  );
}