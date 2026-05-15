import Image from 'next/image';// Path from your component to the image in 'public'

const AMT143InfoCard = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Image
        src='/images/amt-fullbg.png' // Path to your image in the 'public' folder
        alt="Background"
        layout="fill" // Ensures the image fills the parent container
        objectFit="cover" // Controls how the image scales and crops
        quality={100} // Adjust image quality (0-100)
        priority // Preloads this important image
      />
      <div className='relative z-10 px-50 mt-25' >     
        <div className="mb-8 relative z-10">
          <span className="inline-block border border-[#0d2a4e] text-[#0d2a4e] text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase px-3 py-1.5">
            AMACA THERA
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-xl md:text-2xl font-bold text-[#0d2a4e] leading-snug max-w-xl mb-8 relative z-10">
          The introduction of AMT-143 to the market will offer significant benefits to patients, clinicians, and the wider healthcare community seeking alternatives to addictive medications
        </h2>

        {/* Body paragraphs */}
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
  );
};

export default AMT143InfoCard;