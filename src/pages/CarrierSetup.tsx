import React, { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

interface FormData {
  firstName: string;
  lastName: string;
  identificationNumber: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  identificationNumber?: string;
}

const CarrierSetup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    identificationNumber: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.identificationNumber.trim()) {
      newErrors.identificationNumber = "MC# or DOT# is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/carrier-setup`, formData);

      if (response.status === 201) {
        setSubmitMessage("Application submitted successfully! We will contact you soon.");
        setFormData({
          firstName: "",
          lastName: "",
          identificationNumber: "",
        });
      }
    } catch (error) {
      setSubmitMessage("There was an error submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="relative min-h-screen bg-[#2A0001] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#4B000030,transparent)]" />
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent transform"
              style={{
                top: `${30 * (i + 1)}%`,
                animation: `floatHorizontal ${15 + i * 5}s linear infinite`,
                opacity: 0.1,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Carrier Setup</h1>
              <p className="text-red-200/80">Start your journey with TK Expedited LLC by providing your basic information below.</p>
            </div>

            {/* Form */}
            <div
              className="bg-gradient-to-br from-red-900/10 to-transparent p-8 rounded-xl 
              border border-red-500/10 backdrop-blur-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* MC/DOT Number */}
                <div>
                  <label htmlFor="identificationNumber" className="block text-base font-medium text-red-200 mb-2">
                    MC# or DOT#
                  </label>
                  <input
                    type="text"
                    id="identificationNumber"
                    name="identificationNumber"
                    value={formData.identificationNumber}
                    onChange={handleChange}
                    className="w-full bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-3 
                      text-red-100 placeholder-red-300/50 focus:border-red-500/40 focus:ring-0
                      transition-colors duration-200"
                    placeholder="Enter your MC# or DOT#"
                  />
                  {errors.identificationNumber && <p className="mt-1 text-base text-red-500">{errors.identificationNumber}</p>}
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-base font-medium text-red-200 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-3 
                        text-red-100 placeholder-red-300/50 focus:border-red-500/40 focus:ring-0
                        transition-colors duration-200"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <p className="mt-1 text-base text-red-500">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-base font-medium text-red-200 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-3 
                        text-red-100 placeholder-red-300/50 focus:border-red-500/40 focus:ring-0
                        transition-colors duration-200"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="mt-1 text-base text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 
                      rounded-lg font-medium transition-all duration-300 hover:from-red-700 
                      hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>

              {/* Success/Error Message */}
              {submitMessage && <div className={`mt-6 p-4 rounded-lg ${submitMessage.includes("error") ? "bg-red-950/50 text-red-200 border border-red-500/20" : "bg-green-950/50 text-green-200 border border-green-500/20"}`}>{submitMessage}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrierSetup;
