'use client';

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/const";

// Sample navigation items

export default function Heading() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Close mobile menu when screen is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

    const scrollToPipeline = () => {
    const pipelineSection = document.getElementById('pipeline-section');
    if (pipelineSection) {
      pipelineSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:pl-10 lg:pr-40 mx-auto w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/40 backdrop-blur-lg shadow-md" 
          : "bg-white/30 backdrop-blur-0"
      }`}>
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <div
            className="w-24 h-16 sm:w-28 sm:h-18 md:w-32 md:h-20 lg:w-36 lg:h-22 mt-2 sm:mt-3 lg:mt-4"
            style={{
              backgroundImage: 'url("/logos/Amaca_Thera_Logo_PNG.png")',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-10 items-center">
          {navItems.map((item) => (
            <a
              href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
              key={item}
              className="text-slate-700 hover:text-blue-900 font-medium transition"
            >
              {item}
            </a>
          ))}
        </div>


        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-blue-900 transition"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="text-lg font-semibold text-slate-700">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-slate-700 hover:text-blue-900 transition"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex flex-col p-4 space-y-1">
            {navItems.map((item) => (
              <a
                href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                key={item}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-slate-700 hover:text-blue-900 hover:bg-blue-50 font-medium transition rounded-lg"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}