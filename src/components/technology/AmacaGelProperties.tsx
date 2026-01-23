import { Droplets, CheckCircle2, Clock, Syringe } from 'lucide-react';
import Image from 'next/image';

export default function AmacaGelProperties() {
  const properties = [
    {
      icon: "/icons/drop.png",
      title: "Simple hydrogel system",
      description: "Unlike other hydrogels that have cross-linking systems that can have inherent challenges if their manufacturing processes are not controlled, AmacaGel is easy to scale up from a manufacturing perspective."
    },
    {
      icon: "/icons/tick.png",
      title: "Approved, known components",
      description: "The materials used in AmacaGel are already approved in other formulations with extensive testing, making it likely that its combination of materials is proven to work in humans while presenting low risk."
    },
    {
      icon: "/icons/timer.png",
      title: "Flexible platform",
      description: "AmacaGel can be used to deliver therapeutic drugs to different locations in the body through a controlled release that has many benefits to dosing and efficacy."
    },
    {
      icon: "/icons/syringe.png",
      title: "Convenient dosing",
      description: "AmacaGel's shear-thinning properties makes the gel amenable to being applied to incisions via a pre-filled syringe, giving surgeons logistical flexibility to incorporate it within their existing procedures and practices."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 py-20">
      {/* Container */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* Title */}
          <h1 className="text-5xl lg:text-6xl font-bold text-[#0f3a66] mb-8">
            AmacaGel Properties
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-[#0f3a66] max-w-3xl mx-auto leading-relaxed">
            AmacaGel may be combined with small molecules, growth factors, antibodies, stem cells and enzymes. See our{' '}
            <a href="/publications" className="underline hover:text-[#1a4f7f] transition-colors">
              list of publications
            </a>
            {' '}for complete citations.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 mx-10 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {/* Vertical lines for medium and larger screens */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#004d7a] to-transparent transform -translate-x-1/2"></div>
          <div className="hidden lg:block absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#004d7a] to-transparent transform -translate-x-1/2"></div>
          <div className="hidden lg:block absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#004d7a] to-transparent transform -translate-x-1/2"></div>
          
          {/* Map through properties */}
          {properties.map((property, index) => (
            <div key={index} className="flex flex-col items-center text-center relative">
              {/* Icon Container */}
              <div className="mb-8 h-24 flex items-center justify-center">
                <Image src={property.icon} alt="" />
              </div>

              {/* Title */}
              <h3 className="text-xl w-60 h-15 lg:text-2xl font-bold text-[#0f3a66] mb-6 leading-tight">
                {property.title}
              </h3>

              {/* Description */}
              <p className="text-[#0f3a66] text-base leading-relaxed opacity-90">
                {property.description}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative bottom accent */}
        <div className="mt-24 flex justify-center">
        </div>
      </div>
    </div>
  );
}