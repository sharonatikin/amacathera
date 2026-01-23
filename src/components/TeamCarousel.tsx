'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function OurTeamLeadership() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const teamMembers = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
      name: "Lörem ipsum",
      description: "Lörem ipsum od ohet dilagi. Bell trabel, samuligt, ohöbel utom diska. Jinesade bel när feras redorade i belogi. FAR paratyp i muväning, och pesask vyfisat. Viktiga poddradio har un mad och inde."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
      name: "Lörem ipsum",
      description: "Lörem ipsum od ohet dilagi. Bell trabel, samuligt, ohöbel utom diska. Jinesade bel när feras redorade i belogi. FAR paratyp i muväning, och pesask vyfisat. Viktiga poddradio har un mad och inde."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&q=80",
      name: "Lörem ipsum",
      description: "Lörem ipsum od ohet dilagi. Bell trabel, samuligt, ohöbel utom diska. Jinesade bel när feras redorade i belogi. FAR paratyp i muväning, och pesask vyfisat. Viktiga poddradio har un mad och inde."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
      name: "Lörem ipsum",
      description: "Lörem ipsum od ohet dilagi. Bell trabel, samuligt, ohöbel utom diska. Jinesade bel när feras redorade i belogi. FAR paratyp i muväning, och pesask vyfisat. Viktiga poddradio har un mad och inde."
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80",
      name: "Lörem ipsum",
      description: "Lörem ipsum od ohet dilagi. Bell trabel, samuligt, ohöbel utom diska. Jinesade bel när feras redorade i belogi. FAR paratyp i muväning, och pesask vyfisat. Viktiga poddradio har un mad och inde."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (teamMembers.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (teamMembers.length - 2)) % (teamMembers.length - 2));
  };

  return (
    <div className="min-h-screen w-full  relative">

      {/* Main white/light content area */}
      <div className="relative py-16 px-8 bg-gradient-to-b from-gray-100 to-blue-50 min-h-[700px]">
        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-[#0f3a6f] text-center mb-20">
          Our Team & Leadership
        </h1>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 text-[#0f3a6f] hover:text-[#1a5a9f] transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-12 h-12 lg:w-16 lg:h-16" strokeWidth={1.5} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 text-[#0f3a6f] hover:text-[#1a5a9f] transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-12 h-12 lg:w-16 lg:h-16" strokeWidth={1.5} />
        </button>

        {/* Cards Container */}
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 lg:gap-14">
          {teamMembers.slice(currentSlide, currentSlide + 3).map((member) => (
            <div key={member.id} className="relative w-full max-w-72  flex-shrink-0">
              {/* Image Container - positioned absolutely to overlap */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-48 h-56 rounded-md overflow-hidden shadow-2xl ">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Blue Card Container */}
              <div className="bg-gradient-to-b from-[#1e5a8f] to-[#0f3a6f] rounded-md p-8 pt-40 text-center mt-32 shadow-xl">
                <h2 className="text-white text-2xl font-bold mb-4">{member.name}</h2>
                
                <p className="text-blue-100 text-sm leading-relaxed font-light">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}