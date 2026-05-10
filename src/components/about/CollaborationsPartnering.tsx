// components/about/CollaborationsPartnering.tsx
import React from 'react';
import { Mail } from 'lucide-react';

interface Partner {
  name: string;
  logo?: string;
}

const partners: Partner[] = [
  { name: "Pharma Partner 1" },
  { name: "Pharma Partner 2" },
  { name: "Pharma Partner 3" },
  { name: "Pharma Partner 4" },
];

const CollaborationsPartnering = () => {
  return (
    <section id='collaborations-and-partnering' className="w-full bg-[#0d2a4e] px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20">

      {/* Section Header */}
      <div className="mb-8 sm:mb-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white tracking-tight leading-none mb-3">
          Collaborations and Partnering
        </h2>
        <p className="text-white/60 text-sm sm:text-base font-light">
          Partnering to elevate therapeutics with localized, controlled delivery
        </p>
      </div>

      {/* Description Card */}
      <div className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 sm:px-10 py-8 sm:py-10 mb-6 sm:mb-8 space-y-5">
        <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed">
          AmacaThera believes partnerships are essential to unlocking the full potential of innovative therapeutics. The Company&apos;s
          transformative hydrogel drug delivery platform provides precise, localized, and sustained drug delivery in an easy-to-administer
          format across a wide range of therapeutic areas.
        </p>
        <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed">
          AmacaThera collaborates with pharmaceutical companies to enhance existing and emerging drug candidates, combining its
          proprietary hydrogel platform with next-generation therapeutics to accelerate development timelines and expand therapeutic
          potential.
        </p>
        <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed">
          By providing flexible, tunable release profiles and a scalable manufacturing process, AmacaThera enables partners to bring
          transformative therapies to patients worldwide with reduced risk and greater efficiency.
        </p>
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mb-4 sm:mb-5">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="bg-white/5 border border-white/10 rounded-2xl px-6 py-8 flex items-center justify-center min-h-[100px]"
          >
            {partner.logo ? (
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-10 object-contain"
              />
            ) : (
              <span className="text-sm text-white/50 font-light text-center leading-snug">
                {partner.name}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Partner logos note */}
      <p className="text-center text-white/40 text-sm italic mb-8 sm:mb-10">
        Partner logos will be added soon
      </p>

      {/* Contact Card */}
      <div className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 sm:px-10 py-8 sm:py-10 flex flex-col items-center gap-5">
        <p className="text-white/70 text-sm sm:text-base font-light text-center">
          For partnership enquiries and opportunities with AmacaThera, reach out to us at
        </p>
        <a
          href="mailto:info@amacathera.com"
          className="inline-flex items-center gap-2.5 px-6 py-3 bg-white rounded-full text-[#0d2a4e] text-sm font-medium hover:bg-white/90 transition-colors duration-200"
        >
          <Mail className="w-4 h-4 flex-shrink-0" />
          info@amacathera.com
        </a>
      </div>

    </section>
  );
};

export default CollaborationsPartnering;