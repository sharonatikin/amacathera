'use client';
import { Upload, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }
    if (file && file.size > 50 * 1024 * 1024) {
      setError('File size cannot exceed 50MB');
      return;
    }
    setFormData(prev => ({
      ...prev,
      pdfFile: file
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.authors || !formData.journal || !formData.date || !formData.abstract) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('authors', formData.authors);
      submitData.append('journal', formData.journal);
      submitData.append('date', formData.date);
      submitData.append('category', formData.category);
      submitData.append('abstract', formData.abstract);
      
      if (formData.pdfFile) {
        submitData.append('pdfFile', formData.pdfFile);
      }

      const response = await fetch('/api/publications', {
        method: 'POST',
        body: submitData,
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create publication');
        setIsLoading(false);
        return;
      }

      setSuccess('Publication created successfully!');
      handleReset();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred while creating the publication');
    } finally {
      setIsLoading(false);
    }
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

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white text-black rounded-lg shadow-md p-8 space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter publication title"
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
            />
          </div>

          {/* Authors Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Authors *
            </label>
            <input
              type="text"
              name="authors"
              value={formData.authors}
              onChange={handleInputChange}
              placeholder="Enter author names (comma separated)"
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
            />
          </div>

          {/* Journal Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Journal *
            </label>
            <input
              type="text"
              name="journal"
              value={formData.journal}
              onChange={handleInputChange}
              placeholder="Enter journal name"
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
            />
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Publication Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
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
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
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
              Abstract *
            </label>
            <textarea
              name="abstract"
              value={formData.abstract}
              onChange={handleInputChange}
              placeholder="Enter publication abstract"
              rows={5}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none disabled:bg-gray-100"
            />
          </div>

          {/* File Upload Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Access PDF (Optional)
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
                id="pdf-upload"
                disabled={isLoading}
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
                  {formData.pdfFile ? `(${(formData.pdfFile.size / 1024 / 1024).toFixed(2)}MB)` : 'Max 50MB'}
                </span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Create Publication'}
            </button>
            <button
              onClick={handleReset}
              disabled={isLoading}
              className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}