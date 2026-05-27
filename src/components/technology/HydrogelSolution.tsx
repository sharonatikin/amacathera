export default function HydrogelSolution() {
  return (
    <section className="min-h-screen bg-[#0d2a5e] flex flex-col items-center justify-center px-4 py-16 sm:px-8 md:px-12 lg:px-20">

      {/* Title */}
      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-14 leading-tight">
        Injectable Hydrogel Solution <br className="hidden sm:block" />
        (AmacaGel)
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">

        {/* Card 1 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col">
          <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden">
            <img
              src="/images/hydrosol.png"
              alt="Injectable hydrogel solution"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-6 py-6 flex-1 flex items-center justify-center">
            <p className="text-[#1a3a6e] text-center text-sm sm:text-base leading-relaxed">
              Injectable hydrogel transitions from liquid to gel at body temperature,
              ensuring drugs stay at the target site for enhanced therapeutic effect
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col">
          <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden">
            <img
              src="/images/hydrosol1.png"
              alt="Surgical team in operating room"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="px-6 py-6 flex-1 flex items-center justify-center">
            <p className="text-[#1a3a6e] text-center text-sm sm:text-base leading-relaxed">
              Platform provides customizable drug release profiles burst, sustained,
              or combined to meet various clinical needs from post-surgical pain to oncology
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}