export default function Versatility() {
  return (
    <section className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16 sm:px-8 md:px-12 lg:px-20">

      {/* Title */}
      <div className="text-center mb-10 md:mb-14">
        <h1 className="text-[#0d2a5e] text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          Versatility and Scalability
        </h1>
        <p className="text-[#0d2a5e] text-lg sm:text-xl md:text-2xl font-light">
          developed through innovative research:
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">

        {/* Card 1 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col">
          <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden">
            <img
              src="/images/versatility1.png"
              alt="Hydrogel close-up"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-6 py-7 flex-1 flex items-center justify-center">
            <p className="text-[#4a6fa5] text-center text-sm sm:text-base leading-relaxed">
              AmacaGel can deliver small molecules, growth factors, antibodies, stem cells,
              and enzymes
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col">
          <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden">
            <img
              src="/images/versatility2.png"
              alt="Cell structure close-up"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="px-6 py-7 flex-1 flex items-center justify-center">
            <p className="text-[#4a6fa5] text-center text-sm sm:text-base leading-relaxed">
              straightforward "mix and fill" process reduces production costs and
              supports global scalability
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}