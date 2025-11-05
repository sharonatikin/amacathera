import React from 'react';
import { ArrowRight } from 'lucide-react';
import TeamCard from '../ui/TeamCard';
import { url } from 'inspector';

const TeamLeadershipPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Dr. Molly Shoichet",
      title: "Co-Founder & Chief Science Officer",
      description: "Biomedical Engineer Polymer design and drug delivery expert",
      image: "/images/team/mollyshoichet.png",
      url:"molly-shoichet"
    },
    {
      name: "Dr. Mike Cooke",
      title: "Co-Founder & CEO",
      description: "Chemical & Biomedical Engineer Polymer design and drug delivery expert",
      image: "/images/team/mikecooke.png",
      url:"mike-cooke"
    },
    {
      name: "Abhaya Khulbe CFA",
      title: "Chief of Staff & Materials Engineer",
      description: "Strategic leader in finance, operations, and commercialization",
      image: "/images/team/abhayakhulbe.png",
      url:"abhaya-khulbe"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-200 via-blue-50 to-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Our Team & Leadership
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            We've brought together commercial leaders, researchers and
            <br className="hidden md:block" />
            biotechnology experts that will transform therapeutics development.
          </p>
        </div>
      </div>

      {/* Senior Management Team Section */}
      <div className="py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-16">
          Senior Management Team
        </h2>

        {/* Team Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 px-4">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamLeadershipPage;