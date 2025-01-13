import React from 'react';
import { ModalConfig } from '../../pages/Home';

interface RegionInfo {
  name: string;
  states: string[];
  deliveryTime: string;
  serviceTypes: string[];
}

export interface CoverageSectionProps {
  onModalToggle: (config: ModalConfig) => void;
}

const CoverageSection = ({ onModalToggle }: CoverageSectionProps) => {
  const regions: RegionInfo[] = [
    {
      name: "Northeast",
      states: ["NY", "NJ", "PA", "MA", "CT", "RI", "VT", "NH", "ME"],
      deliveryTime: "1-2 Days",
      serviceTypes: ["Same Day", "Next Day", "Express"]
    },
    {
      name: "Southeast",
      states: ["FL", "GA", "SC", "NC", "VA", "TN", "AL", "MS"],
      deliveryTime: "1-3 Days",
      serviceTypes: ["Express", "Standard", "Economy"]
    },
    {
      name: "Midwest",
      states: ["OH", "MI", "IN", "IL", "WI", "MN", "IA", "MO"],
      deliveryTime: "1-2 Days",
      serviceTypes: ["Rush", "Standard", "Specialized"]
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#2A0001] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-red-500/10 rounded-full"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${10 + Math.random() * 20}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Nationwide Coverage
              </h2>
              <p className="text-red-200/80 text-lg max-w-2xl">
                With strategic locations across the country, we provide comprehensive
                coverage and reliable delivery times to meet your transportation needs.
              </p>
            </div>
          </div>

          {/* Coverage Map Alternative */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {regions.map((region, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent 
                  rounded-xl transition-all duration-300 group-hover:scale-105">
                  <div className="absolute inset-0 backdrop-blur-sm rounded-xl" />
                </div>

                <div className="relative p-8 border border-red-500/10 rounded-xl">
                  <h3 className="text-2xl font-bold text-white mb-4">{region.name}</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-red-300 font-medium mb-2">States Covered</p>
                      <div className="flex flex-wrap gap-2">
                        {region.states.map((state, sIndex) => (
                          <span 
                            key={sIndex}
                            className="px-2 py-1 bg-red-900/30 rounded text-red-200 text-base"
                          >
                            {state}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-red-300 font-medium mb-2">Delivery Time</p>
                      <p className="text-red-100">{region.deliveryTime}</p>
                    </div>

                    <div>
                      <p className="text-red-300 font-medium mb-2">Available Services</p>
                      <ul className="space-y-1">
                        {region.serviceTypes.map((service, sIndex) => (
                          <li key={sIndex} className="text-red-200 flex items-center">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-20 max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-red-900/10 to-transparent p-8 rounded-xl border border-red-500/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">Need Custom Coverage?</h3>
              <p className="text-red-200/80 mb-6">
                We offer tailored solutions for specific routes and specialized shipping needs.
                Contact our team to discuss your requirements.
              </p>
              <button onClick={() => onModalToggle({msg: "Contact Sales Team", type: "success", isOpen: true})} className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg 
                font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300">
                Contact Sales Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverageSection;