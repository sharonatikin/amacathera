'use client';

import { navItems } from "@/const";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Heading() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 flex items-center justify-between pr-40 pl-10 mx-auto w-full transition-all duration-300 ${
      isScrolled 
        ? "bg-white/0 backdrop-blur-lg shadow-md" 
        : "bg-white/0 backdrop-blur-0"
    }`}>
      <div
        className="w-36 h-22 mt-4"
        style={{
          backgroundImage: 'url("/logos/Amaca_Thera_Logo_PNG.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="flex gap-10 items-center">
        {navItems.map(
          (item) => (
            <Link
              href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
              key={item}
              className="text-slate-700 hover:text-blue-900 font-medium transition"
            >
              {item}
            </Link>
          )
        )}
      </div>
    </nav>
  );
}