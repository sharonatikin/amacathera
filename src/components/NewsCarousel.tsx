'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { pressReleases } from '@/const';
import Link from 'next/link';

export default function NewsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play carousel
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeSlide]);

  const animateSlide = (direction: 'next' | 'prev') => {
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    const nextSlide = direction === 'next' 
      ? (activeSlide + 1) % pressReleases.length
      : (activeSlide - 1 + pressReleases.length) % pressReleases.length;

    // Animate out current content
    gsap.to(contentRef.current, {
      x: direction === 'next' ? -100 : 100,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActiveSlide(nextSlide);
        
        // Reset position off-screen (opposite side of exit)
        gsap.set(contentRef.current, {
          x: direction === 'next' ? 100 : -100,
          opacity: 0,
        });

        // Animate in new content
        gsap.to(contentRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            isAnimatingRef.current = false;
          }
        });
      }
    });
  };

  const goToNextSlide = () => {
    animateSlide('next');
  };

  const goToPrevSlide = () => {
    animateSlide('prev');
  };

  const goToSlide = (index: number) => {
    if (isAnimatingRef.current || index === activeSlide) return;
    
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    const direction = index > activeSlide ? 'next' : 'prev';
    isAnimatingRef.current = true;

    gsap.to(contentRef.current, {
      x: direction === 'next' ? -100 : 100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        setActiveSlide(index);
        
        gsap.set(contentRef.current, {
          x: direction === 'next' ? 100 : -100,
          opacity: 0,
        });

        gsap.to(contentRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            isAnimatingRef.current = false;
            
            autoPlayRef.current = setInterval(() => {
              goToNextSlide();
            }, 5000);
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen backdrop-blur-xs bg-white/10 w-full relative overflow-hidden">
      <div className="z-10 flex flex-col items-center  min-h-screen px-8 py-16">
        <h1 className="text-6xl lg:text-7xl font-bold text-[#1e3a5f] mb-20">
          News
        </h1>

        <div className="flex items-center w-full mb-10 overflow-hidden">
          <div>
            <button onClick={goToPrevSlide}>
              <ArrowLeft
                className="w-8 h-8 text-[#1e3a5f] hover:text-[#2d5a8f] cursor-pointer"
              />
            </button>
          </div>
          <div 
            ref={contentRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center rounded-3xl p-8 lg:p-12"
          >
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md bg-gray-300 h-64 rounded-3xl shadow-xl flex items-center justify-center">
                {/* <span className="text-gray-600">{pressReleases[activeSlide].image}</span> */}
                <img
                  src={`/images/news/${pressReleases[activeSlide].image}`}
                  alt={pressReleases[activeSlide].title}
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#1e3a5f] leading-tight">
                {pressReleases[activeSlide].title}
              </h2>
              <p className="text-[#1e3a5f] text-base leading-relaxed line-clamp-4">
                {pressReleases[activeSlide].summary}
              </p>
              <div className="flex items-center justify-between gap-3 mt-2">
                <button className='bg-[#1e3a5f] hover:bg-[#2d5a8f] text-white px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer'>
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div>
                  <span className="text-[#1e3a5f] mr-1">
                    {pressReleases[activeSlide].date}
                  </span>
                  <Link href={`/news/${pressReleases[activeSlide].id}`} className="text-[#1e3a5f] font-bold underline hover:text-[#2d5a8f] transition">
                    Press Release
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button onClick={goToNextSlide}>
              <ArrowRight
                className="w-8 h-8 text-[#1e3a5f] hover:text-[#2d5a8f] cursor-pointer"
              />
            </button>
          </div>
        </div>

        <div className="flex  items-center gap-2 lg:gap-4 w-[80vw] ">
          {pressReleases.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? 'bg-[#1e3a5f] w-12'
                  : 'bg-gray-300 w-8 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}