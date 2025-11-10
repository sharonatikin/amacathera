'use client';
import { pipelineData } from '@/const/pipeling';
import { ArrowRight, Check, ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Pipeline() {
  const [activeSlide, setActiveSlide] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const currentItem = pipelineData[activeSlide];

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
      ? (activeSlide + 1) % pipelineData.length
      : (activeSlide - 1 + pipelineData.length) % pipelineData.length;

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
    <div id='pipeline-section' className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 relative overflow-hidden">
      {/* Medical Vials Image on Right */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/pipeline.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-8 lg:px-16 py-16 right-20">
        {/* Pipeline Title */}
        <div className="max-w-7xl mx-auto mb-12">
          <h1 className="text-6xl lg:text-7xl font-bold text-[#2d5a7f]">
            Pipeline
          </h1>
        </div>

        {/* Pipeline Table with Navigation */}
        <div className="flex items-center w-full mb-16">
          {/* Left Arrow */}
          {/* <div>
            <button onClick={goToPrevSlide}>
              <ArrowLeft
                className="w-8 h-8 text-[#2d5a7f] hover:text-[#1e3a5f] cursor-pointer"
              />
            </button>
          </div> */}

          {/* Animated Content */}
          <div 
            ref={contentRef}
            className="flex-1"
          >
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-4 bg-[#003d6b] text-white">
                  <div className="px-8 py-6 font-bold text-lg border-r border-white/20">
                    Product / Platform
                  </div>
                  <div className="px-8 py-6 font-bold text-lg text-center border-r border-white/20">
                    Discovery
                  </div>
                  <div className="px-8 py-6 font-bold text-lg text-center border-r border-white/20">
                    Pre-Clinical
                  </div>
                  <div className="px-8 py-6 font-bold text-lg text-center">
                    Phase 1
                  </div>
                </div>

                {/* Table Row */}
                <div className="grid grid-cols-4 border-t border-gray-200">
                  {/* Product Info */}
                  <div className="px-8 py-8 border-r border-gray-200">
                    <div className=''>
                      <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                        {currentItem.product}
                        <span className='text-[#1e3a5f] ml-1 font-extralight text-xs'>/{currentItem.type}</span>
                      </h3>
                    </div>
                    <p className="text-[#1e3a5f] text-sm leading-relaxed">
                      {currentItem.description}
                    </p>
                  </div>

                  {/* Discovery */}
                  <div className="px-8 py-8 flex items-center justify-center border-r border-gray-200">
                    {currentItem.discovery && (
                      <div className="w-14 h-14 rounded-full bg-[#003d6b] flex items-center justify-center">
                        <Check className="w-8 h-8 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  {/* Pre-Clinical */}
                  <div className="px-8 py-8 flex items-center justify-center border-r border-gray-200">
                    {currentItem.preClinical && (
                      <div className="w-14 h-14 rounded-full bg-[#003d6b] flex items-center justify-center">
                        <Check className="w-8 h-8 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  {/* Phase 1 */}
                  <div className="px-8 py-8 flex items-center justify-center">
                    {currentItem.phase1 && (
                      <div className="w-14 h-14 rounded-full bg-[#003d6b] flex items-center justify-center">
                        <Check className="w-8 h-8 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          {/* <div>
            <button onClick={goToNextSlide}>
              <ArrowRight
                className="w-8 h-8 text-[#2d5a7f] hover:text-[#1e3a5f] cursor-pointer"
              />
            </button>
          </div> */}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-3">
          {pipelineData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? 'bg-[#003d6b] w-12'
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