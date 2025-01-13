import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface FormInputs {
  companyName: string;
  dba: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  email: string;
  mc: string;
  usdot: string;
  feinSsn: string;
  numberOfTrucks: string;
  numberOfDrivers: string;
  factorInvoices: string;
  preferredStates: string;
  documents: FileList;
}

const CarrierSetupForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = async (data, event) => {
    console.log("Form submitted");
    event?.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("companyName", data.companyName);
    formData.append("dba", data.dba);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("zipCode", data.zipCode);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("mc", data.mc);
    formData.append("usdot", data.usdot);
    formData.append("feinSsn", data.feinSsn);
    formData.append("numberOfTrucks", data.numberOfTrucks);
    formData.append("numberOfDrivers", data.numberOfDrivers);
    formData.append("factorInvoices", data.factorInvoices);
    formData.append("preferredStates", data.preferredStates);

    for (let i = 0; i < data.documents.length; i++) {
      formData.append('documents', data.documents[i]);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/driver-setup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);

    reset(); // Reset the form here
    } catch (error) {
      toast.error("Error submitting the form. Please try again.");
      console.error("There was an error!", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      <motion.h2 className="text-3xl font-bold mb-6 text-center text-white">Carrier Setup Form</motion.h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatedFormSection>
          <InputField label="Company name" id="companyName" register={register} required="Company name is required" errors={errors} />
          <InputField label="DBA (if any)" id="dba" register={register} />
        </AnimatedFormSection>

        <AnimatedFormSection cols={1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField label="Address" id="address" register={register} required="Address is required" errors={errors} />
            <InputField label="City" id="city" register={register} required="City is required" errors={errors} />
            <InputField
              label="Zip code"
              id="zipCode"
              register={register}
              required="Zip code is required"
              pattern={{
                value: /^\d{5}(-\d{4})?$/,
                message: "Invalid zip code",
              }}
              errors={errors}
            />
          </div>
        </AnimatedFormSection>

        <AnimatedFormSection>
          <InputField
            label="Phone"
            id="phone"
            register={register}
            required="Phone is required"
            pattern={{
              value: /^\d{10}$/,
              message: "Invalid phone number",
            }}
            errors={errors}
          />
          <InputField
            label="Email"
            id="email"
            register={register}
            required="Email is required"
            pattern={{
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            }}
            errors={errors}
          />
        </AnimatedFormSection>

        <AnimatedFormSection>
          <InputField label="MC#" id="mc" register={register} required="MC# is required" errors={errors} />
          <InputField label="USDOT#" id="usdot" register={register} required="USDOT# is required" errors={errors} />
        </AnimatedFormSection>

        <AnimatedFormSection>
          <InputField label="FEIN/SSN" id="feinSsn" register={register} required="FEIN/SSN is required" errors={errors} />
          <InputField label="Number Of Trucks" id="numberOfTrucks" register={register} type="number" />
          <InputField label="Number Of Drivers" id="numberOfDrivers" register={register} type="number" />
        </AnimatedFormSection>

        <AnimatedFormSection>
          <div>
            <label className="block text-base font-medium text-gray-300">Do you factor your invoices?</label>
            <div className="mt-2 space-x-6">
              <label className="inline-flex items-center">
                <input type="radio" value="Yes" {...register("factorInvoices")} className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
                <span className="ml-2 text-gray-300">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" value="No" {...register("factorInvoices")} className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
                <span className="ml-2 text-gray-300">No</span>
              </label>
            </div>
          </div>
        </AnimatedFormSection>

        <AnimatedFormSection>
          <div>
            <label htmlFor="preferredStates" className="block text-base font-medium text-gray-300">
              What States Do You Prefer To Drive?
            </label>
            <textarea id="preferredStates" {...register("preferredStates")} rows={2} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white"></textarea>
          </div>
        </AnimatedFormSection>

        <AnimatedFormSection>
          <div>
            <label htmlFor="documents" className="block text-base font-medium text-gray-300">
              Upload MC Authority Letter, Certificate Of Liability Insurance, W9
            </label>
            <input
              type="file"
              id="documents"
              {...register("documents")}
              multiple
              accept=".pdf,image/*"
              className="mt-1 block w-full text-base text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-base file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700"
            />
            <p className="mt-1 text-base text-gray-400">You can select multiple files (PDFs and images)</p>
          </div>
        </AnimatedFormSection>

        <AnimatedFormSection>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSubmitting ? "Submitting..." : "Send"}
          </motion.button>
        </AnimatedFormSection>
      </form>
      <ToastContainer position="bottom-right" />
    </motion.section>
  );
};

const AnimatedFormSection: React.FC<{ children: React.ReactNode; cols?: number }> = ({ children, cols = 2 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className={`grid grid-cols-1 md:grid-cols-${cols} gap-6`}>
      {children}
    </motion.div>
  );
};

const InputField: React.FC<{
  label: string;
  id: string;
  register: any;
  required?: string;
  pattern?: { value: RegExp; message: string };
  errors?: any;
  type?: string;
}> = ({ label, id, register, required, pattern, errors, type = "text" }) => (
  <div>
    <label htmlFor={id} className="block text-base font-medium text-gray-300">
      {label}
    </label>
    <input type={type} id={id} {...register(id, { required, pattern })} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white" />
    {errors && errors[id] && <p className="mt-1 text-base text-red-500">{errors[id].message}</p>}
  </div>
);

export default CarrierSetupForm;
