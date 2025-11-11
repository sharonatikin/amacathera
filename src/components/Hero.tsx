'use client';
import { Montserrat } from "next/font/google";
import Link from "next/link";
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // choose weights you need
});
export default function Hero() {

  const scrollToPipeline = () => {
    const pipelineSection = document.getElementById('pipeline-section');
    if (pipelineSection) {
      pipelineSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-slate-100 to-blue-100 relative overflow-hidden">


        {/* Mobile Layout - Image on top, content below */}
        <div className="md:hidden flex flex-col min-h-screen">
          {/* Image Section - Top Half */}
          <div 
            className="w-full h-[60vh] bg-left bg-cover bg-center relative"
            style={{
              backgroundImage: 'url(/images/Photo_Landing.png)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50"></div>
          </div>

          {/* Content Section - Bottom Half */}
          <div className="flex-1 bg-slate-50 px-4 sm:px-6 py-8 flex flex-col justify-center">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#003260] leading-tight">
                Transforming Therapeutics.<br />
                One Injection at a Time.
              </h1>
              
              <p className="text-base text-slate-700 leading-relaxed">
                With our proprietary injectable hydrogel platform, we deliver localized, sustained therapies to the hardest-to-treat targets.
              </p>
              
              <div className="space-y-3 pt-4">
                <button className="w-full bg-[#003260] hover:bg-[#004a8f] text-white font-semibold py-3.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                  Explore Our Technology
                </button>
                <button className="w-full bg-white hover:bg-slate-50 text-[#003260] font-semibold py-3.5 rounded-lg border-2 border-[#003260] transition-all duration-300">
                  View Clinical Pipeline
                </button>
              </div>
            </div>
          </div>
        </div>



      {/* Background Image Overlay */}
      <div 
        className="absolute md:block hidden inset-0"
        style={{
          backgroundImage: 'url("/images/Photo_Landing.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center left',
        }}
      />

      {/* Content */}
      <div className="relative md:block hidden z-10">

        {/* Hero Section */}
        <div className="min-h-screen w-full px-6 md:px-8 lg:px-16 py-12 md:py-20 flex items-center justify-end">
          <div className="w-full md:w-1/2 lg:w-6/12 flex flex-col gap-6 md:gap-8">
            {/* Heading */}
            <div className="">
              <h1 className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 mb-3 md:mb-4 leading-tight ${montserrat.className}`}>
                Transforming Therapeutics.
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 leading-tight">
                One Injection at a Time.
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base lg:text-lg text-slate-700 leading-relaxed">
              With our proprietary injectable hydrogel platform, we deliver localized, sustained therapies to the hardest-to-treat targets.
            </p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <Link href={'/technology'} className="px-8 flex md:px-12 lg:px-16 py-3 bg-blue-900 text-white font-semibold rounded hover:bg-blue-800 transition items-center shadow-lg text-center">
                Explore Our Technology
              </Link>
              <button onClick={scrollToPipeline} className="px-8 md:px-12 lg:px-16 py-3 border-2 border-blue-900 text-blue-900 font-semibold rounded hover:bg-blue-50 transition text-center">
                View Clinical Pipeline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}