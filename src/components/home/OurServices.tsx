import React from "react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ title, description, index }: ServiceCardProps) => (
  <motion.div className="bg-white bg-opacity-90 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: false, amount: 0.3 }}>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const OurServices = () => {
  const services = [
    {
      title: "Versatile Fleet Solutions:",
      description: "We offer a range of vehicles including sprinter vans, large straight trucks, and small straight box trucks to meet diverse shipping needs. Our fleet flexibility ensures we can handle various cargo sizes and distances efficiently.",
    },
    {
      title: "Specialized Dispatch Services:",
      description: "Our experienced team excels in securing optimal loads for our diverse fleet. We provide comprehensive pickup and delivery instructions, meticulously monitoring each journey to ensure timely and secure transportation.",
    },
    {
      title: "Dedicated Support:",
      description: "Navigating the complexities of logistics can be challenging. That's why our dedicated team offers round-the-clock assistance, providing seamless support from pickup to delivery for a hassle-free experience.",
    },
    {
      title: "Expedited Freight Solutions:",
      description: "When time is critical, trust Remberg Logistics INC to provide expedited freight solutions. Our commitment to efficiency and our versatile fleet guarantee prompt delivery without compromising on safety and security.",
    },
    {
      title: "24/7 Availability:",
      description: "Emergencies don't keep office hours, and neither do we. Our team is available 24/7 to handle inquiries, provide support, and ensure smooth execution of your freight transportation needs, regardless of the vehicle type required.",
    },
    {
      title: "Customized Logistics Planning:",
      description: "We understand that each shipment is unique. Our team works closely with you to develop tailored logistics solutions, whether you need a sprinter van for small, urgent deliveries or a large straight truck for bigger loads.",
    },
  ];

  return (
    <div className="relative bg-fixed bg-cover bg-center py-16 min-h-screen" style={{ backgroundImage: "url('assets/img/a-commercial-truck-on-the-road--min.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: false, amount: 0.3 }}>
          <motion.p className="text-blue-400 font-semibold text-lg mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} viewport={{ once: false, amount: 0.3 }}>
            Our Services
          </motion.p>
          <motion.h2 className="text-3xl md:text-4xl font-bold text-white mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} viewport={{ once: false, amount: 0.3 }}>
            Comprehensive Logistics Solutions for Every Need
          </motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} title={service.title} description={service.description} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;