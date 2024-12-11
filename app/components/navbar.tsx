'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Defining the type for the state variable

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Effect to toggle body overflow on menu open/close
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'; // Disable scroll
    } else {
      document.body.style.overflow = 'auto'; // Enable scroll
    }
  }, [isMenuOpen]); // Trigger on isMenuOpen change

  return (
    <nav className="p-2 md:p-6 flex items-center justify-between w-full">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={40}
          className="w-20 h-auto object-contain"
        />
        <p className="text-xl font-semibold text-gray-700">
          DELTA
          <br /> Facility Services
        </p>
      </div>

      {/* Desktop Navigation Links */}
      <motion.div
        className="hidden lg:flex items-center space-x-6 border rounded-full 
          shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] 
          z-[5000] px-10 py-5 border-[#EF4D48]/[0.2] relative left-[-60px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.a
          href="#home"
          className="text-[rgb(61,61,78)] text-sm font-semibold hover:text-[#EF4D48]"
          whileHover={{ scale: 1.1 }}
        >
          Home
        </motion.a>
        <motion.a
          href="#portfolio"
          className="text-[rgb(61,61,78)] text-sm font-semibold hover:text-[#EF4D48]"
          whileHover={{ scale: 1.1 }}
        >
          Portfolio
        </motion.a>
        <motion.a
          href="#about-us"
          className="text-[rgb(61,61,78)] text-sm font-semibold hover:text-[#EF4D48]"
          whileHover={{ scale: 1.1 }}
        >
          About Us
        </motion.a>
        <motion.a
          href="#quotation"
          className="text-[rgb(61,61,78)] text-sm font-semibold hover:text-[#EF4D48]"
          whileHover={{ scale: 1.1 }}
        >
          Get Quotation
        </motion.a>
      </motion.div>

      {/* Get in Touch Button (Desktop) */}
      <div className="hidden lg:flex space-x-4">
        <motion.a
          href="https://www.facebook.com/people/Delta-Facility-Services/61553752537939/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#000] hover:text-[#EF4D48]"
          whileHover={{ scale: 1.2 }}
        >
          <FaFacebookF size={20} />
        </motion.a>
        <motion.a
          href="https://www.instagram.com/deltafacilityservices/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#000] hover:text-[#EF4D48]"
          whileHover={{ scale: 1.2 }}
        >
          <FaInstagram size={20} />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/company/delta-hub-facility-services/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#000] hover:text-[#EF4D48]"
          whileHover={{ scale: 1.2 }}
        >
          <FaLinkedinIn size={20} />
        </motion.a>
        <motion.a
          href="https://twitter.com/Delta_Facility"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#000] hover:text-[#EF4D48]"
          whileHover={{ scale: 1.2 }}
        >
          <FaTwitter size={20} />
        </motion.a>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden flex items-start justify-start z-[100]">
        <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Links */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="overflow-hidden absolute top-0 left-0 w-full h-full bg-[#e9e9e9] mt-[7rem] px-10 z-10 shadow-md flex flex-col items-start space-y-4 py-4 lg:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href="#home"
              className="text-[rgb(61,61,78)] text-sm font-semibold hover:text-[#EF4D48]"
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              Home
            </motion.a>
            <motion.a
              href="#portfolio"
              className="text-[rgb(61,61,78)] text-sm font-semibold hover:text-[#EF4D48]"
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              Portfolio
            </motion.a>
            <motion.a
              href="#about-us"
              className="text-[rgb(61,61,78)] text-sm font-semibold hover:text-[#EF4D48]"
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              About Us
            </motion.a>
            <motion.a
              href="#quotation"
              className="text-[rgb(61,61,78)] text-sm font-semibold hover:text-[#EF4D48]"
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              Get Quotation
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
