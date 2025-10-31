'use client';
import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

export default function Pipeline() {
  const [activeSlide, setActiveSlide] = useState(3);

  const pipelineData = [
    {
      id: 1,
      product: "Pain (Post-Operative) / Fixed Dose",
      description: "Pre-filled syringe of local anesthetic formulation for sustained post-surgical pain relief",
      discovery: true,
      preClinical: false,
      phase1: false
    },
    {
      id: 2,
      product: "Pain (Post-Operative) / Fixed Dose",
      description: "Pre-filled syringe of local anesthetic formulation for sustained post-surgical pain relief",
      discovery: false,
      preClinical: true,
      phase1: false
    },
    {
      id: 3,
      product: "Pain (Post-Operative) / Fixed Dose",
      description: "Pre-filled syringe of local anesthetic formulation for sustained post-surgical pain relief",
      discovery: true,
      preClinical: false,
      phase1: false
    },
    {
      id: 4,
      product: "Pain (Post-Operative) / Fixed Dose",
      description: "Pre-filled syringe of local anesthetic formulation for sustained post-surgical pain relief",
      discovery: true,
      preClinical: false,
      phase1: false
    },
    {
      id: 5,
      product: "Pain (Post-Operative) / Fixed Dose",
      description: "Pre-filled syringe of local anesthetic formulation for sustained post-surgical pain relief",
      discovery: false,
      preClinical: false,
      phase1: true
    },
    {
      id: 6,
      product: "Pain (Post-Operative) / Fixed Dose",
      description: "Pre-filled syringe of local anesthetic formulation for sustained post-surgical pain relief",
      discovery: true,
      preClinical: false,
      phase1: false
    },
    {
      id: 7,
      product: "Pain (Post-Operative) / Fixed Dose",
      description: "Pre-filled syringe of local anesthetic formulation for sustained post-surgical pain relief",
      discovery: false,
      preClinical: true,
      phase1: false
    }
  ];

  const currentItem = pipelineData[activeSlide];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 relative overflow-hidden">
      {/* Medical Vials Image on Right */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/pipeline.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-8 lg:px-16 py-16  right-20">


        {/* Pipeline Title */}
        <div className="max-w-7xl mx-auto mb-12">
          <h1 className="text-6xl lg:text-7xl font-bold text-[#2d5a7f]">
            Pipeline
          </h1>
        </div>

        {/* Pipeline Table */}
        <div className="max-w-5xl mx-auto mb-16 ">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-[#003d6b] text-white">
              <div className="px-8 py-6 font-bold text-lg border-r border-white/20">
                Product / Platform
              </div>
              <div className="px-8 py-6 font-bold text-lg text-center border-r border-white/20">
                Discovery
              </div>
              <div className="px-8 py-6 font-bold text-lg text-center border-r border-white/20">
                Pre-Clinical
              </div>
              <div className="px-8 py-6 font-bold text-lg text-center">
                Phase 1
              </div>
            </div>

            {/* Table Row */}
            <div className="grid grid-cols-4 border-t border-gray-200">
              {/* Product Info */}
              <div className="px-8 py-8 border-r border-gray-200">
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                  {currentItem.product}
                </h3>
                <p className="text-[#1e3a5f] text-sm leading-relaxed">
                  {currentItem.description}
                </p>
              </div>

              {/* Discovery */}
              <div className="px-8 py-8 flex items-center justify-center border-r border-gray-200">
                {currentItem.discovery && (
                  <div className="w-14 h-14 rounded-full bg-[#003d6b] flex items-center justify-center">
                    <Check className="w-8 h-8 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Pre-Clinical */}
              <div className="px-8 py-8 flex items-center justify-center border-r border-gray-200">
                {currentItem.preClinical && (
                  <div className="w-14 h-14 rounded-full bg-[#003d6b] flex items-center justify-center">
                    <Check className="w-8 h-8 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Phase 1 */}
              <div className="px-8 py-8 flex items-center justify-center">
                {currentItem.phase1 && (
                  <div className="w-14 h-14 rounded-full bg-[#003d6b] flex items-center justify-center">
                    <Check className="w-8 h-8 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-3">
          {pipelineData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? 'bg-[#003d6b] w-12'
                  : 'bg-gray-300 w-8 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}