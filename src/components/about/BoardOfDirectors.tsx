// components/about/BoardOfDirectors.tsx
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface BoardMember {
  name: string;
  role?: string;
  image?: string;
}

const boardMembers: BoardMember[] = [
  { name: "Gael Mourant" },
  { name: "Peter van der Velden",  },
  { name: "Dr. Eyal S Ron" },
  { name: "Dr. Molly Shoichet", image: "/images/team/mollyshoichet.png" },
  { name: "Dr. Mike Cooke", image: "/images/team/mikecooke.png" },
  { name: "Gillian Stacey" }
];

const getInitial = (name: string) => {
  const cleaned = name.replace(/^Dr\.\s|^Prof\.\s/, '');
  return cleaned.charAt(0).toUpperCase();
};

const BoardCard = ({ member }: { member: BoardMember }) => (
  <div className="flex-1 min-w-0 bg-slate-50/80 border border-slate-100 rounded-2xl px-6 py-8 flex flex-col items-center gap-4">
    {/* Avatar Circle */}
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0d2a4e] flex items-center justify-center flex-shrink-0">
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span className="text-2xl sm:text-3xl font-light text-white">
          {getInitial(member.name)}
        </span>
      )}
    </div>

    {/* Name */}
    <div className="text-center">
      <h3 className="text-sm sm:text-base font-semibold text-[#0d2a4e] leading-snug">
        {member.name}
      </h3>
      {member.role && (
        <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
          {member.role}
        </p>
      )}
    </div>
  </div>
);

const BoardOfDirectors = () => {
  return (
    <section id='board-of-directors' className="w-full bg-white px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20">

      {/* Section Header */}
      <div className="flex items-start gap-4 mb-10 sm:mb-12">
        {/* Icon Box */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#0d2a4e] flex items-center justify-center flex-shrink-0 mt-1">
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
        </div>

        {/* Title + Subtitle */}
        <div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-[#0d2a4e] tracking-tight leading-none mb-2">
            Board of Directors
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
            AmacaThera is led by a seasoned board providing strategic oversight to advance hydrogel drug delivery
          </p>
        </div>
      </div>

      {/* Board Cards */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {boardMembers.map((member) => (
          <BoardCard key={member.name} member={member} />
        ))}
      </div>

    </section>
  );
};

export default BoardOfDirectors;