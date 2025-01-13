import React from 'react';
import { ModalConfig } from '../../pages/Home';

interface FleetItem {
  name: string;
  description: string;
  capacity: string;
  features: string[];
  icon: JSX.Element;
}

export interface FleetSectionProps {
  onModalToggle: (config: ModalConfig) => void;
}

const FleetSection = ({ onModalToggle }: FleetSectionProps) => {
  const fleetData: FleetItem[] = [
    {
      name: "Sprinter Vans",
      description: "Perfect for time-sensitive deliveries and smaller freight loads",
      capacity: "Up to 3,500 lbs",
      features: ["Quick delivery", "Urban-friendly", "Temperature controlled"],
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 19v-6m4 6V9m4 10V4" />
        </svg>
      )
    },
    {
      name: "Box Trucks",
      description: "Ideal for medium-sized shipments and local deliveries",
      capacity: "Up to 26,000 lbs",
      features: ["Liftgate available", "Side door access", "Multi-stop capable"],
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17h6m-6-4h6m-6-4h6M5 3v18M19 3v18" />
        </svg>
      )
    },
    {
      name: "Semi-Trucks",
      description: "For large shipments and long-haul transportation",
      capacity: "Up to 80,000 lbs",
      features: ["Coast-to-coast service", "Team drivers available", "Advanced tracking"],
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h6a1 1 0 011 1v7m-1 1h1a1 1 0 001-1V8a1 1 0 00-1-1h-6a1 1 0 00-1 1v7a1 1 0 001 1h1" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#2A0001] to-[#1A0000] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#4B000030,transparent)]" />
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent transform"
              style={{
                top: `${30 * (i + 1)}%`,
                animation: `floatHorizontal ${15 + i * 5}s linear infinite`,
                opacity: 0.1
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Modern Fleet
            </h2>
            <p className="text-red-200/80 text-lg">
              Equipped with cutting-edge technology and maintained to the highest standards,
              our diverse fleet ensures reliable and efficient transportation solutions.
            </p>
          </div>

          {/* Fleet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {fleetData.map((item, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Card Background with Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent 
                  rounded-2xl transition-all duration-300 group-hover:from-red-900/20" />
                
                {/* Content */}
                <div className="relative p-8 border border-red-500/10 rounded-2xl backdrop-blur-sm">
                  <div className="text-red-400 mb-6">{item.icon}</div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{item.name}</h3>
                  <p className="text-red-200/70 mb-4">{item.description}</p>
                  
                  <div className="bg-red-950/30 rounded-lg p-4 mb-6">
                    <span className="text-red-300 font-medium">Capacity: </span>
                    <span className="text-red-200">{item.capacity}</span>
                  </div>
                  
                  <ul className="space-y-2">
                    {item.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-red-200/80">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <button onClick={() => onModalToggle({msg: "Request a Quote", type: "success", isOpen: true})} className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg 
              font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg 
              shadow-red-900/30">
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetSection;