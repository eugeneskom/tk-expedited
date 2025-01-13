import React from "react";
import { TruckIcon, ClockIcon, ShieldCheckIcon, CubeIcon, ArrowPathIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface SolutionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SolutionCard = ({ title, description, icon }: SolutionCardProps) => (
  <div className="bg-[#1B3160] p-8 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300">
    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6">
      <div className="w-6 h-6 text-gray-300">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const TransportationSolutions = () => {
  const solutions = [
    {
      title: "Full Truckload (FTL)",
      description: "Dedicated full truckload services for large shipments, offering efficient point-to-point delivery with our fleet of modern trucks for maximum cargo security and timely delivery.",
      icon: <TruckIcon />
    },
    {
      title: "Less Than Truckload (LTL)",
      description: "Cost-effective solutions for smaller shipments, combining multiple loads to optimize transportation costs while maintaining delivery efficiency and cargo safety.",
      icon: <CubeIcon />
    },
    {
      title: "Expedited Services",
      description: "Time-critical delivery solutions with dedicated vehicles and routes, ensuring your urgent shipments reach their destination with speed and reliability.",
      icon: <ClockIcon />
    },
    {
      title: "Specialized Transport",
      description: "Custom transportation solutions using our versatile fleet of straight trucks and vans, tailored to meet specific cargo requirements and delivery schedules.",
      icon: <ArrowPathIcon />
    },
    {
      title: "Secure Cargo Handling",
      description: "Advanced cargo tracking and security measures throughout transit, providing real-time updates and ensuring your shipments arrive safely and intact.",
      icon: <ShieldCheckIcon />
    },
    {
      title: "Dedicated Support",
      description: "24/7 professional support team committed to ensuring smooth operations and immediate response to any transportation needs or concerns.",
      icon: <UserGroupIcon />
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#1B3160] to-[#0F1E3C] min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gray-300 font-semibold text-lg mb-2">
            TRANSPORTATION SOLUTIONS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Advanced Freight Solutions for Modern Business
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Leveraging our diverse fleet and industry expertise to deliver reliable, 
            efficient, and customized transportation solutions for your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <SolutionCard 
              key={index}
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransportationSolutions;