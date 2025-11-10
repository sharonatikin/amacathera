'use client';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToPipeline = () => {
    const pipelineSection = document.getElementById('pipeline-section');
    if (pipelineSection) {
      pipelineSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        
        .montserrat {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
      
      <div 
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat animate-fadeIn"
        style={{
          backgroundImage: 'url("/images/Photo_Landing.png")',
          backgroundPosition: 'center left',
        }}
      >
        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 pt-[30%] sm:pt-[20%] md:pt-[16%] lg:pt-[15%]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Image Area (hidden on mobile/tablet) */}
              <div className="hidden lg:flex items-center justify-center">
              </div>

              {/* Right Side - Content */}
              <div className={`flex flex-col gap-4 sm:gap-6 md:gap-8 ${isVisible ? 'animate-slideUp' : 'opacity-0'}`}>
                <div>
                  <h1 className="montserrat text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-3 sm:mb-4 leading-tight">
                    Transforming Therapeutics.
                  </h1>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 leading-tight">
                    One Injection at a Time.
                  </h2>
                </div>

                <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed max-w-md">
                  With our proprietary injectable hydrogel platform, we deliver localized, sustained therapies to the hardest-to-treat targets.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 pt-2 sm:pt-4">
                  <a 
                    href="/technology"
                    className="px-6 sm:px-10 md:px-12 lg:px-14 py-2.5 sm:py-3 bg-blue-900 text-white font-semibold rounded hover:bg-blue-800 transition-all duration-300 shadow-lg text-sm sm:text-base text-center hover:shadow-xl"
                  >
                    Explore Our Technology
                  </a>
                  <button 
                    onClick={scrollToPipeline}
                    className="px-6 sm:px-10 md:px-12 lg:px-14 py-2.5 sm:py-3 border-2 border-blue-900 text-blue-900 font-semibold rounded hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base"
                  >
                    View Clinical Pipeline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}