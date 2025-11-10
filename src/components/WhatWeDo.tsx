import { ArrowRight } from 'lucide-react';

export default function WhatWeDo() {
  const cards = [
    {
      title: "Advanced Drug Delivery",
      description: "Our proprietary hydrogel depot system releases therapeutic agents at the target site for prolonged effect.",
    },
    {
      title: "Hard-to-Reach Targets",
      description: "From post-surgical pain to oncology and beyond — we tackle locations conventional delivery struggles to reach.",
    },
    {
      title: "Clinical Validation",
      description: "Moving rapidly from bench to bedside: GMP manufacturable, human safety data, multi-modal payloads.",
    },
    {
      title: "Collaboration & Partnership",
      description: "Open to strategic alliances, co-development programmes and licensing. Let's accelerate together.",
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-300 via-slate-200 to-blue-200 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/whatwedo.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 py-16 px-8">
        {/* Title */}
        <h2 className="text-5xl font-bold text-[#003366] text-center mb-16">
          What We Do
        </h2>

        {/* Cards Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={` bg-[#003366] text-white hover:text-[#003366] hover:bg-white rounded-2xl p-8 flex flex-col justify-between lg:h-96 shadow-lg hover:shadow-2xl transition-shadow duration-300`}
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 leading-tight">
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed opacity-90">
                  {card.description}
                </p>
              </div>

              {/* <div className="mt-8 flex justify-start">
                <ArrowRight className="w-12 h-6" strokeWidth={2} />
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}