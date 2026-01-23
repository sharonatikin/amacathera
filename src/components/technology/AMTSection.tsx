import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AMT143Section() {
  return (
    <div 
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/amt-bg.png")',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className=" z-10 h-full flex items-center px-8 lg:px-20">
        <div className='top-100 relative'>
        <div className="w-full max-w-2xl">
          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            AMT-143
          </h1>

          {/* Description */}
          <p className="text-lg text-white leading-relaxed mb-8 max-w-xl">
            We've developed an opioid-free formulation for the sustained release of an anaesthetic with our AmacaGel platform.
          </p>

          {/* Button */}
          <Link href={'/AMT'} className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 text-base group">
            Explore more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
        </div>
        <div className='flex justify-end flex-1'>

        <Image src="/logos/Amaca_Thera_Logo_PNG.png" className='w-40' alt="" />
        </div>
      </div>
    </div>
  );
}