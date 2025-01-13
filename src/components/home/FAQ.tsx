import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="border-b border-gray-200 py-4"
    >
      <button className="flex justify-between items-center w-full text-left" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg font-medium">{question}</span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className="text-blue-500"
        >
          <path d="M0 7 L 10 16 L 20 7" fill="none" stroke="currentColor" strokeWidth="2" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-2 text-gray-600"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: "What types of vehicles does Remberg Logistics INC work with?",
      answer: "We specialize in dispatching for sprinter vans, large straight trucks, small straight trucks, and box trucks.",
    },
    {
      question: "How much do Remberg Logistics INC's dispatch services cost?",
      answer: "Our fee is typically 3% of your gross revenue. For example, on a load worth $1000, our fee would be $30.",
    },
    {
      question: "Why choose Remberg Logistics INC as my dispatch service?",
      answer: "We offer superior service at competitive rates. Our extensive network of partners across the USA allows us to provide loads that often don't appear on public load boards.",
    },
    {
      question: "What's the process of signing up for your dispatch service?",
      answer: "After you apply, our team will promptly review your application. If approved, you'll be assigned a dedicated dispatcher who will begin working with you immediately.",
    },
    {
      question: "Are there any hidden fees or commitments?",
      answer: "No, our only fee is the dispatch fee based on your load prices. There are no hidden charges or long-term commitments.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div ref={ref} className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          {faqItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants} transition={{ duration: 0.8 }}>
              <FAQItem question={item.question} answer={item.answer} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;