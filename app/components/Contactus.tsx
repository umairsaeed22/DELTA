import React, { useState } from "react";
import emailjs from "emailjs-com";

// Define type for services
interface Service {
  id: number;
  content: string;
  backgroundColor: string;
}

// Define type for form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  services: string[];
}

const Contactus: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    services: [],
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<string>("");

  const services: Service[] = [
    { id: 1, content: "Website Design & Development", backgroundColor: "" },
    { id: 2, content: "Mobile Application Development", backgroundColor: "" },
    { id: 3, content: "Search Engine Optimization (SEO)", backgroundColor: "#FF9800" },
    { id: 4, content: "Digital Marketing", backgroundColor: "#68ff00" },
    { id: 5, content: "Digital Ads Campaign Management", backgroundColor: "#FF5722" },
    { id: 6, content: "Brand Design and Development", backgroundColor: "#3F51B5" },
    { id: 7, content: "Commercial Cleaning", backgroundColor: "#00BCD4" },
    { id: 8, content: "IT Support Services", backgroundColor: "#8BC34A" },
    { id: 9, content: "Landscaping", backgroundColor: "#4CAF50" },
    { id: 10, content: "Pest Control", backgroundColor: "#000" },
    { id: 11, content: "Building Cleaning", backgroundColor: "#FFC107" },
    { id: 12, content: "Recruitment & Manpower Services", backgroundColor: "#009688" },
    { id: 13, content: "Airport & Train Maintenance & Management Services", backgroundColor: "rgb(218, 255, 159)" },
    { id: 14, content: "Housemaid Services", backgroundColor: "rgb(218, 255, 159)" },
    { id: 15, content: "Event Management", backgroundColor: "rgb(218, 255, 159)" },
    { id: 16, content: "Heavy Machine Operators", backgroundColor: "rgb(218, 255, 159)" },
    { id: 17, content: "Social Media Handling", backgroundColor: "#8BC34A" },
    { id: 18, content: "Videography & Editing", backgroundColor: "#8BC34A" },
  ];

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Check if the element is an input checkbox
    if (type === "checkbox" && name === "services") {
      const checked = (e.target as HTMLInputElement).checked;

      if (checked) {
        setFormData((prev) => ({
          ...prev,
          services: [...prev.services, value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          services: prev.services.filter((service) => service !== value),
        }));
      }
    } else {
      // Handle other form inputs
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(""); // Reset previous submission status

    // Create a new messageContent variable
    const messageContent = `
      First Name: ${formData.firstName || "Not provided"}
      Last Name: ${formData.lastName || "Not provided"}
      Email: ${formData.email || "Not provided"}
      Phone: ${formData.phone || "Not provided"}
      Message: ${formData.message || "Not provided"}
      Services: ${formData.services.length > 0 ? formData.services.join(", ") : "No services selected"}
    `;

    // Prepare data for EmailJS
    const templateParams = {
      message: messageContent,
    };

    try {
      await emailjs.send(
        "service_a403oo4", // Replace with your EmailJS Service ID
        "template_k1tfcqc", // Replace with your EmailJS Template ID
        templateParams,
        "J1GeXSQVpRPnjvFKF" // Replace with your EmailJS Public Key
      );

      setSubmissionStatus("Your message has been sent successfully!");

      // Clear form data after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        services: [],
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmissionStatus("Failed to send your message. Please try again later.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full text-center overflow-hidden max-w-[1280px] mx-auto mb-20" id="quotation">
      <span className="text-[rgb(61,61,78)] text-[25px] md:text-[35px] font-bold block mb-4">
        Wanna Get A Quotation?
      </span>

      <p className="text-gray-500 text-xs md:text-sm leading-5 font-normal text-center mb-7">
        Have a question or need a quotation? Our team is here to assist you and will get back to you shortly. Let&apos;s take your business to the next level with our digital solutions.
      </p>

      <div className="flex flex-row justify-between space-x-8">
        {/* Form Container */}
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              {/* Row 1 - First Name and Last Name */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex flex-col w-full md:w-1/2">
                  <label htmlFor="firstName" className="text-md font-normal text-black dark:text-white text-left">First Name<span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col w-full md:w-1/2">
                  <label htmlFor="lastName" className="text-md font-normal text-black dark:text-white text-left">Last Name<span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Row 2 - Email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-md font-normal text-black dark:text-white text-left">Email<span className="text-red-600">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                  required
                />
              </div>

              {/* Row 3 - Phone Number */}
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-md font-normal text-black dark:text-white text-left">Phone Number<span className="text-red-600">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                  required
                />
              </div>

              {/* Row 4 - Message */}
              <div className="flex flex-col">
                <label htmlFor="message" className="text-md font-normal text-black dark:text-white text-left">Message<span className="text-red-600">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* Row 5 - Services */}
            <div className="flex flex-col">
              <label className="text-md font-normal text-black dark:text-white text-left mb-3">
                Select Services<span className="text-red-600">*</span>
              </label>
              <div className="flex flex-wrap gap-4 mt-2">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center w-fit sm:w-auto">
                    <input
                      type="checkbox"
                      id={`service-${service.id}`}
                      name="services"
                      value={service.content}
                      checked={formData.services.includes(service.content)}
                      onChange={handleChange}
                      className="peer hidden"
                    />
                    <label
                      htmlFor={`service-${service.id}`}
                      className="flex items-center gap-2 cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-gray-500 text-xs md:text-sm peer-checked:bg-[#FCA36E] peer-checked:text-white"
                    >
                      {service.content}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Send Message Button */}
            <div style={{ marginTop: "-20px !important" }} className="flex">
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative inline-flex mt-10 mb-10 h-12 overflow-hidden rounded-full p-[1px] focus:outline-none"
              >
                {/* Animated Border */}
                <span
                  className={`absolute inset-[-1000%] animate-[spin_1s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#CE604A_0%,#FFF_50%,#FFF_100%)] ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                />

                {/* Button Content */}
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#FA126C] to-[#FF9F4B] px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  {isSubmitting ? "Submitting..." : <span>Send Message &nbsp; &amp;rarr;</span> // Fixed with &amp;rarr;
                  }
                </span>
              </button>
            </div>
          </form>

          {/* Submission Status */}
          {submissionStatus && (
            <div className={`mt-4 ${submissionStatus.includes("success") ? "text-green-500" : "text-red-500"}`}>
              {submissionStatus}
            </div>
          )}
        </div>

        {/* Image Container */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center relative">
          {/* Glassmorphism Effect Container with New Gradient */}
          <div className="w-[95%] absolute h-fit bottom-[30px] bg-gradient-to-r from-[#FCA765] to-[#FB866D] via-[#f98ba2] bg-opacity-50 backdrop-blur-md flex justify-center items-center rounded-md">
            <div className="text-white text-center px-6 py-3">
              <p className="text-lg font-semibold mb-2">We value our customers and their needs</p>
              <p className="text-sm font-light">- DELTA</p>
            </div>
          </div>

          {/* Image */}
          <img src="/editing.jpg" alt="Image description" className="w-full object-cover rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default Contactus;
