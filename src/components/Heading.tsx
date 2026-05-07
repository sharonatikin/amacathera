'use client';

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ArrowBigRightIcon, ArrowRight } from "lucide-react";
import { navItems } from "@/const";
import Search from "@/components/Search";

export default function Heading() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (label: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 100);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:pl-10 lg:pr-12 mx-auto w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/60 backdrop-blur-lg shadow-sm"
          : "bg-white/20 backdrop-blur-sm"
      }`}>
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <div
            className="w-24 h-16 sm:w-28 sm:h-18 md:w-32 md:h-20 lg:w-36 lg:h-22 sm:mt-3"
            style={{
              backgroundImage: 'url("/logos/Amaca_Thera_Logo.png")',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        </a>

        <div className="flex gap-3">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-8 items-center flex-1 ml-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.subtabs.length > 0 && handleMouseEnter(item.label)}
                onMouseLeave={() => item.subtabs.length > 0 && handleMouseLeave()}
              >
                {item.subtabs.length > 0 ? (
                  <button className="flex items-center gap-1 text-slate-600 hover:text-blue-900 font-medium transition-colors duration-200 whitespace-nowrap text-sm">
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        openDropdown === item.label ? "rotate-180 text-blue-700" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="text-slate-600 hover:text-blue-900 font-medium transition-colors duration-200 whitespace-nowrap text-sm"
                  >
                    {item.label}
                  </a>
                )}

                {/* Underline indicator */}
                {item.subtabs.length > 0 && (
                  <span className={`absolute -bottom-1 left-0 h-px bg-blue-700 transition-all duration-200 ${
                    openDropdown === item.label ? "w-full" : "w-0"
                  }`} />
                )}

                {/* Desktop Dropdown */}
                {item.subtabs.length > 0 && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50">
                    <div className="py-1.5">
                      {item.subtabs.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-slate-600 hover:text-blue-900 hover:bg-blue-50/80 transition-colors duration-150"
                        >
                          {sub.label}<ArrowRight className="w-3.5 h-3.5 text-blue-900 inline-block ml-1" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 ml-auto">
            <Search />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-blue-900 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-xl ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <span className="text-sm font-semibold text-slate-500 tracking-widest uppercase">
              Menu
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-slate-400 hover:text-blue-900 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Items */}
          <div className="flex flex-col flex-1 overflow-y-auto py-3">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.subtabs.length > 0 ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenMobileDropdown(
                          openMobileDropdown === item.label ? null : item.label
                        )
                      }
                      className="w-full flex items-center justify-between px-5 py-3 text-sm text-slate-600 hover:text-blue-900 font-medium transition-colors duration-150"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          openMobileDropdown === item.label ? "rotate-180 text-blue-700" : ""
                        }`}
                      />
                    </button>

                    {/* Mobile Subtabs */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      openMobileDropdown === item.label ? "max-h-96" : "max-h-0"
                    }`}>
                      <div className="bg-slate-50/80 border-y border-slate-100">
                        {item.subtabs.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-8 py-2.5 text-sm text-slate-500 hover:text-blue-900 hover:bg-blue-50/60 transition-colors duration-150"
                          >
                            {sub.label} <ArrowRight className="w-3.5 h-3.5 text-blue-900 inline-block ml-1" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-5 py-3 text-sm text-slate-600 hover:text-blue-900 font-medium transition-colors duration-150"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Footer */}
          <div className="px-5 py-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center tracking-wide">AmacaThera</p>
          </div>
        </div>
      </div>
    </>
  );
}