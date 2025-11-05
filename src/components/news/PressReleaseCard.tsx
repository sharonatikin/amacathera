import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function PressReleaseCard({item}: {item: {image: string, title: string, description: string, category: string, date: string}}) { return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Image Section */}
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={`/images/news/${item.image}`}
            alt="Business handshake"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          {/* Title */}
          <h2 className="font-bold text-blue-900  leading-tight text-lg mb-3">
            {item.title}
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-sm leading-relaxed mb-8 line-clamp-4">
            {item.description}
          </p>

          {/* Footer Section */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            {/* Date and Type */}
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-xs">{item.date}</span>
              <a href="#" className="text-blue-900 font-semibold text-sm hover:underline ">
                {item.category}
              </a>
            </div>

            {/* Read More Button */}
            <button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors">
              Read More
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}