'use client';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

interface NewsItem {
  id: number;
  mainHeading: string;
  subHeading: string;
  date: string;
  content: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    mainHeading: "AmacaThera and Merck Animal Health Announce Collaboration in Animal Health",
    subHeading: "AmacaThera, a clinical-stage biotechnology company specializing in drug delivery, announced it has signed a binding evaluation and option agreement with Merck Animal Health",
    date: "May 1, 2025",
    content: "AmacaThera, a clinical-stage biotechnology company specializing in drug delivery, announced it has s..."
  },
  {
    id: 2,
    mainHeading: "Amacathera Collaborates With Leading Global Pharmaceutical Company",
    subHeading: "Amacathera Collaborates With Leading Global Pharmaceutical Company To Develop Single-Injection, Long-Acting Biologic Using Its Advanced Hydrogel Delivery Platform, Amacagel™",
    date: "April 8, 2025",
    content: "TORONTO, April 8, 2025 /PRNewswire/ -- AmacaThera, a clinical-stage biotechnology company specializi..."
  },
  {
    id: 3,
    mainHeading: "RBCx features Amacathera's journey",
    subHeading: "RBCx, the tech banking and investment arm of the Royal Bank of Canada, has featured AmacaThera's drug development platform and start-up journey.",
    date: "June 13, 2024",
    content: "RBCx, the tech banking and investment arm of the Royal Bank of Canada, has featured AmacaThera's dru..."
  },
  {
    id: 4,
    mainHeading: "AmacaThera Closes Series A Extension to Advance Clinical Development of Long Acting, Localized, Non-Opioid Therapeutics to Improve Post-Surgery Patient Care",
    subHeading: "AmacaThera, a leader in the development of novel injectable, localized therapeutics based upon its AmacaGel delivery platform, announced the closing of a CAD$4.0 million financing round.",
    date: "November 28, 2023",
    content: "Toronto, ON — AmacaThera, a leader in the development of novel injectable, localized therapeutics ba..."
  },
  {
    id: 5,
    mainHeading: "New study setting the stage for non-opioid analgesic in post-surgical pain",
    subHeading: "AmacaThera collaborates with University Health Network to evaluate the economic impact of post-surgical opioid use. They are developing non-opioid analgesic in post-surgical pain",
    date: "July 5, 2023",
    content: "Toronto, ON — Patients are often prescribed opioids after surgery, and AmacaThera is developing non-opioid analgesic in post-surgical pain..."
  }
];

interface NewsRowProps {
  news: NewsItem;
}

const NewsRow: React.FC<NewsRowProps> = ({ news }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4">
      <p className="text-sm text-gray-900 font-semibold line-clamp-2">{news.mainHeading}</p>
    </td>
    <td className="px-6 py-4">
      <p className="text-sm text-gray-700 line-clamp-2">{news.subHeading}</p>
    </td>
    <td className="px-6 py-4">
      <p className="text-sm text-gray-900 font-medium whitespace-nowrap">{news.date}</p>
    </td>
    <td className="px-6 py-4">
      <p className="text-sm text-gray-700 line-clamp-2">{news.content}</p>
    </td>
    <td className="px-6 py-4">
      <div className="flex flex-col gap-2">
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 justify-center">
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
        <button className="px-4 py-2 text-red-500 hover:bg-red-50 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 justify-center">
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function NewsDashboard(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredNews = newsData.filter(news =>
    news.mainHeading.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.subHeading.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="p-8">
        {/* News Section */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Section Header */}
          <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">News</h2>
            <div className='flex gap-2'>
          {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Main/Sub Head..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          {/* Add News Button */}
            <Link href={'/admin/news/add'} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm hover:shadow-md">
              <Plus className="w-5 h-5" />
              Add News
            </Link>
            </div>

          </div>


          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Main Heading</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sub Heading</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Content</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((news) => (
                  <NewsRow key={news.id} news={news} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Stats */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredNews.length}</span> of <span className="font-semibold">{newsData.length}</span> news items
          </div>
        </div>
      </div>
    </div>
  );
}