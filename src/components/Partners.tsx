'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Partners() {
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
        duration: 30,
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
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/partners.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-16">
        {/* Title Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1e3a5f] mb-4"
          >
            Partners
          </h1>
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl lg:text-2xl text-[#1e3a5f] font-normal"
          >
            Partnerships foster collaboration at the highest level.
          </p>
        </div>

        {/* Infinite Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="relative w-full overflow-hidden rounded-2xl py-8 md:py-12"
        >
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-gray-100 via-gray-100 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-gray-100 via-gray-100 to-transparent z-10 pointer-events-none" />
          
          <div 
            ref={scrollContentRef}
            className="flex gap-12 md:gap-16 w-max"
            style={{ willChange: "transform" }}
          >
            {[...images, ...images].map((src, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center h-24 md:h-28 w-40 md:w-56 px-4 transition-all duration-300 hover:scale-110 hover:brightness-110"
              >
                <Image
                  src={src}
                  alt={`Partner ${(index % images.length) + 1}`}
                  className="h-full max-w-full object-contain filter drop-shadow-sm"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-100 via-gray-100/50 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}