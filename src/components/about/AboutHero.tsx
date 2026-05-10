// components/about/AboutHero.tsx
import React from 'react';

const AboutHero = () => {
  return (
    <section className="w-full md:pt-50 bg-[#0d2a4e] px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20 md:py-24">
      
      {/* Badge */}
      <div className="mb-6 sm:mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-white/80 text-xs sm:text-sm font-light tracking-wide">
          Transforming Drug Delivery
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-6 sm:mb-8 leading-none tracking-tight">
        About Us
      </h1>

      {/* Description */}
      <p className="text-white/75 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl">
        AmacaThera is at the forefront of transforming drug delivery through its
        clinically validated hydrogel drug delivery platform, designed to ensure precise,
        localized, and sustained release of a diverse array of therapeutics.
      </p>

    </section>
  );
};

export default AboutHero;