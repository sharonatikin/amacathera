import Image from 'next/image';
import React from 'react';

const FirstAndForemost = () => {
  return (
    <div className="flex flex-col lg:flex-row my-5 gap-5 lg:gap-0 lg:my-0">
        


              <Image
                src="/images/career-2-bg.png"
                alt="Medical syringe"
                className="lg:w-2/4 xl:w-full h-full flex-1 object-cover  object-center"
              />


        {/* Right Content */}
        <div className="flex flex-1 flex-col justify-center space-y-6 md:space-y-8 px-10 ms:px-0">
          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-4xl font-bold text-primary leading-tight">
           Transforming the Future of Drug Delivery
          </h2>

          {/* Content Paragraphs */}
          <div className="space-y-6 md:space-y-6">
            {/* Paragraph 1 */}
            <p className="text-base sm:text-lg md:text-base lg:text-lg text-primary leading-relaxed max-w-2xl">
              At AmacaThera, we are dedicated to driving progress in drug delivery through our next generation hydrogel-based drug delivery platform. Developed from two established, biocompatible polymers, our platform offers long-acting, localized, and sustained release of a diverse array of therapeutics.
            </p>

            {/* Paragraph 2 */}
            <p className="text-base sm:text-lg md:text-base lg:text-lg text-primary leading-relaxed max-w-2xl">
              With proven clinical validity, our platform is crafted to broaden treatment possibilities and ensure that more patients receive effective, precisely targeted therapies tailored to their needs.

            </p>
          </div>
        </div>
    </div>
  );
};

export default FirstAndForemost;