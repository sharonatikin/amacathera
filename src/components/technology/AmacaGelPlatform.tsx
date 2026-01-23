import { ArrowRight, Brain } from 'lucide-react';
import Image from 'next/image';

export default function AmacaGelPlatform() {
  return (
    <div className="w-full flex items-center  bg-gradient-to-br from-[#0f3a66] via-[#1a4f7f] to-[#0d2d52] a overflow-hidden px-6 py-20">


      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto min-h-screen flex items-center">
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          
          {/* Left Section - Content */}
          <div className="flex flex-col justify-center">
            {/* Title */}
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              The AmacaGel Platform
            </h1>

            {/* Description */}
            <p className="text-white/90 text-lg leading-relaxed mb-12 max-w-2xl">
              AmacaGel can be applied to a wide range of drugs for clinical applications that require sustained, local drug delivery at a target site. It can be injected directly into a targeted organ or incision site, forming a depot where the therapeutic can be diffused into the required area.
            </p>

            {/* Button */}
            <div>
              {/* <button className="bg-white hover:bg-gray-100 text-[#0f3a66] px-8 py-4 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 text-base whitespace-nowrap">
                Explore more
                <ArrowRight className="w-5 h-5" />
              </button> */}
            </div>
          </div>

          {/* Right Section - Brain Visualization */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-sm h-96 flex items-center justify-center">
              {/* Brain wireframe illustration */}
              <Image src="/icons/brain.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}