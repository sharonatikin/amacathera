import { Grid2X2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ResearchSection() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Left side - Image area */}
      <div className="absolute left-0 top-0 w-1/2 h-full hidden lg:flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Placeholder for scientist with microscope image */}
          <img src="/images/research-bg.png" alt="Scientist with Microscope" className="object-cover w-full h-full rounded-3xl  " />
        </div>
      </div>

      {/* Right side - Content */}
      <div className="w-full lg:w-1/2 lg:ml-auto min-h-screen flex flex-col items-start justify-center px-8 lg:px-16 py-20">
        {/* Logo/Badge - Top Right */}
        <img src="/logos/TheShoichetLab.png" alt="" className='absolute top-8 right-8 w-48 lg:w-70 md:w-60 border-2 bg-blue-40 border-[#0f3a66] rounded-2xl px-6 py-2  backdrop-blur-sm' />

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
            <Link href={'/our-team/molly-shoichet'} className="bg-[#0f3a66] hover:bg-[#1a4f7f] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 text-base whitespace-nowrap">
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

    </div>
  );
}