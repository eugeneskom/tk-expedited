import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface TabContentProps {
  isActive: boolean;
  children: React.ReactNode;
}

const TabContent = ({ isActive, children }: TabContentProps) => <div className={`transform transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 absolute"}`}>{children}</div>;

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState<"clients" | "drivers">("clients");

  // Inside your component:
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[85vh] bg-gradient-to-b from-[#2A0001] to-[#1A0000] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_600px_at_70%_30%,#4B0000,transparent)]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_600px_at_30%_70%,#4B0000,transparent)]"></div>
        </div>
      </div>

      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Success, Our Priority</h2>
            <p className="text-red-200/80 text-lg">Comprehensive solutions for both clients and drivers</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-red-950/30 rounded-xl backdrop-blur-sm">
              {["clients", "drivers"].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab as "clients" | "drivers")} className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === tab ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg" : "text-red-200 hover:text-white"}`}>
                  For {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <div className="relative min-h-[400px]">
            {/* Clients Content */}
            <TabContent isActive={activeTab === "clients"}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Express Shipping",
                    description: "Time-critical deliveries with real-time tracking and guaranteed arrival times",
                    icon: "🚚",
                  },
                  {
                    title: "Custom Solutions",
                    description: "Tailored logistics solutions to meet your specific business requirements",
                    icon: "⚡",
                  },
                  {
                    title: "24/7 Support",
                    description: "Round-the-clock customer service and shipment monitoring",
                    icon: "💬",
                  },
                  {
                    title: "Nationwide Coverage",
                    description: "Extensive network coverage across the United States",
                    icon: "🗺️",
                  },
                  {
                    title: "Competitive Rates",
                    description: "Transparent pricing with no hidden fees or surprises",
                    icon: "💰",
                  },
                  {
                    title: "Safety First",
                    description: "Comprehensive insurance coverage and safety protocols",
                    icon: "🛡️",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-red-900/10 to-transparent p-6 rounded-xl border border-red-500/10 backdrop-blur-sm
                      hover:from-red-900/20 transition-all duration-300 group"
                  >
                    <div className="mb-4 text-3xl">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-red-200/80">{feature.description}</p>
                  </div>
                ))}
              </div>
            </TabContent>

            {/* Drivers Content */}
            <TabContent isActive={activeTab === "drivers"}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-red-900/10 to-transparent p-8 rounded-xl border border-red-500/10 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white mb-6">Join Our Fleet</h3>
                  <ul className="space-y-4">
                    {["Competitive pay rates and timely payments", "Flexible schedule options", "Modern equipment and technology", "Dedicated dispatch support", "Regular route opportunities", "Safety incentives and bonuses"].map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        </div>
                        <span className="text-red-100">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-red-900/10 to-transparent p-6 rounded-xl border border-red-500/10 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold text-white mb-3">Requirements</h4>
                    <ul className="space-y-3 text-red-200/80">
                      <li>• Valid CDL with clean driving record</li>
                      <li>• Minimum 2 years of verifiable experience</li>
                      <li>• DOT medical certification</li>
                      <li>• Professional attitude and appearance</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-red-900/10 to-transparent p-6 rounded-xl border border-red-500/10 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold text-white mb-3">Get Started</h4>
                    <p className="text-red-200/80 mb-4">Ready to join our team? Contact our recruitment department:</p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => navigate("/driver-setup")}
                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium 
    hover:from-red-700 hover:to-red-800 transition-all duration-300"
                      >
                        Apply Now getch
                      </button>
                      <a href="tel:(513) 895-9653" className="text-red-300 hover:text-red-200 transition-colors">
                        (513) 895-9653
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </TabContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
