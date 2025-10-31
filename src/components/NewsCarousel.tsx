'use client';
import { useState } from 'react';

export default function NewsSection() {
  const [activeSlide, setActiveSlide] = useState(3);

  const newsItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
      title: "Amacathera Collaborates With Leading Global Pharmaceutical Company",
      description: "TORONTO, April 8, 2025 /PRNewswire/ -- AmacaThera, a clinical-stage biotechnology company specializing in drug delivery, announced a new pipeline program in collaboration with a leading global pharmaceutical company...",
      date: "April 8, 2025",
      link: "Press Release"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80",
      title: "Amacathera Collaborates With Leading Global Pharmaceutical Company",
      description: "TORONTO, April 8, 2025 /PRNewswire/ -- AmacaThera, a clinical-stage biotechnology company specializing in drug delivery, announced a new pipeline program in collaboration with a leading global pharmaceutical company...",
      date: "April 8, 2025",
      link: "Press Release"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80",
      title: "Amacathera Collaborates With Leading Global Pharmaceutical Company",
      description: "TORONTO, April 8, 2025 /PRNewswire/ -- AmacaThera, a clinical-stage biotechnology company specializing in drug delivery, announced a new pipeline program in collaboration with a leading global pharmaceutical company...",
      date: "April 8, 2025",
      link: "Press Release"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
      title: "Amacathera Collaborates With Leading Global Pharmaceutical Company",
      description: "TORONTO, April 8, 2025 /PRNewswire/ -- AmacaThera, a clinical-stage biotechnology company specializing in drug delivery, announced a new pipeline program in collaboration with a leading global pharmaceutical company...",
      date: "April 8, 2025",
      link: "Press Release"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
      title: "Amacathera Collaborates With Leading Global Pharmaceutical Company",
      description: "TORONTO, April 8, 2025 /PRNewswire/ -- AmacaThera, a clinical-stage biotechnology company specializing in drug delivery, announced a new pipeline program in collaboration with a leading global pharmaceutical company...",
      date: "April 8, 2025",
      link: "Press Release"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
      title: "Amacathera Collaborates With Leading Global Pharmaceutical Company",
      description: "TORONTO, April 8, 2025 /PRNewswire/ -- AmacaThera, a clinical-stage biotechnology company specializing in drug delivery, announced a new pipeline program in collaboration with a leading global pharmaceutical company...",
      date: "April 8, 2025",
      link: "Press Release"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
      title: "Amacathera Collaborates With Leading Global Pharmaceutical Company",
      description: "TORONTO, April 8, 2025 /PRNewswire/ -- AmacaThera, a clinical-stage biotechnology company specializing in drug delivery, announced a new pipeline program in collaboration with a leading global pharmaceutical company...",
      date: "April 8, 2025",
      link: "Press Release"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-slate-100 relative overflow-hidden">
      {/* Decorative Corner Lines */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-12 left-0 w-24 h-px bg-blue-300" />
        <div className="absolute top-0 left-12 w-px h-24 bg-blue-300" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute top-12 right-0 w-24 h-px bg-blue-300" />
        <div className="absolute top-0 right-12 w-px h-24 bg-blue-300" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <div className="absolute bottom-12 left-0 w-24 h-px bg-blue-300" />
        <div className="absolute bottom-0 left-12 w-px h-24 bg-blue-300" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <div className="absolute bottom-12 right-0 w-24 h-px bg-blue-300" />
        <div className="absolute bottom-0 right-12 w-px h-24 bg-blue-300" />
      </div>

      {/* Vertical Side Lines */}
      <div className="absolute left-12 top-32 bottom-32 w-px bg-gradient-to-b from-blue-200 via-blue-100 to-blue-200" />
      <div className="absolute right-12 top-32 bottom-32 w-px bg-gradient-to-b from-blue-200 via-blue-100 to-blue-200" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-16">
        {/* Title */}
        <h1 className="text-6xl lg:text-7xl font-bold text-[#1e3a5f] mb-20">
          News
        </h1>

        {/* News Card */}
        <div className="max-w-5xl w-full mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white/40 backdrop-blur-sm rounded-3xl p-8 lg:p-12">
            {/* Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src={newsItems[activeSlide].image}
                  alt="Business handshake"
                  className="w-full h-auto rounded-3xl shadow-xl object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#1e3a5f] leading-tight">
                {newsItems[activeSlide].title}
              </h2>
              <p className="text-[#1e3a5f] text-base leading-relaxed">
                {newsItems[activeSlide].description}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[#1e3a5f] font-semibold">
                  {newsItems[activeSlide].date}
                </span>
                <a 
                  href="#" 
                  className="text-[#1e3a5f] font-bold underline hover:text-[#2d5a8f] transition"
                >
                  {newsItems[activeSlide].link}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-3">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? 'bg-[#1e3a5f] w-12'
                  : 'bg-gray-300 w-8 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}