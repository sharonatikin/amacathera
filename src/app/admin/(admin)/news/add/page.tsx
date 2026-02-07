'use client';
import { Upload, Calendar, Globe, AlertCircle, CheckCircle, ChevronDown, Eye, EyeOff, Link as LinkIcon, Bold, Italic } from 'lucide-react';
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
  const [showPreview, setShowPreview] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkModal, setShowLinkModal] = useState(false);

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
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validImageTypes.includes(file.type)) {
        setError('Only image files (JPEG, PNG, GIF, WebP) are allowed');
        return;
      }

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

  // Text formatting functions
  const applyFormatting = (prefix: string, suffix: string = prefix) => {
    const textarea = document.getElementById('content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    
    if (!selectedText) return;

    const newContent = 
      formData.content.substring(0, start) +
      prefix + selectedText + suffix +
      formData.content.substring(end);

    setFormData(prev => ({ ...prev, content: newContent }));
  };

  const applyBold = () => applyFormatting('**', '**');
  const applyItalic = () => applyFormatting('*', '*');
  
  const applyLink = () => {
    const textarea = document.getElementById('content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = formData.content.substring(start, end);
    
    if (!selected) return;
    
    setSelectedText(selected);
    setShowLinkModal(true);
  };

  const insertLink = () => {
    if (!linkUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    const newContent = formData.content.replace(
      selectedText,
      `[${selectedText}](${linkUrl})`
    );

    setFormData(prev => ({ ...prev, content: newContent }));
    setShowLinkModal(false);
    setLinkUrl('');
    setSelectedText('');
  };

  const insertHeading = (level: number) => {
    const prefix = '#'.repeat(level) + ' ';
    const textarea = document.getElementById('content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = formData.content.substring(start, end);
    
    const newContent = 
      formData.content.substring(0, start) +
      prefix + selected +
      formData.content.substring(end);

    setFormData(prev => ({ ...prev, content: newContent }));
  };

  // Parse markdown to HTML for preview
  const parseContentToHTML = (content: string): string => {
    let html = content;
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">$1</a>');
    
    // Headings
    html = html.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold text-slate-800 mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold text-slate-800 mt-6 mb-3">$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold text-slate-800 mt-8 mb-4">$1</h1>');
    
    // Line breaks to paragraphs
    html = html.split('\n\n').map(p => `<p class="text-slate-700 leading-relaxed mb-4">${p.trim()}</p>`).join('');
    
    return html;
  };

  const handleSubmit = async (): Promise<void> => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (!formData.mainHeading || !formData.subHeading || !formData.date || !formData.content) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

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
    <div className="min-h-screen bg-gray-100">
      <div className="p-8 w-full">
        <div>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Add News</h1>
                <p className="text-gray-600 mt-2">Create and publish news content</p>
              </div>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                {showPreview ? (
                  <>
                    <EyeOff className="w-5 h-5" />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <Eye className="w-5 h-5" />
                    Show Preview
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section */}
            <div className={showPreview ? 'lg:col-span-1' : 'lg:col-span-3'}>
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
                      News Main Heading <span className="text-red-500">*</span>
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
                      Sub Heading <span className="text-red-500">*</span>
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
                      Date <span className="text-red-500">*</span>
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
                      Content <span className="text-red-500">*</span>
                    </label>

                    {/* Formatting Toolbar */}
                    <div className="mb-3 flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border border-gray-300">
                      <button
                        type="button"
                        onClick={applyBold}
                        disabled={isLoading}
                        className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
                        title="Bold (Select text first)"
                      >
                        <Bold className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={applyItalic}
                        disabled={isLoading}
                        className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
                        title="Italic (Select text first)"
                      >
                        <Italic className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={applyLink}
                        disabled={isLoading}
                        className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
                        title="Add Link (Select text first)"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                      
                      <div className="w-px bg-gray-300"></div>
                      
                      <button
                        type="button"
                        onClick={() => insertHeading(1)}
                        disabled={isLoading}
                        className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors text-sm font-bold disabled:opacity-50"
                        title="Heading 1 (Select text first)"
                      >
                        H1
                      </button>
                      <button
                        type="button"
                        onClick={() => insertHeading(2)}
                        disabled={isLoading}
                        className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors text-sm font-bold disabled:opacity-50"
                        title="Heading 2 (Select text first)"
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={() => insertHeading(3)}
                        disabled={isLoading}
                        className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors text-sm font-bold disabled:opacity-50"
                        title="Heading 3 (Select text first)"
                      >
                        H3
                      </button>
                    </div>

                    <textarea
                      id="content-textarea"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Enter news content..."
                      rows={10}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900 resize-none disabled:bg-gray-100 font-mono text-sm"
                    />

                    {/* Expandable Instructions */}
                    <button
                      type="button"
                      onClick={() => setShowInstructions(!showInstructions)}
                      disabled={isLoading}
                      className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${showInstructions ? 'rotate-180' : ''}`}
                      />
                      Writing Guidelines & Formatting
                    </button>

                    {showInstructions && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700 space-y-3">
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
                            <div className="bg-yellow-50 p-2 rounded mb-2">
                              <span className="font-semibold text-gray-900">📌 How to Use Formatting Tools:</span>
                              <div className="text-gray-600 mt-2">1. <strong>Select</strong> the text or sentence you want to format in the content box</div>
                              <div className="text-gray-600">2. Click the formatting button (Bold, Italic, Link, H1, H2, H3)</div>
                              <div className="text-gray-600">3. For links, a popup will ask for the URL</div>
                              <div className="text-gray-600">4. Your text will be wrapped with the formatting code automatically</div>
                            </div>

                            <div>
                              <span className="font-semibold text-gray-900">Make Text Bold:</span>
                              <div className="text-gray-600 mt-1">Select text → Click <strong>Bold</strong> button → Result: <span className="text-blue-600">**bold text**</span> → <strong>bold text</strong></div>
                            </div>
                            
                            <div>
                              <span className="font-semibold text-gray-900">Make Text Italic:</span>
                              <div className="text-gray-600 mt-1">Select text → Click <strong>Italic</strong> button → Result: <span className="text-blue-600">*italic text*</span> → <em>italic text</em></div>
                            </div>

                            <div>
                              <span className="font-semibold text-gray-900">Add Hyperlinks:</span>
                              <div className="text-gray-600 mt-1">Select text → Click <strong>Link</strong> button → Enter URL in popup → Result: <span className="text-blue-600">[link text](https://example.com)</span></div>
                            </div>
                            
                            <div>
                              <span className="font-semibold text-gray-900">Create Headings:</span>
                              <div className="text-gray-600 mt-1">Select text → Click <strong>H1/H2/H3</strong> button → Result: <span className="text-blue-600">## Heading</span></div>
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
                  <div className="flex gap-4 pt-6 justify-end border-t border-gray-200">
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

            {/* Preview Section */}
            {showPreview && (
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden sticky top-8">
                  <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
                    <h2 className="font-semibold text-gray-900">Live Preview</h2>
                  </div>
                  <div className="p-8 max-h-96 overflow-y-auto">
                    <div className="text-center mb-8">
                      {formData.uploadImage && (
                        <img
                          src={URL.createObjectURL(formData.uploadImage)}
                          alt="Preview"
                          className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                      )}
                    </div>

                    <h1 className="text-3xl font-bold text-slate-800 mb-4">
                      {formData.mainHeading || 'Main Heading'}
                    </h1>
                    
                    <p className="text-slate-600 text-lg mb-6">
                      {formData.subHeading || 'Sub heading goes here'}
                    </p>

                    <div className="text-sm text-slate-600 mb-6 pb-6 border-b border-gray-200">
                      {formData.date && new Date(formData.date).toLocaleDateString()}
                    </div>

                    <div 
                      className="prose prose-slate max-w-none"
                      dangerouslySetInnerHTML={{ __html: parseContentToHTML(formData.content) }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Hyperlink</h3>
            <p className="text-sm text-gray-600 mb-4">
              Link text: <strong>{selectedText}</strong>
            </p>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={insertLink}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                Insert Link
              </button>
              <button
                onClick={() => {
                  setShowLinkModal(false);
                  setLinkUrl('');
                }}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}