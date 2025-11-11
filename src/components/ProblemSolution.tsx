'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSolution() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const problemCardRef = useRef<HTMLDivElement>(null);
  const solutionCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation
    if (titleRef.current && containerRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    // Subtitle animation
    if (subtitleRef.current && containerRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    // Problem Card animation - slide from left
    if (problemCardRef.current && containerRef.current) {
      gsap.fromTo(
        problemCardRef.current,
        { opacity: 0, x: -80, rotateY: -10 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    // Solution Card animation - slide from right
    if (solutionCardRef.current && containerRef.current) {
      gsap.fromTo(
        solutionCardRef.current,
        { opacity: 0, x: 80, rotateY: 10 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    // Problem card hover animation
    const problemCard = problemCardRef.current;
    const handleProblemMouseEnter = () => {
      if (problemCard) {
        gsap.to(problemCard, {
          y: -10,
          boxShadow: "0 20px 40px rgba(0, 51, 102, 0.15)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const handleProblemMouseLeave = () => {
      if (problemCard) {
        gsap.to(problemCard, {
          y: 0,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    if (problemCard) {
      problemCard.addEventListener("mouseenter", handleProblemMouseEnter);
      problemCard.addEventListener("mouseleave", handleProblemMouseLeave);
    }

    // Solution card hover animation
    const solutionCard = solutionCardRef.current;
    const handleSolutionMouseEnter = () => {
      if (solutionCard) {
        gsap.to(solutionCard, {
          y: -10,
          boxShadow: "0 20px 40px rgba(0, 51, 102, 0.2)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const handleSolutionMouseLeave = () => {
      if (solutionCard) {
        gsap.to(solutionCard, {
          y: 0,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    if (solutionCard) {
      solutionCard.addEventListener("mouseenter", handleSolutionMouseEnter);
      solutionCard.addEventListener("mouseleave", handleSolutionMouseLeave);
    }

    // Parallax effect on scroll for cards
    if (problemCard && containerRef.current) {
      gsap.to(problemCard, {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.5,
          markers: false,
        },
      });
    }

    if (solutionCard && containerRef.current) {
      gsap.to(solutionCard, {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.5,
          markers: false,
        },
      });
    }

    // Cleanup
    return () => {
      if (problemCard) {
        problemCard.removeEventListener("mouseenter", handleProblemMouseEnter);
        problemCard.removeEventListener("mouseleave", handleProblemMouseLeave);
      }
      if (solutionCard) {
        solutionCard.removeEventListener("mouseenter", handleSolutionMouseEnter);
        solutionCard.removeEventListener("mouseleave", handleSolutionMouseLeave);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/problemsolution.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/30" />

      {/* Content */}
      <div 
        ref={containerRef}
        className="relative z-10 min-h-screen flex flex-col justify-between pt-40 md:pt-56 pb-10 px-8 lg:px-18"
      >
        {/* Title Section */}
        <div className="pl-10">
          <h2 
            ref={titleRef}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#003366] mb-2"
          >
            The Problem
          </h2>
          <h1 
            ref={subtitleRef}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#003366]"
          >
            + Our Solution
          </h1>
        </div>

        {/* Cards Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Problem Card */}
            <div 
              ref={problemCardRef}
              className="bg-[#B8D4E8] rounded-2xl p-8 lg:p-10 shadow-lg cursor-pointer transform will-change-transform"
              style={{ perspective: "1000px" }}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#003366] mb-6">
                Problem:
              </h3>
              <p className="text-[#003366] font-light text-base md:text-lg lg:text-lg leading-relaxed">
                Many therapies fail not for lack of potency but inability to deliver where needed — in right concentration, for enough time, with minimal systemic exposure.
              </p>
            </div>

            {/* Solution Card */}
            <div 
              ref={solutionCardRef}
              className="bg-[#003366] rounded-2xl p-8 lg:p-10 shadow-lg cursor-pointer transform will-change-transform"
              style={{ perspective: "1000px" }}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
                Solution:
              </h3>
              <p className="text-white font-extralight text-base md:text-lg lg:text-lg leading-relaxed">
                AmacaThera's AmacaGel™ platform addresses this by forming an injectable depot at the target site, achieving sustained, localized delivery of small molecules, biologics, enzymes or cells.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {/* <div className="flex justify-around items-center mt-12">
          <button className="flex items-center gap-3 text-[#003366] font-semibold text-lg hover:gap-2 transition-all duration-300 group">
            <ArrowLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" strokeWidth={2.5} />
            <span>Previous</span>
          </button>

          <button className="flex items-center gap-3 text-[#003366] font-semibold text-lg hover:gap-4 transition-all duration-300 group">
            <span>Next</span>
            <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
          </button>
        </div> */}
      </div>
    </div>
  );
}