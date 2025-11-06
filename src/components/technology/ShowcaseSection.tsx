
export default function ShowcaseSection() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-20">
      {/* Main container */}
      <div className="max-w-7xl mx-auto">
        {/* Card Section */}
        <div className="mb-24">
          <div className="flex justify-center">

                  <img src='/logos/Logo_BG_Blue.png' alt="AmacaThera Logo" className="rounded-3xl  shadow-2xl" />

          </div>
        </div>

        {/* Two Column Text Section */}
        <div className="flex items-center gap-12 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="flex flex-col">
            <p className="text-lg text-[#004d7a] leading-relaxed font-light">
              AmacaThera's proprietary, injectable hydrogel platform can be used with a variety of therapeutics to deliver long-lasting treatment where and when it's needed most—including underserved therapeutic target areas within the body.
            </p>
          </div>

          {/* Divider line - hidden on mobile */}
          <div className="hidden lg:block  left-1/2 top-96 transform -translate-x-1/2 h-40 w-px bg-gradient-to-b from-transparent via-[#004d7a] to-transparent"></div>

          {/* Right Column */}
          <div className="flex flex-col">
            <p className="text-lg text-[#004d7a] leading-relaxed font-light">
              Our localized drug delivery solution can be adapted to multiple applications to improve drug delivery for a myriad of indications. AmacaGel may be combined with small molecules, growth factors, antibodies, stem cells and enzymes. See the publications section for a list of citations.
            </p>
          </div>
        </div>
      </div>

      {/* Background decoration elements */}
      {/* <div className="fixed inset-0 pointer-events-none overflow-hidden"> */}
        {/* Top left wave */}
        {/* <svg className="absolute -top-24 -left-12 w-96 h-96 opacity-10" viewBox="0 0 200 200">
          <path d="M 50,100 Q 80,50 150,100 T 250,100" stroke="#004d7a" strokeWidth="2" fill="none" />
          <path d="M 50,120 Q 80,70 150,120 T 250,120" stroke="#004d7a" strokeWidth="2" fill="none" />
        </svg> */}

        {/* Top right wave */}
        {/* <svg className="absolute -top-32 -right-24 w-96 h-96 opacity-10 rotate-180" viewBox="0 0 200 200">
          <path d="M 50,100 Q 80,50 150,100 T 250,100" stroke="#004d7a" strokeWidth="2" fill="none" />
          <path d="M 50,120 Q 80,70 150,120 T 250,120" stroke="#004d7a" strokeWidth="2" fill="none" />
        </svg>
      </div> */}
    </div>
  );
}