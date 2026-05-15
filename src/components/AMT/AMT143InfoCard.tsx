import Image from 'next/image';

const AMT143InfoCard = () => {
  return (
    <>
      {/* ── MOBILE VIEW ── */}
      <div className="block lg:hidden mt-15 w-full bg-white">

        {/* Top image section with brand tag overlay */}
        <div className="relative w-full h-72 sm:h-80">
          {/* <Image
            src='/images/amtinfo-bg.jpeg'
            alt="AMT-143 Background"
            fill
            className="object-cover object-right"
            quality={100}
            priority
          /> */}
          <img src="/images/amt-fullbg.png" className="object-cover object-right" alt="AMT-143 Background" />
          {/* Brand tag top-left */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block bg-white border border-[#0d2a4e] text-[#0d2a4e] text-[10px] font-semibold tracking-[0.25em] uppercase px-3 py-1.5">
              AMACA THERA
            </span>
          </div>
        </div>

        {/* Text content below image */}
        <div className="px-6 py-10 space-y-6">

          {/* Heading — centered on mobile */}
          <h2 className="text-xl font-bold text-[#0d2a4e] leading-snug text-center">
            The introduction of AMT-143 to the market will offer significant benefits to patients,
            clinicians, and the wider healthcare community seeking alternatives to addictive medications
          </h2>

          {/* Paragraphs — centered on mobile */}
          <div className="space-y-5">
            <p className="text-sm text-slate-600 leading-relaxed text-center">
              AMT-143 (AmacaGel) is an innovative, long-acting, non-opioid anesthetic designed for
              post-operative pain management. Utilizing AmacaThera&apos;s advanced, tunable hydrogel drug
              delivery platform, AMT-143 delivers a sustained, localized release of ropivacaine directly
              to the surgical site.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed text-center">
              This approach enables effective pain relief without the need to change established surgical
              practices. AMT-143 is administered via local injection with a pre-filled syringe during
              surgery. The formulation is specifically optimized to maintain pain control throughout the
              critical post-operative period, supporting patient comfort and facilitating a smoother
              recovery.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed text-center">
              AMT-143 has undergone clinical evaluation in a Phase 1 trial, demonstrating a sustained
              release of ropivacaine for up to 14 days. The program is now progressing towards Phase 2
              clinical development in partnership with Pacira BioSciences, with the next phase anticipated
              to begin in 2026.
            </p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP VIEW (unchanged) ── */}
      <div className="hidden lg:block" style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <Image
          src='/images/amtinfo-bg.png'
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="relative z-10 px-50 mt-25">
          <div className="mb-8 relative z-10">
            <span className="inline-block border border-[#0d2a4e] text-[#0d2a4e] text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase px-3 py-1.5">
              AMACA THERA
            </span>
          </div>
          <h2 className="text-xl sm:text-xl md:text-2xl font-bold text-[#0d2a4e] leading-snug max-w-xl mb-8 relative z-10">
            The introduction of AMT-143 to the market will offer significant benefits to patients, clinicians,
            and the wider healthcare community seeking alternatives to addictive medications
          </h2>
          <div className="space-y-5 max-w-lg relative z-10">
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
              AMT-143 (AmacaGel) is an innovative, long-acting, non-opioid anesthetic designed for post-operative
              pain management. Utilizing AmacaThera&apos;s advanced, tunable hydrogel drug delivery platform, AMT-143
              delivers a sustained, localized release of ropivacaine directly to the surgical site.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              This approach enables effective pain relief without the need to change established surgical practices.
              AMT-143 is administered via local injection with a pre-filled syringe during surgery. The formulation is
              specifically optimized to maintain pain control throughout the critical post-operative period,
              supporting patient comfort and facilitating a smoother recovery.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              AMT-143 has undergone clinical evaluation in a Phase 1 trial, demonstrating a sustained release of
              ropivacaine for up to 14 days. The program is now progressing towards Phase 2 clinical development in
              partnership with Pacira BioSciences, with the next phase anticipated to begin in 2026.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AMT143InfoCard;