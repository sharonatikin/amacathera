import React from 'react';

const PainReliefHero: React.FC = () => {
  return (
    <div className="relative min-h-screen  items-center w-full h-screen overflow-hidden bg-gradient-to-t from-blue-60 via-white to-slate-100">
      {/* Background Image */}
      <div className="lg:hidden flex items-center justify-center px-6 py-6">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-[#003260] leading-tight">
            Why <span className="font-extrabold">48 hours</span> is a magic number for pain relief
          </h1>
        </div>
      </div>
      <div className="md:block absolute inset-0 bg-gradient-to-t  from-white/20 via-white/40 to-white/0  to-transparent" />
      <img
        src="/images/painrelief-bg.png"
        alt="Hero"
        className=" inset-0 w-full h-full object-cover"
      />

      {/* White gradient overlay from left to right */}
      <div className="md:block hidden absolute inset-0 bg-gradient-to-r  from-white/20 via-white/40 to-white  to-transparent" />
      <div className="md:block hidden absolute inset-0 bg-gradient-to-t  from-white/80 via-transparent to-white/80  to-transparent" />

      {/* Content Container */}
      <div className="absolute inset-0 flex items-center justify-end">
        {/* Left spacing - image area */}
        <div className="w-1/2 h-full" />

        {/* Right content area */}
        <div className="w-1/2 h-full flex flex-col items-start justify-center px-12 lg:px-16">
          {/* White shadow box effect behind text */}
          <div className="relative">
            {/* Subtle white shadow/glow effect */}
            <div className="absolute -inset-6 bg-white/40 rounded-lg blur-2xl" />

            {/* Heading text */}
            <h1 className="relative hidden lg:block text-5xl lg:text-6xl font-bold text-[#003260] leading-tight max-w-xl">
              Why <span className="font-extrabold">48 hours</span> is a magic number for pain relief
            </h1>
          </div>
        </div>
      </div>

      {/* Mobile responsive adjustment */}
    </div>
  );
};

export default PainReliefHero;