'use client';
// components/about/CollaborationsPartnering.tsx
import { Mail } from 'lucide-react';
import Partners from '../Partners';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);



const CollaborationsPartnering = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  
  const images = [
    "/logos/Ontario Bio.png",
    "/logos/Toronto.png",
    "/logos/UTEST.png",
    "/logos/Venture Labs.png",
    "/logos/CREATIVE.png",
    "/logos/pacira.png"
  ];
  
  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }
  
    // Subtitle animation
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }
  
    // Scroll container fade in
    if (scrollContainerRef.current) {
      gsap.fromTo(
        scrollContainerRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "back.out",
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
  
      // Parallax effect on scroll
      gsap.to(scrollContainerRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          markers: false,
        },
      });
    }
  
    // Infinite scroll animation with GSAP
    const scrollContent = scrollContentRef.current;
    if (scrollContent) {
      const scrollWidth = scrollContent.scrollWidth / 2; // Half because we duplicated the content
      
      const scrollAnimation = gsap.to(scrollContent, {
        x: -scrollWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
  
      // Pause on hover
      const handleMouseEnter = () => {
        scrollAnimation.pause();
      };
  
      const handleMouseLeave = () => {
        scrollAnimation.resume();
      };
  
      // Pause on touch for mobile
      const handleTouchStart = () => {
        scrollAnimation.pause();
      };
  
      const handleTouchEnd = () => {
        scrollAnimation.resume();
      };
  
      scrollContent.addEventListener("mouseenter", handleMouseEnter);
      scrollContent.addEventListener("mouseleave", handleMouseLeave);
      scrollContent.addEventListener("touchstart", handleTouchStart);
      scrollContent.addEventListener("touchend", handleTouchEnd);
  
      // Cleanup event listeners
      return () => {
        scrollContent.removeEventListener("mouseenter", handleMouseEnter);
        scrollContent.removeEventListener("mouseleave", handleMouseLeave);
        scrollContent.removeEventListener("touchstart", handleTouchStart);
        scrollContent.removeEventListener("touchend", handleTouchEnd);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  return (
    <section id='collaborations-and-partnering' className="w-full bg-[#0d2a4e] px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20">

      {/* Section Header */}
      <div className="mb-8 sm:mb-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white tracking-tight leading-none mb-3">
          Collaborations and Partnering
        </h2>
        <p className="text-white/60 text-sm sm:text-base font-light">
          Partnering to elevate therapeutics with localized, controlled delivery
        </p>
      </div>

      {/* Description Card */}
      <div className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 sm:px-10 py-8 sm:py-10 mb-6 sm:mb-8 space-y-5">
        <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed">
          AmacaThera believes partnerships are essential to unlocking the full potential of innovative therapeutics. The Company&apos;s
          transformative hydrogel drug delivery platform provides precise, localized, and sustained drug delivery in an easy-to-administer
          format across a wide range of therapeutic areas.
        </p>
        <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed">
          AmacaThera collaborates with pharmaceutical companies to enhance existing and emerging drug candidates, combining its
          proprietary hydrogel platform with next-generation therapeutics to accelerate development timelines and expand therapeutic
          potential.
        </p>
        <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed">
          By providing flexible, tunable release profiles and a scalable manufacturing process, AmacaThera enables partners to bring
          transformative therapies to patients worldwide with reduced risk and greater efficiency.
        </p>
      </div>

      {/* Partner Cards */}
      <div ref={scrollContentRef} className="flex flex gap-12 md:gap-16 w-max overflow-hidden py-4">
        {[...images,...images].map((partner, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-amber-50 border border-white/10 rounded-2xl flex items-center justify-center h-24 md:h-28 w-40 md:w-56 px-4 transition-all duration-300 hover:scale-110 hover:brightness-110"
          >
              <img
              alt={`Partner ${(index % images.length) + 1}`}
                src={partner}
                className="max-h-10 object-contain"
              />
          </div>
        ))}
      </div>
      {/* Contact Card */}
      <div className="w-full rounded-2xl mt-10 border border-white/10 bg-white/5 px-6 sm:px-10 py-8 sm:py-10 flex flex-col items-center gap-5">
        <p className="text-white/70 text-sm sm:text-base font-light text-center">
          For partnership enquiries and opportunities with AmacaThera, reach out to us at
        </p>
        <a
          href="mailto:info@amacathera.com"
          className="inline-flex items-center gap-2.5 px-6 py-3 bg-white rounded-full text-[#0d2a4e] text-sm font-medium hover:bg-white/90 transition-colors duration-200"
        >
          <Mail className="w-4 h-4 flex-shrink-0" />
          info@amacathera.com
        </a>
      </div>

    </section>
  );
};

export default CollaborationsPartnering;