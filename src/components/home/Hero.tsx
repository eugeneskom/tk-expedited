import React, { useEffect, useRef } from "react";
import { SectionName } from "../../App";
import { ModalConfig } from "../../pages/Home";

export interface HeroProps {
  scrollToSection: (section: SectionName) => void;
  onModalToggle: (config: ModalConfig) => void;
}

const BackgroundEffect = () => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[#2A0001]">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,#4B000090,transparent)]"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_400px_at_80%_80%,#4B000060,transparent)]"></div>
    </div>
  </div>
);

const DiagonalLines = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="absolute h-[1px] w-[150%] bg-gradient-to-r from-transparent via-red-500 to-transparent transform -rotate-45"
        style={{
          top: `${i * 150}px`,
          left: '-25%',
          animation: `diagonalMove 15s linear infinite`,
          animationDelay: `${i * 0.5}s`
        }}
      />
    ))}
  </div>
);

const CompanyIdentifier = () => (
  <div className="relative w-full max-w-6xl mx-auto px-4">
    <div className="flex justify-between items-center p-2 sm:p-4">
      <div className="text-red-500 font-mono text-xs tracking-wider animate-fadeIn">
        MC-1594232
      </div>
      <div className="text-red-500/50 font-mono text-xs tracking-wider animate-fadeIn">
        LIBERTY TWP, OH
      </div>
    </div>
  </div>
);

const Hero = ({ scrollToSection, onModalToggle }: HeroProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const content = contentRef.current;
    if (content) {
      observer.observe(content);
    }

    return () => {
      if (content) {
        observer.unobserve(content);
      }
    };
  }, []);

  return (
    <div className="relative min-h-[70vh] sm:min-h-[50vh] md:min-h-[100vh] overflow-hidden bg-[#2A0001]">
      <BackgroundEffect />
      <DiagonalLines />
      <CompanyIdentifier />

      <div className="relative mx-auto px-4 min-h-[70vh] sm:min-h-[75vh] max-w-6xl">
        <div 
          ref={contentRef}
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 opacity-0 translate-y-10 transition-all duration-1000"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8 items-center">
            {/* Left Column - Company Info */}
            <div className="lg:col-span-3 space-y-4 lg:space-y-6">
              <div>
                <div className="text-base sm:text-lg text-red-400 font-light mb-1 sm:mb-2">TK EXPEDITED LLC</div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                  <span className="block text-white/90">Strategic</span>
                  <span className="block mt-1 bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                    Logistics
                  </span>
                </h1>
              </div>

              <p className="text-sm sm:text-base text-red-100/80 leading-relaxed max-w-xl">
                Transforming the landscape of expedited shipping with innovative solutions 
                and unwavering commitment to excellence.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-red-900/30 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></div>
                  </div>
                  <div className="text-red-200 text-sm sm:text-base">24/7 Support</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-red-900/30 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" 
                      style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  <div className="text-red-200 text-sm sm:text-base">Live Tracking</div>
                </div>
              </div>
            </div>

            {/* Right Column - Call to Action */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-red-900/10 to-transparent p-4 sm:p-6 rounded-xl border border-red-500/10 backdrop-blur-sm">
                <h2 className="text-lg sm:text-xl font-semibold text-red-100 mb-3 sm:mb-4">Ready to Ship?</h2>
                
                <div className="space-y-2 sm:space-y-3">
                  <button 
                    onClick={() => onModalToggle({msg: "Get Instant Quote", type: "success", isOpen: true})}
                    className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg 
                      text-white text-sm sm:text-base font-medium transition-transform hover:scale-105"
                  >
                    Get Instant Quote
                  </button>
                  
                  <button 
                    onClick={() => scrollToSection("services")}
                    className="w-full py-2.5 sm:py-3 px-4 bg-red-950/50 rounded-lg text-red-200 text-sm sm:text-base 
                      font-medium border border-red-500/20 transition-colors hover:bg-red-950/70"
                  >
                    View Services
                  </button>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-red-500/10">
                  <p className="text-red-200/70 text-xs">
                    Contact our team
                  </p>
                  <a 
                    href="tel:(513) 895-9653" 
                    className="text-sm sm:text-base text-red-100 font-medium hover:text-red-300 transition-colors"
                  >
                    (513) 895-9653
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;