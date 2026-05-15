export default function AMTShowSection() {
  return (
    <div id="next-section" className="w-full md:min-h-screen bg-gradient-to-b from-gray-50 to-white md:px-6 md:py-20">
      {/* Main container */}
      <div className="md:max-w-7xl max-9xl mx-auto">
        {/* Video Section */}
        <div className="">
          <div className="flex md:hidden items-center justify-center mb-8">
            <div className="bg-blue-500 text-white  py-4 px-6 rounded-full shadow-md">Watch our videos</div>
          </div>
          <div className="flex justify-center">
            <div className="w-full  md:max-w-6xl aspect-video md:rounded-3xl shadow-2xl overflow-hidden">
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
      </div>
    </div>
  );
}