import { Facebook, Twitter, Linkedin, Instagram, MapPin } from 'lucide-react';

export default function Footer() {
  const navLinks = [
    'About',
    'Service',
    'Industries',
    'Client',
    'Blog',
    'Case study',
    'Career'
  ];

  return (
    <footer className="w-full bg-[#003d6b] text-white relative overflow-hidden">
      {/* Vertical line decoration */}
      <div className="absolute top-0 right-1/4 md:right-1/3 w-px h-full bg-white/40 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Left Section */}
          <div className='col-span-1 mt-10 lg:col-span-3'>
            {/* Logo and Social Icons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
              {/* Logo */}
              <img src="/images/footerlogo.png" alt="AmacaThera Logo" className="h-8 mb-6 sm:h-10" />

              {/* Divider */}
              <div className="hidden sm:block w-px h-10 bg-white/30" />

              {/* Social Icons */}
              <div className="flex gap-4 sm:gap-6">
                <button className="hover:opacity-70 transition">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" fill='white' />
                </button>
                <button className="hover:opacity-70 transition">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" fill='white' />
                </button>
                <button className="hover:opacity-70 transition">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" fill='white' />
                </button>
                <button className="hover:opacity-70 transition">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 mb-6">
              {navLinks.map((link, index) => (
                <span key={index} className="flex items-center gap-3 sm:gap-4">
                  <button className="text-white hover:text-white/70 transition font-normal text-sm">
                    {link}
                  </button>
                  {index < navLinks.length - 1 && (
                    <span className="text-white/40 hidden sm:inline">|</span>
                  )}
                </span>
              ))}
            </nav>

            {/* Description Text */}
            <div className="space-y-2 text-white/90 text-xs sm:text-sm leading-relaxed max-w-3xl mb-6">
              <p>
                Lörem ipsum od ohet dilagi. Bell trabel, samuligt, ohöbel utom diska. Jinesade bel när feras redorade i belogi.
              </p>
              <p>
                FAR paratyp i muväning, och pesask vyfisat. Viktiga poddradio har un mad och inde.
              </p>
            </div>

            {/* Copyright */}
            <div className="text-white/70 text-xs mt-20 sm:text-sm">
              © 2022 Amacathera | Powered by <span className="text-white">Atikin technologies</span>
            </div>
          </div>

          {/* Right Section - Locations */}
          <div className="flex lg:col-start-4 flex-col justify-start">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8">
              {/* Canada Section */}
              <div>
                <img src="/logos/Canada.png" alt="Canada Flag" className="h-20 mb-2" />
                <div className="text-white">
                  <h2 className="text-base sm:text-lg font-bold mb-2">Canada</h2>
                  <div className="text-xs sm:text-sm leading-relaxed space-y-1">
                    <p>MaRS Centre, West Tower,</p>
                    <p>661 University Ave Suite 1300,</p>
                    <p>Toronto, ON M5G 0B7</p>
                  </div>
                </div>
              </div>

              {/* US Section */}
              <div>
                <img src="/logos/US.png" alt="US Flag" className="h-20 mb-2" />
                <div className="text-white">
                  <h2 className="text-base sm:text-lg font-bold mb-2">US</h2>
                  <div className="text-xs sm:text-sm leading-relaxed space-y-1">
                    <p>329 Oyster Point Boulevard</p>
                    <p>3rd Floor South San Francisco,</p>
                    <p>CA, US 94080</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}