import React from 'react';

const FirstAndForemost = () => {
  return (
    <div className="flex flex-col lg:flex-row my-5 gap-5 lg:gap-0 lg:my-0">
        


              <img
                src="/images/career-2-bg.png"
                alt="Medical syringe"
                className="lg:w-2/4 xl:w-full h-full flex-1 object-cover  object-center"
              />


        {/* Right Content */}
        <div className="flex flex-1 flex-col justify-center space-y-6 md:space-y-8 px-10 ms:px-0">
          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-4xl font-bold text-primary leading-tight">
            First and foremost
          </h2>

          {/* Content Paragraphs */}
          <div className="space-y-6 md:space-y-6">
            {/* Paragraph 1 */}
            <p className="text-base sm:text-lg md:text-base lg:text-lg text-primary leading-relaxed max-w-2xl">
              AmacaThera is a company built on strong scientific methodology. Our work is grounded in strong science, plain and simple.
            </p>

            {/* Paragraph 2 */}
            <p className="text-base sm:text-lg md:text-base lg:text-lg text-primary leading-relaxed max-w-2xl">
              We want patients to access the treatment they need, no matter how challenging the drug delivery target.
            </p>

            {/* Paragraph 3 */}
            <p className="text-base sm:text-lg md:text-base lg:text-lg text-primary leading-relaxed max-w-2xl">
              Creating that framework requires a strong commitment to accountability and transparency. The credibility of our data and processes are the foundation of our success.
            </p>
          </div>
        </div>
    </div>
  );
};

export default FirstAndForemost;