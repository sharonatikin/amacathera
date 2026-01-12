import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ResearchSection() {
  return (
    <div className="w-full lg:min-h-screen bg-gradient-to-r from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Left side - Image area (hidden on mobile, tablet) */}
      <div className="absolute left-0 top-0 w-1/2 h-full hidden lg:flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src="/images/research-bg.png" 
            alt="Scientist with Microscope" 
            className="object-cover w-full h-full" 
          />
        </div>
      </div>

      {/* Right side - Content */}
      <div className="w-full lg:w-1/2 lg:ml-auto lg:min-h-[111vh] flex flex-col items-start justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20 relative">
        
        {/* Logo/Badge - Top Right */}
        <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 w-40 sm:w-48 md:w-56 lg:w-70">
          <img 
            src="/logos/TheShoichetLab.png" 
            alt="The Shoichet Lab" 
            className="w-full border-2 bg-blue-40 border-[#0f3a66] rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 backdrop-blur-sm" 
          />
        </div>

        {/* Main content */}
        <div className="lg:max-w-2xl max-w-xl w-full mt-12 sm:mt-8 md:mt-0">
          {/* Heading */}
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f3a66] mb-6 sm:mb-8 leading-tight">
            Based in Groundbreaking, Innovative Research
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#0f3a66] leading-relaxed mb-8 sm:mb-12 font-light">
            AmacaThera was spun out of The Shoichet Lab as a commercial company in 2016, with support from Toronto's early-stage biotechnology sector.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center w-full">
            <Link 
              href={'/our-team/molly-shoichet'} 
              className="bg-[#0f3a66] hover:bg-[#1a4f7f] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center sm:justify-start gap-2 text-base whitespace-nowrap"
            >
              Meet our CSO
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </Link>

            <Link 
              href={'/publications'} 
              className="border-2 border-[#0f3a66] text-[#0f3a66] hover:bg-[#0f3a66] hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center sm:justify-start gap-2 text-base whitespace-nowrap"
            >
               Publications
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}