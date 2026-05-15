import React from 'react';
import Image from 'next/image';

const WhyFortyEightHours: React.FC = () => {
  return (
    <div className="w-full bg-white px-8 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

      {/* IMAGE — top on mobile, right on desktop */}
      <div className="w-full lg:w-1/2 flex items-center justify-center flex-shrink-0 order-first lg:order-last">
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] rounded-full border-[6px] border-[#0d2a4e] overflow-hidden flex-shrink-0">
          <Image
            src="/images/amt2-bg.png"
            alt="Patient experiencing post-operative pain"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* CONTENT — bottom on mobile, left on desktop */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center order-last lg:order-first">
        <h2 className="text-center text-sm sm:text-5xl font-bold text-[#0d2a4e] leading-tight mb-10">
          Why 48 hours is a magic number for pain relief
        </h2>
        <div className="space-y-8">
          <p className="text-xs text-center sm:text-base text-slate-700 leading-relaxed">
            During the development of AMT-143, we engaged extensively with numerous surgeons to gain insights
            into their clinical routines and to better understand patient experiences following surgery. Surgeons
            consistently highlighted that patients typically endure the most intense pain during the initial
            post-operative period. By offering an opioid-free pain management solution at this critical juncture,
            AMT-143 has the potential to not only improve patient comfort but also significantly reduce the risk
            of opioid dependency, thereby supporting improved surgical outcomes.
          </p>
          <p className="text-xs text-center sm:text-base text-slate-700 leading-relaxed">
            To address this clinical need, AMT-143 has been carefully engineered to provide sustained release of
            its analgesic agent over a targeted three-day period. Preclinical evaluations indicate that, as the
            hydrogel formulation gradually acclimatizes to body temperature, the encapsulated drug is steadily
            released and absorbed, ensuring prolonged and effective pain relief throughout the most challenging
            phase of recovery.
          </p>
        </div>
      </div>

    </div>
  );
};

export default WhyFortyEightHours;