import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const [activeField, setActiveField] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/contact`, formData);
      setSubmitMessage("Thank you for your message. We'll get back to you soon!");
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (error) {
      setSubmitMessage('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#2A0001] overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(255,100,100,0.2)" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Floating Contact Info */}
        <div className="absolute top-20 right-8 space-y-4 hidden lg:block">
          <div className="flex items-center gap-3 text-red-300/80 hover:text-red-200 transition-colors">
            <PhoneIcon className="w-5 h-5" />
            <span>(513) 895-9653</span>
          </div>
          <div className="flex items-center gap-3 text-red-300/80 hover:text-red-200 transition-colors">
            <EnvelopeIcon className="w-5 h-5" />
            <span>TK EXPEDITED LLC</span>
          </div>
          <div className="flex items-center gap-3 text-red-300/80 hover:text-red-200 transition-colors">
            <MapPinIcon className="w-5 h-5" />
            <span>LIBERTY TWP, OH</span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            {/* Angled Section Header */}
            <div className="relative mb-16">
              <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-red-500 to-transparent"></div>
              <h2 className="text-5xl font-bold text-white leading-tight">
                Let's Start<br />
                <span className="text-red-500">Something Great</span>
              </h2>
            </div>

            {/* Interactive Form Section */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {[
                  { name: 'firstName', label: 'First Name', placeholder: 'John' },
                  { name: 'lastName', label: 'Last Name', placeholder: 'Doe' },
                ].map((field) => (
                  <div 
                    key={field.name}
                    className={`relative transition-all duration-300 ${
                      activeField === field.name ? 'transform -translate-y-1' : ''
                    }`}
                  >
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleChange}
                      onFocus={() => setActiveField(field.name)}
                      onBlur={() => setActiveField('')}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent border-b-2 border-red-500/30 px-4 py-2 text-red-100 
                        placeholder-red-500/30 focus:border-red-500 focus:outline-none transition-colors"
                    />
                    <label className="absolute -top-6 left-0 text-base text-red-400">
                      {field.label}
                    </label>
                  </div>
                ))}
              </div>

              {/* Email and Message in same row for desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                <div 
                  className={`relative transition-all duration-300 ${
                    activeField === 'email' ? 'transform -translate-y-1' : ''
                  }`}
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField('')}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b-2 border-red-500/30 px-4 py-2 text-red-100 
                      placeholder-red-500/30 focus:border-red-500 focus:outline-none transition-colors"
                  />
                  <label className="absolute -top-6 left-0 text-base text-red-400">
                    Email Address
                  </label>
                </div>

                <div 
                  className={`relative transition-all duration-300 ${
                    activeField === 'message' ? 'transform -translate-y-1' : ''
                  }`}
                >
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField('')}
                    placeholder="Tell us about your shipping needs..."
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-red-500/30 px-4 py-2 text-red-100 
                      placeholder-red-500/30 focus:border-red-500 focus:outline-none transition-colors 
                      resize-none"
                  />
                  <label className="absolute -top-6 left-0 text-base text-red-400">
                    Message
                  </label>
                </div>
              </div>

              {/* Responsive Submit Button */}
              <div className="flex justify-center">
                <div className="relative group w-full lg:w-64">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 
                    rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 
                    group-hover:duration-200"></div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full bg-gradient-to-r from-red-600 to-red-500 
                      text-white py-4 rounded-lg font-medium transition-all duration-200 
                      hover:from-red-500 hover:to-red-600 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message →'}
                  </button>
                </div>
              </div>
            </form>

            {submitMessage && (
              <div className={`mt-8 p-4 rounded-lg ${
                submitMessage.includes('error')
                  ? 'bg-red-950/50 text-red-200 border-l-4 border-red-500'
                  : 'bg-green-950/50 text-green-200 border-l-4 border-green-500'
              }`}>
                {submitMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;