import React from 'react';
import { ArrowRight } from 'lucide-react';
import TeamCard from '../ui/TeamCard';
import { url } from 'inspector';

const ScienceTeam: React.FC = () => {
  const teamMembers = [
    {
      name: 'Timothy Cheung',
      title: 'Scientist',
      image: '/images/team/timothycheung.png',
      description: 'Dr. Timothy Cheung joined AmacaThera in 2024 as an expert in polymer chemistry...',
      url:"timothy-cheung"
    },
    {
      name: 'Kevin Wai',
      image: '/images/team/kevinwai.png',
      title: 'Scientist',
      description: "Kevin Wai holds a Master's degree in Chemical Biology from McMaster University...",
      url:"kevin-wai"
    },
    {
      name: 'Elaine Reguera',
      title: 'Senior Scientist',
      image: '/images/team/elainereguera.png',
      description: 'Dr. Elaine Reguera holds a PhD in Medical Biophysics from the University of Toronto, as well...',
      url:"elaine-reguera"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-800">Science Team</h1>
        </div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScienceTeam;