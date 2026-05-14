// components/about/OurTeam.tsx
import React from 'react';
import { Users } from 'lucide-react';
import Link from 'next/link';

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  url?: string;
}

const seniorTeam: TeamMember[] = [
  { name: "Dr. Mike Cooke", role: "Co-Founder & CEO", image: "/images/team/mikecooke.png", url: "mike-cooke" },
  { name: "Dr. Molly Shoichet", role: "Co-Founder & Chief Science Officer", image: "/images/team/mollyshoichet.png", url: "molly-shoichet" },
  { name: "Andrew Bishop", role: "Chief Financial Officer", image: "/images/team/andrew.jpg",  },
  { name: "Abhaya Khulbe CFA", role: "Chief of Staff & Materials Engineer", image: "/images/team/abhayakhulbe.png", url: "abhaya-khulbe" },
];

const scientificTeam: TeamMember[] = [
  {
    name: "Timothy Cheung",
    role: "Scientist",
    image: "/images/team/timothycheung.png",
    url: "timothy-cheung",
  },
  {
    name: "Kevin Wai",
    role: "Scientist",
    image: "/images/team/kevinwai.png",
    url: "kevin-wai",
  },
  {
    name: "Elaine Reguera",
    role: "Senior Scientist",
    image: "/images/team/elainereguera.png",
    url: "elaine-reguera",
  },
  { name: "Lee Ann Girgotti", role: "Scientist", image: "", url: "" },
  { name: "Neil Jurkiewiecz", role: "Scientist", image: "", url: "" },
  { name: "Nazli Hassnepou", role: "Scientist", image: "", url: "" }
];

const getInitial = (name: string) =>
  name.replace(/^Dr\.\s|^Prof\.\s/, '').charAt(0).toUpperCase();

const TeamCard = ({ member }: { member: TeamMember }) => {
  const content = (
    <div className="flex flex-col items-center">
      {/* Avatar Box */}
      <div className="w-70 aspect-square rounded-xl bg-[#0d2a4e] flex flex-1 items-center justify-center mb-3 sm:mb-4 overflow-hidden">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <span className="text-4xl sm:text-5xl font-light text-white/80">
            {getInitial(member.name)}
          </span>
         )} 
      </div>
      {/* Info */}
      <h3 className="text-sm sm:text-base font-semibold text-[#0d2a4e] text-center leading-snug">
        {member.name}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 text-center mt-0.5 leading-snug">
        {member.role}
      </p>
    </div>
  );

  return member.url ? (
    <Link href={`/about-us/our-team/${member.url}`} className="flex flex-col">
      {content}
    </Link>
  ) : (
    <div className="flex flex-col">{content}</div>
  );
};

const OurTeam = () => {
  return (
    <section id="our-team" className="w-full bg-white px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20">

      {/* Section Header */}
      <div className="flex items-start gap-4 mb-10 sm:mb-12">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#0d2a4e] flex items-center justify-center flex-shrink-0 mt-1">
          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-[#0d2a4e] tracking-tight leading-none mb-2">
            Our Team
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-light leading-relaxed max-w-xl">
            AmacaThera&apos;s leadership team brings together expertise in business, science, and engineering to
            transform drug delivery
          </p>
        </div>
      </div>

      {/* Senior Management Team */}
      <div className="mb-12 sm:mb-16">
        <h3 className="text-lg sm:text-xl font-light text-[#0d2a4e] mb-6 sm:mb-8 tracking-wide">
          Senior Management Team
        </h3>
        <div className="flex flex-wrap justify-around gap-4 sm:gap-6">
          {seniorTeam.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 mb-12 sm:mb-16" />

      {/* Scientific Team */}
      <div>
        <h3 className="text-lg sm:text-xl font-light text-[#0d2a4e] mb-2 tracking-wide">
          Scientific Team
        </h3>
        <p className="text-slate-400 text-sm sm:text-base font-light mb-6 sm:mb-8">
          The AmacaThera scientific team driving next-generation therapeutics
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-4 sm:gap-6">
          {scientificTeam.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default OurTeam;