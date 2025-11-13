export default function AMTShowSection() {
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
          <div className="flex w-full items-center justify-center">
            <p className="lg:text-lg text-[#004d7a] text-center max-w-4xl px-7 tracking-wide leading-relaxed font-light">
              The short video explains how AMT-143, our first formulation, addresses the critical 72-hour postoperative period when patients report the highest pain levels. When approved, it may help to reduce patients’ risk of opioid dependency while increasing relief.
            </p>
          </div>
      </div>
    </div>
  );
}