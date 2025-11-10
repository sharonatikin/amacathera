import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ProblemSolution() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/problemsolution.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/30" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between pt-56 pb-10 px-8 lg:px-18">
        {/* Title Section */}
        <div className="pl-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#003366] mb-2">
            The Problem
          </h2>
          <h1 className="text-5xl lg:text-7xl font-bold text-[#003366]">
            + Our Solution
          </h1>
        </div>

        {/* Cards Section */}
        <div className="flex-1 flex items-center justify-center ">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Problem Card */}
            <div className="bg-[#B8D4E8] rounded-2xl p-8 lg:p-10 shadow-lg">
              <h3 className="text-3xl  lg:text-4xl font-bold text-[#003366] mb-6">
                Problem:
              </h3>
              <p className="text-[#003366] font-light  lg:text-lg leading-relaxed">
                Many therapies fail not for lack of potency but inability to deliver where needed — in right concentration, for enough time, with minimal systemic exposure.
              </p>
            </div>

            {/* Solution Card */}
            <div className="bg-[#003366] rounded-2xl p-8 lg:p-10 shadow-lg">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Solution:
              </h3>
              <p className="text-white font-extralight   lg:text-lg leading-relaxed">
                AmacaThera's AmacaGel™ platform addresses this by forming an injectable depot at the target site, achieving sustained, localized delivery of small molecules, biologics, enzymes or cells.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {/* <div className="flex justify-around items-center mt-12">
          <button className="flex items-center gap-3 text-[#003366] font-semibold text-lg hover:gap-2 transition-all duration-300 group">
            <ArrowLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" strokeWidth={2.5} />
            <span>Previous</span>
          </button>

          <button className="flex items-center gap-3 text-[#003366] font-semibold text-lg hover:gap-4 transition-all duration-300 group">
            <span>Next</span>
            <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
          </button>
        </div> */}
      </div>
    </div>
  );
}