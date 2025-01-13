import React, { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import PrivacyHero from "../components/privacy/PrivacyHero";
interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

const AnimatedSection = ({ children, delay = 0 }:AnimatedSectionProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

const PrivacyNotice: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen pb-16">
      <PrivacyHero />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-16">
        <AnimatedSection>
          <h1 className="text-3xl font-bold text-center mb-8">Remberg Logistics INC Privacy Notice</h1>
          <p className="text-base text-gray-600 text-center mb-8">Last update 1/21/21</p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mb-4">
            Remberg Logistics INC takes care of your personal information and does everything possible to protect it. This Privacy Notice is written to help you understand what your personal information is collected, stored and used, and what happens to it when you use our website{" "}
            <a href="https://remberg-logistics.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              https://remberg-logistics.com
            </a>{" "}
            ("website").
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <p className="mb-4">In this Privacy Notice we answer the following questions:</p>

          <ol className="list-decimal list-inside mb-8 text-left">
            <li>Who are we?</li>
            <li>What is the Privacy Notice covered by?</li>
            <li>What information do we collect, how and why?</li>
            <li>How long do we keep your information?</li>
            <li>Do we share information with third parties?</li>
            <li>Do we use cookies?</li>
            <li>What rights do I have regarding my information?</li>
            <li>How do we update Privacy Notice?</li>
          </ol>
        </AnimatedSection>

        {[1, 2, 3, 4, 5, 6, 7, 8].map((section, index) => (
          <AnimatedSection key={section} delay={0.1 * index}>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                {section}. {getHeading(section)}
              </h2>
              <div className="text-left">{getContent(section)}</div>
            </section>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

const getHeading = (section: number): string => {
  const headings = [
    "Who are we?",
    "What is the Privacy Notice covered by?",
    "What information do we collect, how and why?",
    "How long do we keep your information?",
    "Do we share information with third parties?",
    "Do we use cookies?",
    "What rights do I have regarding my information?",
    "How do we update Privacy Notice?",
  ];
  return headings[section - 1];
};

const getContent = (section: number): JSX.Element => {
  const contents = [
    // Section 1
    <p>
      We are Remberg Logistics INC, a Delaware Limited Liability Company. Our office is located at [Your Address]. Hereinafter, Remberg Logistics INC will be referred to as "we" and "our". We are the operator of your personal information of our clients and users, which means that we determine what,
      for what purpose and how your personal information will be processed.
    </p>,
    // Section 2
    <p>
      This Privacy Notice applies to our website. Website Address:{" "}
      <a href="https://remberg-logistics.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
        https://remberg-logistics.com
      </a>
    </p>,
    // Section 3
    <div>
      <p className="mb-4">The information we process is divided into two categories: technical information and information that is provided to us by user and client.</p>
      <p className="mb-4">Technical information includes IP address, UTM parameters, geolocation, device type, browser type, cookies, and information about your interaction with the site.</p>
      <p className="mb-4">Personal information provided by the client includes full name, email, phone number, FID, SSN, driver's license, position, company name, payment information, trucks' numbers, MC number.</p>
      <p>Personal information provided by the user includes name, phone number, email, and company name.</p>
    </div>,
    // Section 4
    <div>
      <p className="mb-4">We store client information for the duration of the service and 36 months after completion.</p>
      <p>We store users' personal information for 18 months.</p>
    </div>,
    // Section 5
    <p>We use your personal information to perform a contract and for communication. We may transfer your information to third parties based on your consent, to comply with the law, or to certain companies and contractors providing services on our behalf.</p>,
    // Section 6
    <p>We use cookies necessary for the functioning of the site. You can disable cookies in your browser settings.</p>,
    // Section 7
    <div>
      <p className="mb-4">You have the right to access your information, correct it, and request its deletion.</p>
      <p>
        If you would like to review, change or delete your personal information, please contact us at{" "}
        <a href="mailto:Dispatch@remberglogistics.com" className="text-blue-600 hover:underline">
          Dispatch@remberglogistics.com
        </a>
      </p>
    </div>,
    // Section 8
    <p>This privacy policy is regulated by US federal laws and [Your State] State Constitution. If significant material changes are made, we will notify you by email or display information on the website and ask for your consent.</p>,
  ];
  return contents[section - 1];
};

export default PrivacyNotice;