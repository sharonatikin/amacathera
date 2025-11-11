'use client'
import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/contact-bg.png")',
        }}
      >
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 mt-[5vh] md:px-8 py-12 md:py-16">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Left Side - Text Content */}
          <div className="flex-1 text-white text-center lg:text-left">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20  rounded-full mb-6 lg:mb-8">
              <img src="/icons/Chat.png" className="w-16 h-16 sm:w-20 sm:h-20" alt="" />
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Get in touch with<br />
              AmacaThera
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Have a question about our services or need support? Our team is here to help — fast, clearly, and with
            </p>
          </div>

          {/* Right Side - Contact Form */}
          <div className="flex-1 w-full max-w-sm lg:max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-3.5 bg-slate-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003260] transition-all text-sm sm:text-base"
                    placeholder=""
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-3.5 bg-slate-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003260] transition-all text-sm sm:text-base"
                    placeholder=""
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 sm:py-3.5 bg-slate-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003260] transition-all resize-none text-sm sm:text-base"
                    placeholder=""
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#003260] hover:bg-[#004a8f] text-white font-semibold py-3.5 sm:py-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl text-sm sm:text-base"
                  >
                    Schedule a call
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactSection;