'use client';
import { ArrowBigRight, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function TechnologyHighlights() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const highlights = [
    {
      title: "Injectable Depot",
      description: "Our shear-thinning hydrogel can be delivered via standard syringe and sets into a depot at body temperature.",
      image: "/icons/icon1.png"
    },
    {
      title: "Broad Payload Compatibility",
      description: "From small molecules to biologics, stem cells to enzymes — our platform accommodates varied therapeutic modalities.",
      image: "/icons/icon4.png"
    },
    {
      title: "Advanced Drug Delivery",
      description: "Designed to access anatomical areas like incision sites, brain/ eye tissue and other underserved locations.",
      image: "/icons/icon3.png"
    },
    {
      title: "Strong IP & GMP Readiness",
      description: "A robust IP portfolio and manufactured at GMP-scale sets us apart.",
      image: "/icons/icon2.png"
    }
  ];

  useEffect(() => {
    // Check if screen is mobile
    const isMobile = window.innerWidth < 768;

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
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

    // Cards stagger animation with scale and rotation
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 60, scale: 0.85, rotationY: -15 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out",
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 70%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Individual card hover animations
    cardsRef.current.forEach((card, index) => {
      if (card) {
        // 3D perspective
        gsap.set(card, { transformOrigin: "center center", transformStyle: "preserve-3d" });

        // Hover in
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -15,
            scale: 1.05,
            boxShadow: "0 30px 60px rgba(0, 61, 107, 0.25)",
            duration: 0.4,
            ease: "power2.out",
          });

          // Stagger icon animation on hover
          const icon = card.querySelector("img");
          if (icon) {
            gsap.to(icon, {
              scale: 1.15,
              rotation: 5,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        });

        // Hover out
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            duration: 0.4,
            ease: "power2.out",
          });

          const icon = card.querySelector("img");
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        });
      }
    });

    // Floating animation on scroll - only on desktop
    if (!isMobile) {
      cardsRef.current.forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -20 : 20,
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            markers: false,
          },
        });
      });
    }

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-slate-100 to-gray-100 relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10 px-8 py-20">
        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#003d6b] text-center mb-16 md:mb-20"
        >
          Platform | Technology Highlights
        </h1>

        {/* Cards Grid */}
        <div 
          ref={cardsContainerRef}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {highlights.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="bg-[#003d6b] group rounded-3xl p-8 flex flex-col items-center text-center min-h-[500px] shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform will-change-transform"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Icon */}
              <div className="mb-8 mt-4 transform will-change-transform">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  className="transition-transform duration-300"
                />
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 leading-tight">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8 flex-grow">
                {item.description}
              </p>

              {/* Arrow */}
              {/* <div className="mt-auto">
                <ArrowRight className="w-12 h-6 text-white" strokeWidth={2} />
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}