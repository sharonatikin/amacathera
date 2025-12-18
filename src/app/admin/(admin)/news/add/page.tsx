'use client';
import { Upload, Calendar, Globe } from 'lucide-react';
import React, { useState } from 'react';

interface NewsFormData {
  mainHeading: string;
  subHeading: string;
  date: string;
  pressReleaseLink: string;
  uploadImage: File | null;
  videoUrl: string;
  content: string;
}

export default function NewsCreateForm(): React.ReactElement {
  const [formData, setFormData] = useState<NewsFormData>({
    mainHeading: '',
    subHeading: '',
    date: '',
    pressReleaseLink: '',
    uploadImage: null,
    videoUrl: '',
    content: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.currentTarget.files?.[0];
    setFormData(prev => ({
      ...prev,
      uploadImage: file || null
    }));
  };

  const handleSubmit = (): void => {
    console.log('Form submitted:', formData);
    alert('News created successfully!');
  };

  const handleReset = (): void => {
    setFormData({
      mainHeading: '',
      subHeading: '',
      date: '',
      pressReleaseLink: '',
      uploadImage: null,
      videoUrl: '',
      content: ''
    });
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100">

      {/* Main Content */}
      <div className="p-8 w-full ">
        <div className=" ">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="space-y-6">
              {/* News Main Heading Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  News Main Heading
                </label>
                <input
                  type="text"
                  name="mainHeading"
                  value={formData.mainHeading}
                  onChange={handleInputChange}
                  placeholder="Enter news main heading"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900"
                />
              </div>

              {/* Sub Heading Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Sub Heading
                </label>
                <input
                  type="text"
                  name="subHeading"
                  value={formData.subHeading}
                  onChange={handleInputChange}
                  placeholder="Enter sub heading"
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

              {/* Press Release Link Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Press Release Link
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="pressReleaseLink"
                    value={formData.pressReleaseLink}
                    onChange={handleInputChange}
                    placeholder="https://example.com/press-release"
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900"
                  />
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Upload Image Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Upload Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-900 font-medium">Choose File</span>
                    <span className="text-gray-500 text-sm ml-auto">
                      {formData.uploadImage ? formData.uploadImage.name : 'No file chosen'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Video URL Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Video URL (YouTube Link)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900"
                  />
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Content Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Content
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Enter news content"
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6 justify-end">
                <button
                  onClick={handleReset}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md"
                >
                  Add News
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}