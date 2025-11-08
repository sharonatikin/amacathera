'use client';
import { useState } from 'react';

export default function ContactUsSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
  };

  return (
    <div 
      className="relative w-full h-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/contact-bg.png")',
      }}
    >

      {/* Left side - Contact Form */}
      <div className="relative z-10 w-full lg:w-1/2 min-h-screen flex flex-col justify-center pt-[10%] px-16 lg:px-30 py-20">
        <div className="max-w-md">
          {/* Title */}
          <h1 className="text-5xl lg:text-6xl font-bold text-[#0f3a66] mb-12">
            Contact us
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#0f3a66] rounded-lg text-[#0f3a66] placeholder-[#0f3a66]/60 focus:outline-none focus:border-[#1a4f7f] bg-white/50 backdrop-blur-sm transition-colors"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#0f3a66] rounded-lg text-[#0f3a66] placeholder-[#0f3a66]/60 focus:outline-none focus:border-[#1a4f7f] bg-white/50 backdrop-blur-sm transition-colors"
                required
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#0f3a66] rounded-lg text-[#0f3a66] placeholder-[#0f3a66]/60 focus:outline-none focus:border-[#1a4f7f] bg-white/50 backdrop-blur-sm transition-colors"
                required
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border-2 border-[#0f3a66] rounded-lg text-[#0f3a66] placeholder-[#0f3a66]/60 focus:outline-none focus:border-[#1a4f7f] bg-white/50 backdrop-blur-sm transition-colors resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="">
              <button
                type="submit"
                className="bg-[#1dd1a1] hover:bg-[#10ac84] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 text-base"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}