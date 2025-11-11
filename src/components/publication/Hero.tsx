import React from 'react';
import { ArrowRight } from 'lucide-react';

const BioEngineeringFounder: React.FC = () => {
  return (
    <div 
      className="relative  w-full min-h-screen md:min-h-[130vh] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/publication-bg.png")',
      }}
    >
      <div className="max-w-7xl relative w-full mx-auto px-4 sm:px-6 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content Section */}
          <div className="space-y-4 sm:space-y-6 md:space-y-2 py-12 sm:py-16 md:ml-20 pt-[10vh] md:pt-[15vh]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
              Co-founded by a<br />
              <span className="text-blue-900">Bioengineering Pioneer</span>
            </h1>
            
            <div className="space-y-4 sm:space-y-5 md:space-y-4 text-slate-700 pt-2 sm:pt-4 md:pt-0">
              <p className="text-base sm:text-lg leading-relaxed">
                Dr. Molly Shoichet is internationally renowned for her innovative biomaterials and therapeutic delivery strategies. Shoichet addresses critical questions in medicine with her multidisciplinary research approach that spans drug discovery to drug delivery.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed">
                AmacaThera is strategically positioned to develop a pipeline of products that build on cutting-edge inventions in injectable hydrogels, formulation design, drug delivery, affinity release and cell therapy.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed">
                For more information about publications related to AmacaThera's technology, please visit{' '}
                <a 
                  href="#" 
                  className="text-blue-700 hover:text-blue-800 underline font-medium transition-colors"
                >
                  the Shoichet Lab
                </a>
                .
              </p>
            </div>
            
            <div className="pt-4 sm:pt-6 md:pt-4">
              <button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 flex items-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base w-full sm:w-auto justify-center">
                Explore more
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Right side - Empty on mobile, background shows through */}
          <div className="hidden md:block"></div>
        </div>
      </div>
    </div>
  );
};

export default BioEngineeringFounder;