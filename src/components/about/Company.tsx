// components/about/Company.tsx
import React from 'react';
import { Target } from 'lucide-react';

const Company = () => {
  return (
    <section id='company' className="w-full bg-[#0d2a4e] white px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20">

      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8 sm:mb-10">
        {/* Icon Box */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
          <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#0d2a4e] " strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white tracking-tight">
          Company
        </h2>
      </div>

      {/* Content Card */}
      <div className="w-full rounded-2xl px-6 sm:px-10 py-8 sm:py-10">
        <p className="text-white text-base sm:text-lg font-light leading-relaxed">
          Headquartered in Toronto, Canada, AmacaThera emerged in 2016 as a spin-out from The Shoichet Lab,
          founded by Dr. Mike Cooke and Dr. Molly Shoichet, with the backing of Toronto&apos;s vibrant early-stage
          biotechnology community. Our clinically validated hydrogel drug delivery platform is designed to ensure precise,
          localized, and sustained release of a diverse array of therapeutics, transforming the way medicines are
          delivered to patients.
        </p>
      </div>

    </section>
  );
};

export default Company;