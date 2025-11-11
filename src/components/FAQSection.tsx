'use client';
import { Plus, Minus } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faqData } from '@/const/qna';

gsap.registerPlugin(ScrollTrigger);

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Container fade in
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // FAQ items stagger animation
    gsap.fromTo(
      itemsRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Floating animation for items on scroll
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.to(item, {
          y: index % 2 === 0 ? -15 : 15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            markers: false,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const toggleAccordion = (index: number) => {
    const wasOpen = openIndex === index;
    setOpenIndex(wasOpen ? null : index);

    // Animate the answer appearing/disappearing
    if (!wasOpen && answerRefs.current[index]) {
      gsap.fromTo(
        answerRefs.current[index],
        { opacity: 0, height: 0, marginTop: 0 },
        { opacity: 1, height: "auto", marginTop: 8, duration: 0.4, ease: "power2.out" }
      );
    } else if (answerRefs.current[index]) {
      gsap.to(answerRefs.current[index], {
        opacity: 0,
        height: 0,
        marginTop: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center py-16 px-4">
      <div className="max-w-6xl w-full">
        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e3a5f] text-center mb-12"
        >
          Frequently asked questions
        </h1>

        {/* FAQ Grid Container */}
        <div 
          ref={containerRef}
          className="shadow-sm rounded-2xl p-6 md:p-8 bg-white/50 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {faqData.map((faq, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow self-start transform will-change-transform"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left group"
                >
                  <span className="text-base font-medium text-gray-900 leading-relaxed flex-1 group-hover:text-[#1e3a5f] transition-colors duration-300">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 mt-1 transform transition-transform duration-300 will-change-transform">
                    {openIndex === index ? (
                      <Minus 
                        className="w-5 h-5 text-[#1e3a5f] transition-colors duration-300" 
                        strokeWidth={2.5} 
                      />
                    ) : (
                      <Plus 
                        className="w-5 h-5 text-gray-700 group-hover:text-[#1e3a5f] transition-colors duration-300" 
                        strokeWidth={2.5} 
                      />
                    )}
                  </span>
                </button>
                
                {openIndex === index && (
                  <div 
                    ref={(el) => {
                      if (el) answerRefs.current[index] = el;
                    }}
                    className="px-6 pb-5 pt-0"
                  >
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}