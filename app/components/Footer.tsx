import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo / Brand Name */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl font-bold mb-4"> DELTA Facility Services</h1>
            <p className="text-sm text-gray-400">Delivering Excellence, One Step at a Time</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Services</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-sm text-gray-400">Email: <a href="mailto:info@yourcompany.com" className="hover:text-white">info@deltafacilityservices.com</a></p>
            <p className="text-sm text-gray-400">Phone: <a href="tel:+123456789" className="hover:text-white">+966122135846</a></p>
            <p className="text-sm text-gray-400">Address: Jeddah, Saudi Arabia</p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex flex-row space-x-4">
              <motion.a
                href="https://www.facebook.com/people/Delta-Facility-Services/61553752537939/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF5555] hover:text-[#EF4D48]"
                whileHover={{ scale: 1.2 }}
              >
                <FaFacebookF size={20} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/deltafacilityservices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF5555] hover:text-[#EF4D48]"
                whileHover={{ scale: 1.2 }}
              >
                <FaInstagram size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/7066668/admin/feed/posts/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF5555] hover:text-[#EF4D48]"
                whileHover={{ scale: 1.2 }}
              >
                <FaLinkedinIn size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com/Delta_Facility"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF5555] hover:text-[#EF4D48]"
                whileHover={{ scale: 1.2 }}
              >
                <FaTwitter size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} DELTA Facility Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
