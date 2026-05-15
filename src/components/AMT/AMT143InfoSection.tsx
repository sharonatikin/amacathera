import React from 'react';
import Image from 'next/image';

const InpatientSurgerySection: React.FC = () => {
  return (
    <div className="w-full bg-white px-8 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

      {/* LEFT — Circle image with blue tint */}
      <div className="w-full lg:w-1/2 flex items-center justify-center flex-shrink-0">
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] rounded-full border-[6px] border-[#0d2a4e] overflow-hidden flex-shrink-0">
          {/* Blue tint overlay */}
          <div className="absolute inset-0 bg-[#0d2a4e]/50 z-10 mix-blend-multiply" />
          <Image
            src="/images/inpatient-surgery.png"
            alt="Americans affected by post-operative pain"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d2a4e] leading-tight mb-10">
          Each year, 51 million Americans have inpatient surgery, with opioids still widely used for acute post-operative pain relief
        </h2>

        {/* Paragraphs */}
        <div className="space-y-8">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Each year, around 51 million Americans undergo inpatient surgery, with opioids remaining the
            predominant choice for managing acute post-operative pain. The financial burden associated with
            prescription opioid overdoses, abuse, and dependency surpasses $78.5 billion annually, primarily
            due to healthcare expenses, substance abuse treatment, and lost productivity.
          </p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            AMT-143 is uniquely positioned to bridge this critical gap in pain management. At present, the
            greatest challenge in this market is the lack of a single-dose analgesic that can reliably provide
            more than 48 hours of effective post-surgical pain relief.
          </p>
        </div>
      </div>

    </div>
  );
};

export default InpatientSurgerySection;