import { Quote } from 'lucide-react';

export default function TestimonialSection() {
  return (
    <div className="w-full  bg-gradient-to-b from-gray-50 to-white px-6 py-30">
      {/* Container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-96">
          
          {/* Left Side - Profile Image */}
          <div className="flex justify-center  lg:justify-start">
            <div className="relative">
              {/* Shadow effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl opacity-40 blur-lg"></div>
              
                <img src="/images/team/peter.png" className='relative w-100 h-100 top-15 left-20 rounded-3xl overflow-hidden' alt="" />
            </div>
          </div>

          {/* Right Side - Quote & Attribution */}
          <div className="flex flex-col justify-center lg:justify-start">
            {/* Quote Section */}
            <div className="mb-12">
              <p className="text-2xl lg:text-3xl w-2xl text-[#0f3a66] font-light leading-relaxed mb-8">
                "The work out of that lab is truly transformative and she's a leader in the space. We thought there was an opportunity to build an interesting platform company based on her core technology."
              </p>
                

            </div>

            {/* Attribution Box */}
            <div className="bg-[#0f3a66] text-white px-8 py-6 rounded-lg inline-block max-w-md">
              <h4 className="text-xl font-bold mb-2">
                Peter van der Velden,
              </h4>
              <p className="text-white/90 text-base">
                (Managing Partner - Lumira Ventures)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}