import { Quote } from 'lucide-react';
import Image from 'next/image';

export default function TestimonialSection() {
  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-30">
      {/* Container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-auto lg:min-h-96">
          
          {/* Left Side - Profile Image */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-1">
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-none">
              {/* Shadow effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl sm:rounded-3xl opacity-40 blur-lg"></div>
              
              <Image
                src="/images/team/peter.png" 
                className='relative w-64 h-64 sm:w-80 sm:h-80 lg:w-100 lg:h-100 lg:top-15 lg:left-20 rounded-2xl sm:rounded-3xl overflow-hidden object-cover' 
                alt="Peter van der Velden" 
              />
            </div>
          </div>

          {/* Right Side - Quote & Attribution */}
          <div className="flex flex-col justify-center order-2 lg:order-2">
            {/* Quote Section */}
            <div className="mb-8 sm:mb-12">
              <p className="text-lg sm:text-2xl lg:text-3xl text-[#0f3a66] font-light leading-relaxed mb-6 sm:mb-8">
                "The work out of that lab is truly transformative and she's a leader in the space. We thought there was an opportunity to build an interesting platform company based on her core technology."
              </p>
            </div>

            {/* Attribution Box */}
            <div className="bg-[#0f3a66] text-white px-6 sm:px-8 py-5 sm:py-6 rounded-lg inline-block w-full sm:w-auto sm:max-w-md">
              <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                Peter van der Velden
              </h4>
              <p className="text-white/90 text-sm sm:text-base">
                (Managing Partner - Lumira Ventures)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}