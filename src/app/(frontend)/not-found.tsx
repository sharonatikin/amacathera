'use client'
import { ArrowRight, Home } from "lucide-react";
import { useEffect, useState } from "react";

type Particle = { id: number; left: number; delay: number; duration: number; };

export default function NotFound() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate animated particles for visual interest
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${particle.left}%`,
              animation: `float ${particle.duration}s infinite ease-in-out`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-600 to-blue-900 rounded-full" />
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 mt-8">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          We couldn't find the page you're looking for. It might have been moved, renamed, or no longer exists. Let us help you get back on track.
        </p>

        {/* Suggested Links */}
        <div className="mb-10 p-6 bg-white/60 backdrop-blur rounded-lg border border-blue-100">
          <p className="text-sm text-slate-600 mb-4 font-semibold">Here are some helpful links:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="/"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg transition font-medium text-sm"
            >
              <Home className="w-4 h-4" />
              Home
            </a>
            <a
              href="/about-us"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg transition font-medium text-sm"
            >
              About Us
            </a>
            <a
              href="/hydrogel-platform"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg transition font-medium text-sm"
            >
              Hydrogel Platform
            </a>
            <a
              href="/pipeline"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg transition font-medium text-sm"
            >
              Pipeline
            </a>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
          >
            Return to Home
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="/contact-us"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-900 border-2 border-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Contact Support
          </a>
        </div>

        {/* Footer text */}
        <p className="text-sm text-slate-500 mt-10">
          If you believe this is an error, please{" "}
          <a href="/contact-us" className="text-blue-600 hover:text-blue-900 font-semibold underline">
            reach out to us
          </a>
          .
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}