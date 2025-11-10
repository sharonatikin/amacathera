export default function ShowcaseSection() {
  return (
    <div id="next-section" className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-20">
      {/* Main container */}
      <div className="max-w-7xl mx-auto">
        {/* Video Section */}
        <div className="mb-24">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl aspect-video rounded-3xl shadow-2xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/aFTugjM95Xc?autoplay=1"
                title="AmacaThera Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Two Column Text Section */}
        <div className="flex items-center gap-12 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="flex flex-col">
            <p className="lg:text-lg text-[#004d7a] leading-relaxed font-light">
              AmacaThera's proprietary, injectable hydrogel platform can be used with a variety of therapeutics to deliver long-lasting treatment where and when it's needed most—including underserved therapeutic target areas within the body.
            </p>
          </div>

          {/* Divider line - hidden on mobile */}
          <div className="hidden lg:block left-1/2 top-96 transform -translate-x-1/2 h-40 w-px bg-gradient-to-b from-transparent via-[#004d7a] to-transparent"></div>

          {/* Right Column */}
          <div className="flex flex-col">
            <p className="lg:text-lg text-[#004d7a] leading-relaxed font-light">
              Our localized drug delivery solution can be adapted to multiple applications to improve drug delivery for a myriad of indications. AmacaGel may be combined with small molecules, growth factors, antibodies, stem cells and enzymes. See the publications section for a list of citations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}