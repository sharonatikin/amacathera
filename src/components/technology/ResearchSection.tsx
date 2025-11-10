import { Grid2X2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ResearchSection() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Left side - Image area */}
      <div className="absolute left-0 top-0 w-1/2 h-full hidden lg:flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Placeholder for scientist with microscope image */}
          <img src="/images/research-bg.png" alt="Scientist with Microscope" className="object-cover w-full h-full rounded-3xl  mx-8" />
        </div>
      </div>

      {/* Right side - Content */}
      <div className="w-full lg:w-1/2 lg:ml-auto min-h-screen flex flex-col items-start justify-center px-8 lg:px-16 py-20">
        {/* Logo/Badge - Top Right */}
        <img src="/logos/TheShoichetLab.png" alt="" className='absolute top-8 right-8 border-2 bg-blue-40 border-[#0f3a66] rounded-2xl px-6 py-4  backdrop-blur-sm' />

        {/* Main content */}
        <div className="max-w-xl">
          {/* Heading */}
          <h1 className="text-5xl lg:text-6xl font-bold text-[#0f3a66] mb-8 leading-tight">
            Based in Groundbreaking, Innovative Research
          </h1>

          {/* Description */}
          <p className="text-lg text-[#0f3a66] leading-relaxed mb-12 font-light">
            AmacaThera was spun out of The Shoichet Lab as a commercial company in 2016, with support from Toronto's early-stage biotechnology sector.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <Link href={'/team/molly-shoichet'} className="bg-[#0f3a66] hover:bg-[#1a4f7f] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 text-base whitespace-nowrap">
              Meet our CSO
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link href={'/publications'} className="border-2 border-[#0f3a66] text-[#0f3a66] hover:bg-[#0f3a66] hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-base whitespace-nowrap">
              Research Publications
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top right accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200 to-transparent opacity-20 rounded-full blur-3xl"></div>
        
        {/* Bottom left accent */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100 to-transparent opacity-10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}