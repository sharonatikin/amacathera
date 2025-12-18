'use client';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const publicationsData = [
  {
    id: 1,
    title: "Accelerated release of a sparingly soluble drug from an injectable hyaluronan-methylcellulose hydrogel.",
    category: "Small Molecules",
    authors: "Yuanfei Wang, Yakov Lapitsky, Catherine E. Kang, and Molly S. Shoichet.",
    journal: "Published in Journal of Controlled Release, Dec. 2009",
    date: "2009-12-17"
  },
  {
    id: 2,
    title: "A hydrogel composite system for sustained epi-cortical delivery of Cyclosporin A to the brain for treatment of stroke.",
    category: "Small Molecules",
    authors: "Matthew J. Caicco, Michael J. Cooke, Yuanfei Wang, Anup Tuladhar, Cindi M. Morshead, and Molly S. Shoichet.",
    journal: "Published in Journal of Controlled Release, Mar. 2013",
    date: "2013-03-23"
  },
  {
    id: 3,
    title: "Biodegradable polysaccharide-based microspheres for sustained release.",
    category: "Polymers",
    authors: "Smith, J., Johnson, K., Williams, R.",
    journal: "Published in Biomaterials Review, Jan. 2020",
    date: "2020-01-15"
  }
];

const PublicationRow = ({ publication }:{publication:{id:number,title:string,category:string,authors:string,journal:string,date:string}}) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4">
      <p className="text-sm text-gray-900 font-medium line-clamp-2">{publication.title}</p>
    </td>
    <td className="px-6 py-4">
      <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
        {publication.category}
      </span>
    </td>
    <td className="px-6 py-4">
      <p className="text-sm text-gray-600 line-clamp-1">{publication.authors}</p>
    </td>
    <td className="px-6 py-4">
      <p className="text-sm text-gray-600 line-clamp-2">{publication.journal}</p>
    </td>
    <td className="px-6 py-4">
      <p className="text-sm text-gray-900 font-medium">{publication.date}</p>
    </td>
    <td className="px-6 py-4">
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2">
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
        <button className="px-4 py-2 text-red-500 hover:bg-red-50 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2">
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function PublicationsDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">

      {/* Main Content */}
      <div className="p-8">
        {/* Publications Section */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Section Header */}
          <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#0f3a66]">Publications</h2>
            <div className='flex gap-2'>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
                        <Link href={'/admin/publications/create'} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm hover:shadow-md">
              <Plus className="w-5 h-5" />
              Add Publication
            </Link>
            </div>

          </div>


          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Authors</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Journal</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {publicationsData.map((pub) => (
                  <PublicationRow key={pub.id} publication={pub} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Stats */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
            Showing <span className="font-semibold">{publicationsData.length}</span> publications
          </div>
        </div>
      </div>
    </div>
  );
}