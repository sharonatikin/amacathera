// components/about/Investors.tsx
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface Investor {
  name: string;
  logo?: string;
}

const investors: Investor[] = [
  { name: "Lumira Ventures" },
  { name: "BioCapital" },
  { name: "MaRS IAF" },
  { name: "CCRM" },
];

const Investors = () => {
  return (
    <section id='investors' className="w-full bg-slate-50 px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20">

      {/* Section Header */}
      <div className="flex items-start gap-4 mb-10 sm:mb-12">
        {/* Icon Box */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#0d2a4e] flex items-center justify-center flex-shrink-0 mt-1">
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
        </div>

        {/* Title + Subtitle */}
        <div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-[#0d2a4e] tracking-tight leading-none mb-2">
            Investors
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
            AmacaThera is backed by committed investors who share the Company&apos;s vision to advance the
            delivery of a wide range of therapeutics
          </p>
        </div>
      </div>

      {/* Investor Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
        {investors.map((investor) => (
          <div
            key={investor.name}
            className="bg-white border border-slate-200 rounded-2xl px-6 py-8 flex items-center justify-center min-h-[100px]"
          >
            {investor.logo ? (
              <img
                src={investor.logo}
                alt={investor.name}
                className="max-h-10 object-contain"
              />
            ) : (
              <span className="text-sm text-slate-500 font-light text-center leading-snug">
                {investor.name}
              </span>
            )}
          </div>
        ))}
      </div>

    </section>
  );
};

export default Investors;