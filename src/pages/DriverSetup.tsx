import React, { useState, FormEvent } from 'react';
import { TruckIcon, DocumentTextIcon, IdentificationIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  experience: string;
  cdlNumber: string;
  cdlState: string;
  cdlExpiration: string;
  violations: string;
  accidents: string;
  equipment: string;
  availability: string;
  message: string;
}

const DriverSetup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    experience: '',
    cdlNumber: '',
    cdlState: '',
    cdlExpiration: '',
    violations: '',
    accidents: '',
    equipment: '',
    availability: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const requirements = [
    {
      icon: <IdentificationIcon className="w-6 h-6" />,
      title: "Valid CDL-A License",
      description: "Current Commercial Driver's License with clean record"
    },
    {
      icon: <ClipboardDocumentCheckIcon className="w-6 h-6" />,
      title: "Experience",
      description: "Minimum 2 years of verifiable driving experience"
    },
    {
      icon: <DocumentTextIcon className="w-6 h-6" />,
      title: "Documentation",
      description: "Clean MVR, valid medical card, and ability to pass drug test"
    },
    {
      icon: <TruckIcon className="w-6 h-6" />,
      title: "Equipment Knowledge",
      description: "Familiarity with modern trucking equipment and safety protocols"
    }
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/driver-application`, formData);
      if (response.status === 201) {
        setSubmitMessage('Application submitted successfully! We will contact you soon.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          experience: '',
          cdlNumber: '',
          cdlState: '',
          cdlExpiration: '',
          violations: '',
          accidents: '',
          equipment: '',
          availability: '',
          message: ''
        });
      }
    } catch (error) {
      setSubmitMessage('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputClasses = "w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/30 focus:ring-0";
  const labelClasses = "block text-base font-medium text-gray-300 mb-2";

  return (
    <div className="bg-gradient-to-b from-[#1B3160] to-[#0F1E3C] min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Professional Driver Team
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Princeton Transport LLC is looking for experienced drivers who share our commitment 
            to safety, reliability, and professional service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Requirements Section */}
          <div className="space-y-8">
            <div className="bg-[#1B3160] p-8 rounded-xl border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-6">Driver Requirements</h2>
              <div className="grid gap-6">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-gray-300">
                        {req.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{req.title}</h3>
                      <p className="text-gray-300">{req.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#1B3160] rounded-xl p-8 border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className={labelClasses}>First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                  {/* Add all other form fields here with the same pattern */}
                  {/* ... */}
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className={labelClasses}>Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="address" className={labelClasses}>Street Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className={labelClasses}>City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className={labelClasses}>State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className={labelClasses}>ZIP Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>

                {/* CDL Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="cdlNumber" className={labelClasses}>CDL Number</label>
                    <input
                      type="text"
                      id="cdlNumber"
                      name="cdlNumber"
                      value={formData.cdlNumber}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cdlState" className={labelClasses}>CDL State</label>
                    <input
                      type="text"
                      id="cdlState"
                      name="cdlState"
                      value={formData.cdlState}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cdlExpiration" className={labelClasses}>CDL Expiration Date</label>
                    <input
                      type="date"
                      id="cdlExpiration"
                      name="cdlExpiration"
                      value={formData.cdlExpiration}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>

                {/* Experience and History */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="experience" className={labelClasses}>Years of Experience</label>
                    <input
                      type="number"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                      min="0"
                    />
                  </div>
                  <div>
                    <label htmlFor="equipment" className={labelClasses}>Equipment Experience</label>
                    <input
                      type="text"
                      id="equipment"
                      name="equipment"
                      value={formData.equipment}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="e.g., Dry Van, Reefer, Flatbed"
                      required
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label htmlFor="message" className={labelClasses}>Additional Information</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={inputClasses}
                    placeholder="Tell us about your experience and why you'd like to join our team"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-[#1B3160] py-3 px-6 rounded-lg font-semibold
                    hover:bg-gray-100 transition-colors duration-200 disabled:bg-gray-300"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>

              {submitMessage && (
                <div className={`mt-4 p-4 rounded-lg ${
                  submitMessage.includes('error')
                    ? 'bg-red-900/50 text-red-200 border border-red-700'
                    : 'bg-green-900/50 text-green-200 border border-green-700'
                }`}>
                  {submitMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverSetup; 