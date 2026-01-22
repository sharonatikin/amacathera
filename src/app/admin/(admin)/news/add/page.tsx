'use client';
import { Upload, Calendar, Globe, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  const route = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.currentTarget.files?.[0];
    
    if (file) {
      // Validate file type
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validImageTypes.includes(file.type)) {
        setError('Only image files (JPEG, PNG, GIF, WebP) are allowed');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image file size cannot exceed 10MB');
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      uploadImage: file || null
    }));
    setError('');
  };

  const handleSubmit = async (): Promise<void> => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.mainHeading || !formData.subHeading || !formData.date || !formData.content) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      // Validate URL fields if provided
      if (formData.pressReleaseLink && !isValidUrl(formData.pressReleaseLink)) {
        setError('Invalid Press Release Link URL');
        setIsLoading(false);
        return;
      }

      if (formData.videoUrl && !isValidUrl(formData.videoUrl)) {
        setError('Invalid Video URL');
        setIsLoading(false);
        return;
      }

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('mainHeading', formData.mainHeading);
      submitData.append('subHeading', formData.subHeading);
      submitData.append('date', formData.date);
      submitData.append('pressReleaseLink', formData.pressReleaseLink);
      submitData.append('videoUrl', formData.videoUrl);
      submitData.append('content', formData.content);

      if (formData.uploadImage) {
        submitData.append('uploadImage', formData.uploadImage);
      }

      const response = await fetch('/api/news', {
        method: 'POST',
        body: submitData,
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create news');
        setIsLoading(false);
        return;
      }

      setSuccess('News created successfully!');
      handleReset();

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
        route.push('/admin/news');
      }, 3000);
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred while creating the news');
    } finally {
      setIsLoading(false);
    }
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
    setError('');
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      {/* Main Content */}
      <div className="p-8 w-full">
        <div>
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-md p-8">
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

            <div className="space-y-6">
              {/* News Main Heading Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  News Main Heading *
                </label>
                <input
                  type="text"
                  name="mainHeading"
                  value={formData.mainHeading}
                  onChange={handleInputChange}
                  placeholder="Enter news main heading"
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900 disabled:bg-gray-100"
                />
              </div>

              {/* Sub Heading Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Sub Heading *
                </label>
                <input
                  type="text"
                  name="subHeading"
                  value={formData.subHeading}
                  onChange={handleInputChange}
                  placeholder="Enter sub heading"
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900 disabled:bg-gray-100"
                />
              </div>

              {/* Date Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900 disabled:bg-gray-100"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Press Release Link Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Press Release Link (Optional)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="pressReleaseLink"
                    value={formData.pressReleaseLink}
                    onChange={handleInputChange}
                    placeholder="https://example.com/press-release"
                    disabled={isLoading}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900 disabled:bg-gray-100"
                  />
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Upload Image Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Upload Image (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 font-medium">Choose File</span>
                    <span className="text-gray-500 text-sm ml-auto">
                      {formData.uploadImage 
                        ? `${formData.uploadImage.name} (${(formData.uploadImage.size / 1024 / 1024).toFixed(2)}MB)`
                        : 'Max 10MB'
                      }
                    </span>
                  </label>
                </div>
              </div>

              {/* Video URL Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Video URL (Optional)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/watch?v=..."
                    disabled={isLoading}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900 disabled:bg-gray-100"
                  />
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Content Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Content *
                </label>



                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Enter news content"
                  rows={8}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900 resize-none disabled:bg-gray-100"
                />
                                {/* Expandable Instructions */}
                <button
                  type="button"
                  onClick={() => setShowInstructions(!showInstructions)}
                  disabled={isLoading}
                  className="mb-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${showInstructions ? 'rotate-180' : ''}`}
                  />
                  Writing Guidelines
                </button>

                {showInstructions && (
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700 space-y-3">
                    <div className="font-semibold text-blue-900 mb-3">How to write effective news content:</div>
                    
                    <div>
                      <span className="font-semibold text-gray-900">Start Strong:</span> Begin with the most important information. Readers should understand the news in the first few lines.
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Structure:</span> Use clear paragraphs. Each paragraph should focus on one idea. Keep sentences concise and simple.
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Context & Impact:</span> Explain why this news matters. Include relevant background information and potential impacts on readers.
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Facts Over Opinion:</span> Stick to verifiable facts. If including quotes or opinions, clearly attribute them.
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Length:</span> Aim for 150-500 words for optimal readability. Longer news should be well-organized with subheadings if possible.
                    </div>

                    <div className="border-t border-blue-200 pt-3 mt-3">
                      <div className="font-semibold text-blue-900 mb-2">Formatting Tips:</div>
                      
                      <div className="bg-white rounded p-3 space-y-2 text-xs font-mono">
                        <div>
                          <span className="font-semibold text-gray-900">Make Text Bold:</span>
                          <div className="text-gray-600 mt-1">Use asterisks: <span className="text-blue-600">**bold text**</span> → <strong>bold text</strong></div>
                        </div>
                        
                        <div>
                          <span className="font-semibold text-gray-900">Make Text Italic:</span>
                          <div className="text-gray-600 mt-1">Use single asterisks: <span className="text-blue-600">*italic text*</span> → <em>italic text</em></div>
                        </div>
                        
                        <div>
                          <span className="font-semibold text-gray-900">Main Heading:</span>
                          <div className="text-gray-600 mt-1"><span className="text-blue-600"># Your Main Heading</span></div>
                        </div>
                        
                        <div>
                          <span className="font-semibold text-gray-900">Sub Heading:</span>
                          <div className="text-gray-600 mt-1"><span className="text-blue-600">## Your Sub Heading</span></div>
                        </div>

                        <div>
                          <span className="font-semibold text-gray-900">Line Break (Space Between):</span>
                          <div className="text-gray-600 mt-1">Leave a blank line between paragraphs</div>
                        </div>

                        <div>
                          <span className="font-semibold text-gray-900">Example Structure:</span>
                          <div className="text-gray-600 mt-1 bg-gray-50 p-2 rounded">
                            <div># Main News Heading</div>
                            <div className="mt-2">First paragraph about the news.</div>
                            <div className="mt-2">## Key Details</div>
                            <div className="mt-2">Second paragraph with important information.</div>
                            <div className="mt-2">## Impact & Next Steps</div>
                            <div className="mt-2">Final paragraph explaining the impact.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6 justify-end">
                <button
                  onClick={handleReset}
                  disabled={isLoading}
                  className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Adding...' : 'Add News'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}