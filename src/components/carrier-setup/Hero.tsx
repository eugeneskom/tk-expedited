import React from 'react';
import { motion, useInView } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const CarrierSetupHero: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const animateOnScroll = {
    opacity: isInView ? 1 : 0,
    y: isInView ? 0 : 20,
    transition: { duration: 0.5 }
  };

  return (
    <header ref={ref} className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] bg-gray-900 flex items-center">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="assets/img/trucking-truck-stop-.jpg"
          alt="Carrier Setup Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Breadcrumbs */}
          <motion.nav 
            className="text-base font-medium text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={animateOnScroll}
          >
            <NavLink to="/" className="hover:text-gray-300">Home</NavLink>
            <span className="mx-2">|</span>
            <span className="text-gray-300">Carrier Setup</span>
          </motion.nav>

          {/* Title */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={animateOnScroll}
          >
            Set Up Your Carrier Account
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={animateOnScroll}
          >
            Complete the carrier setup below to receive your Dispatch Service Agreement and General Power Of Attorney
          </motion.p>
        </div>
      </div>
    </header>
  );
};

export default CarrierSetupHero;