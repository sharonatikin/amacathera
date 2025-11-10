'use client';
import { pipelineData } from '@/const/pipeling';
import { ArrowRight, Check, ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';



export default function Pipeline() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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

  const goToNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % pipelineData.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveSlide((prev) => (prev - 1 + pipelineData.length) % pipelineData.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeSlide) return;
    
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    setIsAnimating(true);
    setTimeout(() => {
      setActiveSlide(index);
      setIsAnimating(false);
      
      autoPlayRef.current = setInterval(() => {
        goToNextSlide();
      }, 5000);
    }, 300);
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
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-14 md:py-16 lg:right-20 ">
        {/* Pipeline Title */}
        <div className="max-w-7xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#2d5a7f]">
            Pipeline
          </h1>
        </div>

        {/* Pipeline Table with Navigation */}
        <div className="flex items-center w-full mb-12 sm:mb-14 md:mb-16">
          {/* Animated Content */}
          <div 
            className={`flex-1 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          >
            <div className="max-w-5xl mx-auto">
              <div className="bg-white max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
                {/* Desktop Table View (hidden on mobile) */}
                <div className="hidden md:block">
                  {/* Table Header */}
                  <div className="grid grid-cols-5 bg-[#003d6b] text-white">
                    <div className="px-4 col-span-2 lg:px-6 py-4 lg:py-5 font-bold text-sm lg:text-base border-r border-white/20">
                      Product / Platform
                    </div>
                    <div className="px-4 lg:px-6 py-4 lg:py-5 font-bold text-sm lg:text-base text-center border-r border-white/20">
                      Discovery
                    </div>
                    <div className="px-4 lg:px-6 py-4 lg:py-5 font-bold text-sm lg:text-base text-center border-r border-white/20">
                      Pre-Clinical
                    </div>
                    <div className="px-4 lg:px-6 py-4 lg:py-5 font-bold text-sm lg:text-base text-center">
                      Phase 1
                    </div>
                  </div>

                  {/* Table Row */}
                  <div className="grid grid-cols-5 border-t border-gray-200">
                    {/* Product Info */}
                    <div className="px-4 col-span-2 lg:px-6 py-5 lg:py-6 border-r border-gray-200">
                      <div>
                        <h3 className="text-base lg:text-lg font-bold text-[#1e3a5f] mb-2">
                          {currentItem.product}
                          <span className='text-[#1e3a5f] ml-1 font-extralight text-xs'>/{currentItem.type}</span>
                        </h3>
                      </div>
                      <p className="text-[#1e3a5f] text-xs lg:text-sm leading-relaxed">
                        {currentItem.description}
                      </p>
                    </div>

                    {/* Discovery */}
                    <div className="px-4 lg:px-6 py-5 lg:py-6 flex items-center justify-center border-r border-gray-200">
                      {currentItem.discovery && (
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#003d6b] flex items-center justify-center">
                          <Check className="w-6 h-6 lg:w-7 lg:h-7 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    {/* Pre-Clinical */}
                    <div className="px-4 lg:px-6 py-5 lg:py-6 flex items-center justify-center border-r border-gray-200">
                      {currentItem.preClinical && (
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#003d6b] flex items-center justify-center">
                          <Check className="w-6 h-6 lg:w-7 lg:h-7 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    {/* Phase 1 */}
                    <div className="px-4 lg:px-6 py-5 lg:py-6 flex items-center justify-center">
                      {currentItem.phase1 && (
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#003d6b] flex items-center justify-center">
                          <Check className="w-6 h-6 lg:w-7 lg:h-7 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden">
                  {/* Header */}
                  <div className="bg-[#003d6b] text-white px-6 py-4">
                    <h3 className="text-lg font-bold">
                      {currentItem.product}
                      <span className='text-white ml-1 font-extralight text-xs'>/{currentItem.type}</span>
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    <p className="text-[#1e3a5f] text-sm leading-relaxed">
                      {currentItem.description}
                    </p>

                    {/* Stages */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <span className="text-[#1e3a5f] font-semibold">Discovery</span>
                        {currentItem.discovery && (
                          <div className="w-10 h-10 rounded-full bg-[#003d6b] flex items-center justify-center">
                            <Check className="w-6 h-6 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <span className="text-[#1e3a5f] font-semibold">Pre-Clinical</span>
                        {currentItem.preClinical && (
                          <div className="w-10 h-10 rounded-full bg-[#003d6b] flex items-center justify-center">
                            <Check className="w-6 h-6 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <span className="text-[#1e3a5f] font-semibold">Phase 1</span>
                        {currentItem.phase1 && (
                          <div className="w-10 h-10 rounded-full bg-[#003d6b] flex items-center justify-center">
                            <Check className="w-6 h-6 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {pipelineData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? 'bg-[#003d6b] w-10 sm:w-12'
                  : 'bg-gray-300 w-6 sm:w-8 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}