import React, { FormEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SectionName } from '../App';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Notification from '../components/Notification';

interface FooterProps {
  scrollToSection: (section: SectionName) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const Footer: React.FC<FooterProps> = ({ scrollToSection }) => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/newsletter/subscribe`,
        formData
      );
      if (response.status === 201) {
        setSubmitMessage('Thank you for subscribing!');
        setFormData({ name: '', email: '', phone: '' });
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      setIsVisible(true);
    }
  };

  const navItems: SectionName[] = [
    'home',
    'about',
    'services',
    'fleet',
    'coverage',
    'contact'
  ];

  return (
    <footer className="relative bg-[#2A0001] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#4B000030,transparent)]" />
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent transform"
              style={{
                top: `${20 * (i + 1)}%`,
                opacity: 0.1
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Logo and Newsletter Section - Spans 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              <NavLink to="/" className="block">
                <img src="logo.webp" alt="TK Expedited LLC" className="h-32 w-auto" />
              </NavLink>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Stay Updated</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="flex-1 bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-2 
                        text-red-100 placeholder-red-300/50 focus:border-red-500/40 focus:ring-0"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone"
                      className="flex-1 bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-2 
                        text-red-100 placeholder-red-300/50 focus:border-red-500/40 focus:ring-0"
                    />
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email"
                      className="flex-1 bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-2 
                        text-red-100 placeholder-red-300/50 focus:border-red-500/40 focus:ring-0"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg 
                        font-medium transition-all duration-300 hover:from-red-700 hover:to-red-800 
                        disabled:opacity-50"
                    >
                      {isSubmitting ? '...' : 'Join'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Navigation Links - Spans 2 columns */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Company</h3>
                <ul className="space-y-2">
                  {navItems.slice(0, 3).map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => scrollToSection(item)}
                        className="text-red-200/80 hover:text-white transition-colors duration-200"
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Services</h3>
                <ul className="space-y-2">
                  {navItems.slice(3).map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => scrollToSection(item)}
                        className="text-red-200/80 hover:text-white transition-colors duration-200"
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Information - Spans 2 columns */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-medium text-white mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <a href="tel:(513) 895-9653" className="flex items-center gap-3 text-red-200/80 
                  hover:text-white transition-colors duration-200">
                  <PhoneIcon className="w-5 h-5" />
                  <span>(513) 895-9653</span>
                </a>
                <a href="mailto:info@tkexpedited.com" className="flex items-center gap-3 text-red-200/80 
                  hover:text-white transition-colors duration-200">
                  <EnvelopeIcon className="w-5 h-5" />
                  <span>info@tkexpedited.com</span>
                </a>
                <div className="flex items-start gap-3 text-red-200/80">
                  <MapPinIcon className="w-5 h-5 mt-1" />
                  <div>
                    4584 SNOWBIRD DR<br />
                    LIBERTY TWP, OH 45011
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-red-500/10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-red-200/60 text-base">
                © {currentYear} TK Expedited LLC. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="/privacy" className="text-red-200/60 hover:text-white text-base 
                  transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-red-200/60 hover:text-white text-base 
                  transition-colors duration-200">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {submitMessage && (
        <Notification
          message={submitMessage}
          isVisible={isVisible}
          onClose={() => {
            setIsVisible(false);
            setSubmitMessage('');
          }}
          type={submitMessage.includes('Thank you') ? 'success' : 'error'}
        />
      )}
    </footer>
  );
};

export default Footer;