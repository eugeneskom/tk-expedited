import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  pickupLocation: string;
  deliveryLocation: string;
}

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  msg: string;
  type: string;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, msg, type }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    pickupLocation: '',
    deliveryLocation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/quote-request`, formData);
      setSubmitMessage('Quote request submitted successfully! We\'ll contact you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        pickupLocation: '',
        deliveryLocation: ''
      });
    } catch (error) {
      setSubmitMessage('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div 
          className="relative bg-gradient-to-br from-[#2A0001] to-[#1A0000] rounded-xl 
            max-w-lg w-full p-8 shadow-2xl shadow-red-900/20 border border-red-500/10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-200/80 hover:text-white 
              transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{msg}</h2>
            <p className="text-red-200/80 text-base">
              Fill out the form below and we'll provide you with a competitive quote.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-medium text-red-200 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-3 
                    text-red-100 placeholder-red-300/50 focus:border-red-500/40 focus:ring-0
                    transition-colors duration-200"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-red-200 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-3 
                    text-red-100 placeholder-red-300/50 focus:border-red-500/40 focus:ring-0
                    transition-colors duration-200"
                  placeholder="Enter your phone"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-red-200 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-3 
                  text-red-100 placeholder-red-300/50 focus:border-red-500/40 focus:ring-0
                  transition-colors duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-base font-medium text-red-200 mb-2">
                Pickup Location
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                className="w-full bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-3 
                  text-red-100 placeholder-red-300/50 focus:border-red-500/40 focus:ring-0
                  transition-colors duration-200"
                placeholder="Enter pickup location"
                required
              />
            </div>

            <div>
              <label className="block text-base font-medium text-red-200 mb-2">
                Delivery Location
              </label>
              <input
                type="text"
                name="deliveryLocation"
                value={formData.deliveryLocation}
                onChange={handleChange}
                className="w-full bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-3 
                  text-red-100 placeholder-red-300/50 focus:border-red-500/40 focus:ring-0
                  transition-colors duration-200"
                placeholder="Enter delivery location"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 
                rounded-lg font-medium transition-all duration-300 hover:from-red-700 
                hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Request Quote'}
            </button>
          </form>

          {/* Success/Error Message */}
          {submitMessage && (
            <div className={`mt-6 p-4 rounded-lg ${
              submitMessage.includes('error')
                ? 'bg-red-950/50 text-red-200 border border-red-500/20'
                : 'bg-green-950/50 text-green-200 border border-green-500/20'
            }`}>
              {submitMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;