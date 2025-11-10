export default function Partners() {

  const images = [
    "/logos/Ontario Bio.png",
    "/logos/Toronto.png",
    "/logos/UTEST.png",
    "/logos/Venture Labs.png",
    "/logos/CREATIVE.png",
  "https://cdn-ildphco.nitrocdn.com/gRWXCDvJsjpRlGXdktAdTZFkhaknUDDR/assets/images/source/rev-e934a65/www.pacira.com/wp-content/themes/pacira/img/logo-b.svg"]
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-g via-white to-gray-100">
      {/* Bottom Water Wave Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/partners.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-16">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl lg:text-7xl font-bold text-[#1e3a5f] mb-4">
            Partners
          </h1>
          <p className="text-xl lg:text-2xl text-[#1e3a5f] font-normal">
            Partnerships foster collaboration at the highest level.
          </p>
        </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll gap-16 w-max">
          {[...images, ...images].map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Partner ${index + 1}`}
              className="h-28 max-w-50 object-contain"
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}