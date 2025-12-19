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
    pdfFile: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add Publications</h1>
          <p className="text-gray-600 mt-2">Submit a new publication to the database</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
              placeholder="Enter author names (comma separated)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Publication Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option>AmacaGel Platform</option>
              <option>Small Molecules</option>
              <option>Polymers</option>
              <option>Hydrogels</option>
              <option>Drug Delivery</option>
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
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
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
  );
}