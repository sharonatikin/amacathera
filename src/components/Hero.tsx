'use client';
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const mobileImageRef = useRef<HTMLDivElement | null>(null);
  const mobileContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Desktop animations
    if (window.innerWidth >= 768) {
      const tl = gsap.timeline();

      // Fade in and slide up heading
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0
      );

      // Fade in and slide up description
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        0.2
      );

      // Stagger button animations
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 15, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out", stagger: 0.15 },
          0.35
        );
      }

      // Subtle parallax on scroll
      const handleScroll = () => {
        if (heroRef.current) {
          gsap.to(heroRef.current, {
            backgroundPosition: `center ${window.scrollY * 0.5}px`,
            duration: 0.1,
            overwrite: "auto"
          });
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // Mobile animations
      const mobileTimeline = gsap.timeline();

      // Image slides down from top
      mobileTimeline.fromTo(
        mobileImageRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        0
      );

      // Content slides up from bottom
      mobileTimeline.fromTo(
        mobileContentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        0.2
      );

      // Stagger mobile button animations
      if (mobileContentRef.current) {
        mobileTimeline.fromTo(
          mobileContentRef.current.querySelectorAll("button"),
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out", stagger: 0.1 },
          0.4
        );
      }
    }
  }, []);

  const scrollToPipeline = () => {
    const pipelineSection = document.getElementById('pipeline-section');
    if (pipelineSection) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: pipelineSection, offsetY: 80 },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <div ref={heroRef} className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-slate-100 to-blue-100 relative overflow-hidden">
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen">
        <div 
          ref={mobileImageRef}
          className="w-full h-[60vh] bg-left bg-cover bg-center relative"
          style={{
            backgroundImage: 'url(/images/Photo_Landing.png)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50"></div>
        </div>

        <div ref={mobileContentRef} className="flex-1 bg-slate-50 px-4 sm:px-6 py-8  flex flex-col justify-center">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#003260] leading-tight">
              Pioneering next-generation tunable hydrogel solutions for precise, sustained drug delivery
            </h1>
            
            <p className="text-base text-slate-700 leading-relaxed">
              AmacaThera’s clinically validated hydrogel drug delivery platform seamlessly integrates two well-established, biocompatible polymers, hyaluronic acid and methylcellulose, into a proprietary formulation. This innovative injectable hydrogel enables precise, localized, and sustained delivery of therapeutics, ensuring long-acting release exactly where it is needed. The platform is broadly compatible with a diverse array of therapeutic agents, including small molecules, biologics, enzymes, and cells. Its tunability allows for the fine adjustment of drug release parameters, such as rate, duration, and timing tailored to the unique requirements of each clinical application.
            </p>
            
            <div className="space-y-3 pt-4">
              <button className="w-full bg-[#003260] hover:bg-[#004a8f] text-white font-semibold py-3.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                Click Here For Details
              </button>
              <button className="w-full bg-white hover:bg-slate-50 text-[#003260] font-semibold py-3.5 rounded-lg border-2 border-[#003260] transition-all duration-300 transform hover:scale-105">
                View Clinical Pipeline
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div 
        className="absolute md:block hidden inset-0"
        style={{
          backgroundImage: 'url("/images/Photo_Landing.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center left',
        }}
      />

      <div className="relative md:block hidden z-10">
        <div className="min-h-screen w-full px-6 md:px-8 lg:px-14 py-12 md:py-20 flex items-center justify-end">
          <div className="w-full md:w-1/2 lg:w-6/12 flex flex-col gap-6 md:gap-8">
            <div ref={headingRef}>
              <h1 className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 mb-3 md:mb-4 leading-tight ${montserrat.className}`}>
                Pioneering next-generation tunable hydrogel solutions for precise, sustained drug delivery
              </h1>
            </div>

            <p ref={descRef} className="text-sm md:text-base lg:text-lg text-slate-700 leading-relaxed">
              AmacaThera's clinically validated hydrogel drug delivery platform seamlessly integrates two well-established, biocompatible polymers, hyaluronic acid and methyl cellulose, into a proprietary formulation. This innovative injectable hydrogel enables precise, localized, and sustained delivery of therapeutics, ensuring long-acting release exactly where it is needed. The platform is broadly compatible with a diverse array of therapeutic agents, including small molecules, biologics, enzymes, and cells. Its tunability allows for the fine adjustment of drug release parameters, such as rate, duration, and timing tailored to the unique requirements of each clinical application.
            </p>

            <div ref={buttonsRef} className="flex flex-col md:flex-row gap-4 pt-4">
              <Link href={'/hydrogel-platform'} className="px-8 flex md:px-12 lg:px-16 py-3 bg-blue-900 text-white font-semibold rounded hover:bg-blue-800 transition items-center shadow-lg text-center hover:shadow-xl transform hover:scale-105 duration-300">
                Explore Our Technology
              </Link>
              <button onClick={scrollToPipeline} className="px-8 md:px-12 lg:px-16 py-3 border-2 border-blue-900 text-blue-900 font-semibold rounded hover:bg-blue-50 transition text-center transform hover:scale-105 duration-300">
                View Clinical Pipeline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}