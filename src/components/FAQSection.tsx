'use client';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import {faqData} from '@/const/qna';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);


  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center py-16 px-4">
      <div className="max-w-6xl w-full">
        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-[#1e3a5f] text-center mb-12">
          Frequently asked questions
        </h1>

        {/* FAQ Grid Container */}
        <div className="border-2 border-blue-400 rounded-2xl p-8 bg-white/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left"
                >
                  <span className="text-base font-medium text-gray-900 leading-relaxed flex-1">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 mt-1">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
                    )}
                  </span>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}