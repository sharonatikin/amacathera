export default function ShowcaseSection() {
  return (
    <div id="next-section" className="w-full  bg-gradient-to-b from-gray-50 to-white px-6 py-10">
      {/* Main container */}
      {/* <div className="max-w-7xl mx-auto"> */}
        {/* Video Section */}
        <div className="">
          <div className="flex justify-center items-center">
            <div className="w-full max-w-7xl aspect-video rounded-3xl shadow-2xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/3m6SgTSU118?autoplay=1"
                title="AmacaThera Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}