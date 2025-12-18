'use client';
import { Upload, Calendar } from 'lucide-react';
import React, { useState } from 'react';

export default function PublicationForm() {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    date: '',
    category: 'AmacaGel Platform',
    abstract: '',
    pdfFile: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFormData(prev => ({
      ...prev,
      pdfFile: file
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Publication created successfully!');
  };

  const handleReset = () => {
    setFormData({
      title: '',
      authors: '',
      journal: '',
      date: '',
      category: 'AmacaGel Platform',
      abstract: '',
      pdfFile: null
    });
  };

  return (
    <div className=" overflow-scroll w-full flex justify-center scrollbar-hide bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}

      {/* Main Content */}
      <div className="p-8">
      <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
        <h1 className="text-3xl font-bold text-[#0f3a66]">Add Publications</h1>
      </div>
        <div className="">
          {/* Form Card */}
          <div className="bg-white rounded-b-2xl shadow-md p-8">
            <div className="space-y-6">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter publication title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900"
                />
              </div>

              {/* Authors Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Authors
                </label>
                <input
                  type="text"
                  name="authors"
                  value={formData.authors}
                  onChange={handleInputChange}
                  placeholder="Enter authors (comma separated)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900"
                />
              </div>

              {/* Journal Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Journal
                </label>
                <input
                  type="text"
                  name="journal"
                  value={formData.journal}
                  onChange={handleInputChange}
                  placeholder="Enter journal name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900"
                />
              </div>

              {/* Date Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Category Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900 bg-white cursor-pointer appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M1 4l5 4 5-4'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="AmacaGel Platform">AmacaGel Platform</option>
                  <option value="Small Molecules">Small Molecules</option>
                  <option value="Polymers">Polymers</option>
                  <option value="Hydrogels">Hydrogels</option>
                  <option value="Drug Delivery">Drug Delivery</option>
                </select>
              </div>

              {/* Abstract Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Abstract
                </label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleInputChange}
                  placeholder="Enter publication abstract"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900 resize-none"
                />
              </div>

              {/* File Upload Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Access PDF
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">
                      {formData.pdfFile ? formData.pdfFile.name : 'Choose File'}
                    </span>
                    <span className="text-gray-500 ml-auto text-sm">
                      {formData.pdfFile ? '' : 'No file chosen'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md"
                >
                  Create Publication
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}