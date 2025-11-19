import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const TeamCard = ({ member }:{member:{image:string,name:string,title:string,description:string,url:string}}) => {
  return (
    <Link href={`/team/${member.url}`}  className="">
      {/* Card Container */}
      <div className=" overflow-hidden flex flex-col items-center  flex-grow">
        {/* Image */}
        <div className="relative top-20">
          <div className="aspect-square  w-full max-w-[280px] mx-auto pt-8 px-8">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-contain rounded-3xl"
            />
          </div>
        </div>

        {/* Name and Title Card */}
        <div className="bg-blue-900 h-70 lg:min-w-xs px-10 rounded-2xl pt-30 text-white py-8 text-center mt-4">
          <h3 className="text-xl md:text-2xl  font-bold mb-2">
            {member.name}
          </h3>
          <p className="text-base md:text-lg text-wrap max-w-48 leading-relaxed">
            {member.title.split('&').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part.trim()}
                {i < arr.length - 1 && (
                  <>
                    <br />&
                  </>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>

      {/* Description Card with Shadow */}
      <div className="  px-6 py-6 -mt-5 h-30 flex  items-center  bg-white/0 backdrop-blur-lg rounded-xl border border-white/30 shadow-xl min-w-[200px]">
        <div className="flex items-start justify-between  gap-4">
          <p className="text-gray-700 text-sm leading-relaxed flex-grow">
            {member.description}
          </p>
          <button className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-blue-900 flex items-center justify-center hover:bg-blue-900 hover:text-white transition-colors">
            <ArrowRight className="w-6 h-6 text-blue-900 hover:text-white" />
          </button>
        </div>
      </div>
    </Link>
  )
}

export default TeamCard
