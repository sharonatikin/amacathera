import React from 'react';
import { ArrowRight } from 'lucide-react';

const BioEngineeringFounder: React.FC = () => {
  return (
    <div 
      className="relative w-full   min-h-[130vh] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/publication-bg.png")',
      }}
    >
      <div className="max-w-7xl relative pt-[10%] w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content Section */}
          <div className="space-y-2 ml-20">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
              Co-founded by a<br />
              <span className="text-blue-900">Bioengineering Pioneer</span>
            </h1>
            
            <div className="space-y-4 text-slate-700">
              <p className="text-lg leading-relaxed">
                Dr. Molly Shoichet is internationally renowned for her innovative biomaterials and therapeutic delivery strategies. Shoichet addresses critical questions in medicine with her multidisciplinary research approach that spans drug discovery to drug delivery.
              </p>
              
              <p className="text-lg leading-relaxed">
                AmacaThera is strategically positioned to develop a pipeline of products that build on cutting-edge inventions in injectable hydrogels, formulation design, drug delivery, affinity release and cell therapy.
              </p>
              
              <p className="text-lg leading-relaxed">
                For more information about publications related to AmacaThera's technology, please visit{' '}
                <a 
                  href="#" 
                  className="text-blue-700 hover:text-blue-800 underline font-medium"
                >
                  the Shoichet Lab
                </a>
                .
              </p>
            </div>
            
            <div className="pt-4">
              <button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Explore more
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioEngineeringFounder;