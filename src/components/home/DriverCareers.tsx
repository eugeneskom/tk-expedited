import React from 'react';
import { TruckIcon, CurrencyDollarIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const BenefitCard = ({ title, description, icon }: BenefitCardProps) => (
  <div className="bg-[#1B3160] p-8 rounded-xl border border-gray-700 hover:border-blue-400/50 transition-all duration-300">
    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6">
      <div className="w-6 h-6 text-gray-300">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-semibold text-gray-200 mb-3">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const DriverCareers: React.FC = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/driver-setup');
  };

  const benefits = [
    {
      title: "Competitive Pay",
      description: "Earn top industry wages with our performance-based pay structure, regular bonuses, and comprehensive benefits package.",
      icon: <CurrencyDollarIcon />
    },
    {
      title: "Flexible Schedule",
      description: "Choose from various route options including local, regional, and OTR opportunities to match your lifestyle preferences.",
      icon: <ClockIcon />
    },
    {
      title: "Modern Fleet",
      description: "Drive well-maintained, late-model trucks equipped with the latest safety features and comfort amenities.",
      icon: <TruckIcon />
    },
    {
      title: "Safety First",
      description: "Join a company that prioritizes driver safety with advanced training programs and top-tier equipment maintenance.",
      icon: <ShieldCheckIcon />
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#1B3160] to-[#0F1E3C] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gray-300 font-semibold text-lg mb-2">
            DRIVER OPPORTUNITIES
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Drive Your Career Forward
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join our team of professional drivers and experience a rewarding career with 
            competitive pay, modern equipment, and a company that values your success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Driver Requirements
            </h3>
            <ul className="text-gray-300 max-w-2xl mx-auto space-y-2">
              <li>• Valid Commercial Driver&apos;s License (CDL-A)</li>
              <li>• Clean driving record</li>
              <li>• Minimum 2 years of verifiable driving experience</li>
              <li>• Pass DOT physical and drug screening</li>
            </ul>
            <button 
              onClick={handleApplyClick}
              className="mt-8 bg-white hover:bg-gray-100 text-[#1B3160] font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverCareers; 