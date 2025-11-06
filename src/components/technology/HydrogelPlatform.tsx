import { Syringe, Beaker, ArrowRight, Sparkles } from 'lucide-react';

export default function HydrogelPlatform() {
  const content = [
    {
      image:'icon5.png',
      description:'Our proprietary hydrogel depot system releases therapeutic agents at the target site for prolonged effect.',
      title:'Advanced Drug Delivery',
      bg:'[#0f3a66]'
    },
    {
      image:'human.png',
      description:'From post-surgical pain to oncology and beyond — we tackle locations conventional delivery struggles to reach.',
      title:'Hard-to-Reach Targets',
      bg:'white'
    },
    {
      image:'icon6.png',
      description:'Moving rapidly from bench to bedside: GMP manufacturables, human safety data, multi-modal payloads.',
      title:'Clinical Validation',
      bg:'[#0f3a66]'
    },
  ]
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 py-20">
      {/* Container */}
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl lg:text-6xl font-bold text-[#0f3a66] text-center mb-24">
          A Unique Hydrogel Platform
        </h1>

        {/* Cards Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Card - Advanced Drug Delivery */}
          {content.map((item)=>

            
            <div className={`relative bg-${item.bg} shadow-2xl hover:shadow-4xl transition-shadow duration-300 rounded-2xl p-8 h-full min-h-96 flex flex-col justify-between`}>
              {/* Arrow icon */}
                        <svg className={`w-[140%] h-12 `} viewBox="0 0 1200 50" preserveAspectRatio="none">
            <line x1="770" y1="25" x2="850" y2="25" stroke={`${item.bg !== "white" ? "white" : "#0f3a66"} `} strokeWidth="2" opacity="0.5" />
            <polygon points="860,25 850,20 850,30" fill={`${item.bg !== "white" ? "white" : "#0f3a66"} `} opacity="0.5" />
          </svg>
              {/* <ArrowRight className="w-6 h-6 text-white opacity-60 self-end mb-4" /> */}
              
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <img src={`/icons/${item.image}`} alt="" />
              </div>

              {/* Title */}
              <h3 className={`text-2xl font-bold ${item.bg !== "white" ? "text-white" : "text-[#0f3a66]"} text-center mb-4`}>
                {item.title}
              </h3>

              {/* Description */}
              <p className={`text-base ${item.bg !== "white" ? "text-white" : "text-[#0f3a66]"} leading-relaxed text-center`}>
                {item.description}
              </p>
            </div>
          )}
        </div>

        {/* Connecting lines - desktop only */}
        {/* <div className="hidden lg:block mt-12">
          <svg className="w-full h-12" viewBox="0 0 1200 50" preserveAspectRatio="none">
            <line x1="770" y1="25" x2="850" y2="25" stroke="#0f3a66" strokeWidth="2" opacity="0.5" />
            <polygon points="860,25 850,20 850,30" fill="#0f3a66" opacity="0.5" />
          </svg>
        </div> */}
      </div>
    </div>
  );
}