import { ArrowRight, Droplet } from 'lucide-react';

export default function TechnologySection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url("/images/tech-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
        }}
      />

      {/* Main content container */}
      <div className="relative min-h-screen z-10 h-full flex items-center justify-end px-8 lg:px-20">
        <div className="w-full max-w-2xl">
          {/* Title */}
          <h1 className="text-5xl lg:text-6xl font-bold text-[#0f3a66] mb-8">
            Our Technology
          </h1>

          {/* Description */}
          <p className="text-lg text-[#0f3a66] leading-relaxed mb-12 pr-8">
            AmacaThera has developed a novel hydrogel to deliver localized therapeutics. Our technology is unique. We've demonstrated GMP manufacturability and are conducting human safety testing
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <button className="bg-[#0f3a66] hover:bg-[#1a4f7f] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 text-base">
              Explore Our Technology
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="border-2 border-[#0f3a66] text-[#0f3a66] hover:bg-[#0f3a66] hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-base">
              View Clinical Pipeline
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative right side accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200 to-transparent opacity-20 rounded-full blur-3xl"></div>
    </div>
  );
}