import { ArrowBigRight, ArrowRight } from 'lucide-react';

export default function TechnologyHighlights() {
  const highlights = [
    {
      title: "Injectable Depot",
      description: "Our shear-thinning hydrogel can be delivered via standard syringe and sets into a depot at body temperature.",
      image: "/icons/icon1.png"
    },
    {
      title: "Broad Payload Compatibility",
      description: "From small molecules to biologics, stem cells to enzymes — our platform accommodates varied therapeutic modalities.",
      image: "/icons/icon4.png"
    },
    {
      title: "Advanced Drug Delivery",
      description: "Designed to access anatomical areas like incision sites, brain/ eye tissue and other underserved locations.",
      image: "/icons/icon3.png"
    },
    {
      title: "Strong IP & GMP Readiness",
      description: "A robust IP portfolio and manufactured at GMP-scale sets us apart.",
      image: "/icons/icon2.png"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-slate-100 to-gray-100 relative overflow-hidden">
      {/* Vertical Dashed Line in Center */}

      {/* Content */}
      <div className="relative z-10 px-8 py-20">
        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-[#003d6b] text-center mb-20">
          Platform | Technology Highlights
        </h1>

        {/* Cards Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-[#003d6b]  group  rounded-3xl p-8 flex flex-col items-center text-center min-h-[500px] shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              {/* 3D Cube Icon */}
              <div className="mb-8 mt-4">
                <img src={item.image} alt="" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold  text-white  mb-6 leading-tight">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-white/90  text-base leading-relaxed mb-8 flex-grow">
                {item.description}
              </p>

              {/* Arrow */}
              {/* <div className="mt-auto">
                <ArrowRight className="w-12 h-6 text-white  " strokeWidth={2} />
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}