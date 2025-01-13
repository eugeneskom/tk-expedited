import React from 'react';
import { TruckIcon, CurrencyDollarIcon, DocumentCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const BenefitCard = ({ title, description, icon }: BenefitCardProps) => (
  <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
      <div className="w-6 h-6 text-blue-400">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-slate-300">{description}</p>
  </div>
);

const BecomeCarrier: React.FC = () => {
  const benefits = [
    {
      title: "Fast Payments",
      description: "Get paid quickly and reliably with our efficient payment processing system, ensuring your business maintains healthy cash flow.",
      icon: <CurrencyDollarIcon />
    },
    {
      title: "Dedicated Support",
      description: "Access our professional support team 24/7, ready to assist you with any questions or concerns throughout your journey.",
      icon: <UserGroupIcon />
    },
    {
      title: "Quality Loads",
      description: "Access premium, consistent freight opportunities from our vast network of trusted shippers across the United States.",
      icon: <TruckIcon />
    },
    {
      title: "Simple Process",
      description: "Easy onboarding and straightforward documentation process to get you started quickly and efficiently.",
      icon: <DocumentCheckIcon />
    }
  ];

  return (
    <div className="bg-slate-900 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-lg mb-2">
            CARRIER OPPORTUNITIES
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Become a Carrier Partner
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Join the American Logistics Group, Inc. network and discover our flexibility, 
            responsiveness, passion, and diligence in supporting your success.
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BecomeCarrier; 