'use client';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDo() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const cards = [
    {
      title: "Advanced Drug Delivery",
      description: "Our proprietary hydrogel depot system releases therapeutic agents at the target site for prolonged effect.",
    },
    {
      title: "Hard-to-Reach Targets",
      description: "From post-surgical pain to oncology and beyond — we tackle locations conventional delivery struggles to reach.",
    },
    {
      title: "Clinical Validation",
      description: "Moving rapidly from bench to bedside: GMP manufacturable, human safety data, multi-modal payloads.",
    },
    {
      title: "Collaboration & Partnership",
      description: "Open to strategic alliances, co-development programmes and licensing. Let's accelerate together.",
    }
  ];

  useEffect(() => {
    // Title animation with reverse
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

    // Cards stagger animation with reverse
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "back.out",
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Hover animations for each card
    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.set(card, { transformOrigin: "center center" });

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -12,
            boxShadow: "0 25px 50px rgba(0, 51, 102, 0.2)",
            duration: 0.4,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            duration: 0.4,
            ease: "power2.out",
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-300 via-slate-200 to-blue-200 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/whatwedo.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 py-16 px-8">
        {/* Title */}
        <h2 
          ref={titleRef}
          className="text-5xl font-bold text-[#003366] text-center mb-16"
        >
          What We Do
        </h2>

        {/* Cards Grid */}
        <div 
          ref={cardsContainerRef}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="bg-[#003366] text-white hover:text-[#003366] hover:bg-white rounded-2xl p-8 flex flex-col justify-between lg:h-96 shadow-lg hover:shadow-2xl transition-colors duration-300 cursor-pointer"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 leading-tight">
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed opacity-90">
                  {card.description}
                </p>
              </div>

              {/* <div className="mt-8 flex justify-start">
                <ArrowRight className="w-12 h-6" strokeWidth={2} />
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}