"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Servies from "./components/Servies";
import Partners from "./components/Partners";
import Location from "./components/Location";
import Contactus from "./components/Contactus";
import Footer from "./components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Wait for the document to fully load
    const handleLoad = () => {
      setIsLoading(false);

      // Initialize animations after loading
      const sections = document.querySelectorAll(".animated-section");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 }, // Initial state
          {
            opacity: 1,
            y: 0, // Final state
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
          .loader {
            width: 50px;
            height: 50px;
            border: 5px solid transparent;
            border-top-color: #FBA465; /* Tailwind's blue-500 */
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
        `}</style>
        {/* Rotating Circle */}
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 font-[family-name:var(--font-geist-sans)] p-2">
      {/* Add the `animated-section` class to each component */}
      <Navbar />
      <div className="relative z-0">
        <Hero />
      </div>
      <Servies />
      <Partners />
      <div className="pb-10">
        <Location />
      </div>
      <Contactus />
      <Footer />
    </div>
  );
}
