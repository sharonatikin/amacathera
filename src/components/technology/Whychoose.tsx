const items = [
  {
    id: 1,
    image: "/images/whychoose1.png",
    text: "Targets hard-to-reach sites, including incision areas, brain, and eye tissue, for conditions ranging from post-surgical pain to oncology",
    imgWidth: "w-3/4",
    imgHeight: "h-52 sm:h-60 md:h-64",
  },
  {
    id: 2,
    image: "/images/whychoose2.png",
    text: "Accommodates a broad range of therapeutic modalities, from small molecules and biologics to stem cells and enzymes",
    imgWidth: "w-3/4",
    imgHeight: "h-40 sm:h-48 md:h-56",
  },
  {
    id: 3,
    image: "/images/whychoose3.png",
    text: "Shear-thinning hydrogel enables convenient dosing via pre-filled syringe, integrating smoothly into surgical workflows",
    imgWidth: "w-full",
    imgHeight: "h-60 sm:h-72 md:h-80",
  },
  {
    id: 4,
    image: "/images/whychoose4.png",
    text: "Constructed from approved, well-tested materials to minimize risk and support clinical use",
    imgWidth: "w-2/3",
    imgHeight: "h-44 sm:h-52 md:h-60",
  },
  {
    id: 5,
    image: "/images/whychoose5.png",
    text: "Clinically validated, with demonstrated safety and efficacy in both preclinical and phase 1 human trials",
    imgWidth: "w-3/4",
    imgHeight: "h-52 sm:h-60 md:h-72",
  },
  {
    id: 6,
    image: "/images/whychoose6.png",
    text: "Flexible platform for controlled drug delivery to diverse anatomical locations, enhancing dosing and therapeutic outcomes",
    imgWidth: "w-/4",
    imgHeight: "h-40 sm:h-48 md:h-56",
  },
  {
    id: 7,
    image: "/images/whychoose7.png",
    text: "Strong intellectual property portfolio and readiness for GMP-scale manufacturing",
    imgWidth: "w-3/4",
    imgHeight: "h-40 sm:h-60 md:h-64",
  },
]

type Item = typeof items[0]

export default function WhyChoose() {
  return (
    <section className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16 sm:px-8 md:px-12 lg:px-24">

      <h1 className="text-[#0d2a5e] text-xl sm:text-2xl md:text-3xl font-bold text-center mb-12 md:mb-16">
        Why choose AmacaThera's hydrogel platform?
      </h1>

      <div className="w-full max-w-4xl flex flex-col">
        {items.map((item: Item, index: number) => {
          const isEven = index % 2 === 0

          return (
            <div key={item.id}>
              <div
                className={`flex flex-col sm:flex-row items-center gap-8 sm:gap-12 py-10 md:py-14
                  ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'}
                `}
              >
                {/* Image container — uses per-item width */}
                <div className={`flex-shrink-0 sm:w-1/2 flex justify-center`}>
                  <img
                    src={item.image}
                    alt={`Feature ${item.id}`}
                    className={`${item.imgWidth} ${item.imgHeight} object-contain rounded-2xl`}
                  />
                </div>

                <p className="w-full sm:w-1/2 text-[#4a6080] text-sm sm:text-base leading-relaxed text-center sm:text-left">
                  {item.text}
                </p>
              </div>

              {index < items.length - 1 && (
                <hr className="border-blue-500 h-2 w-full" />
              )}
            </div>
          )
        })}
      </div>

    </section>
  )
}