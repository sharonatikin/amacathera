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
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/Photo_Landing.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center left',
        }}
      />

      {/* Content */}
      <div className="relative z-10">

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-8 py-20 pt-[15%]">
          <div className="grid grid-cols-2 items-center">
            {/* Left Side - Image Area */}
            <div className="flex items-center justify-center">
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-col gap-8">
              <div className="">
                <h1 className={`text-4xl font-bold whitespace-nowrap text-blue-900 mb-4 leading-tight ${montserrat.className}`}>
                  Transforming Therapeutics.
                </h1>
                <h2 className="text-4xl font-bold text-blue-900 leading-tight">
                  One Injection at a Time.
                </h2>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed max-w-md">
                With our proprietary injectable hydrogel platform, we deliver localized, sustained therapies to the hardest-to-treat targets.
              </p>

              {/* Buttons */}
              <div className="flex pt-4">
                <Link href={'/technology'} className="px-16 py-3 bg-blue-900 text-white font-semibold rounded hover:bg-blue-800 transition shadow-lg">
                  Explore Our Technology
                </Link>
                <button onClick={scrollToPipeline} className="px-16 py-3 border-2 border-blue-900 text-blue-900 font-semibold rounded hover:bg-blue-50 transition">
                  View Clinical Pipeline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}