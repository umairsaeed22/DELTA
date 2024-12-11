'use client';
import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Service = {
    id: number;
    content: string;
    imgUrl: string;
    src: string;
    backgroundColor: string;
};

type ServiceType = "digital" | "facility";

const Services = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animation for `#chip`
        gsap.from("#chip", {
            scrollTrigger: {
                trigger: "#chip",
                start: "20% bottom",
            },
            opacity: 0,
            scale: 2,
            duration: 2,
            ease: "power2.inOut",
        });

        // Animation for `.g_fadeIn`
        gsap.from(".g_fadeIn", {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: ".g_fadeIn",
                start: "top bottom",
            },
        });
    }, []);

    const allServices: Service[] = [
        { id: 1, content: "Website Design & Development", imgUrl: "", src: "/revshare.mp4", backgroundColor: "" },
        { id: 2, content: "Mobile Application Development", imgUrl: "/digital.jpg", src: "", backgroundColor: "" },
        { id: 3, content: "Search Engine Optimization (SEO)", imgUrl: "/Web.jpg", src: "", backgroundColor: "#FF9800" },
        { id: 4, content: "Digital Marketing", imgUrl: "", src: "/digitalM.mp4", backgroundColor: "#68ff00" },
        { id: 5, content: "Digital Ads Campaign Management", imgUrl: "/radio.jpg", src: "", backgroundColor: "#FF5722" },
        { id: 6, content: "Brand Design and Development", imgUrl: "/mobile.png", src: "", backgroundColor: "#3F51B5" },
        { id: 7, content: "Airport & Train Maintenance & Management Services", imgUrl: "", src: "/airports.mp4", backgroundColor: "rgb(218, 255, 159)" },
        { id: 8, content: "IT Support Services", imgUrl: "/building.jpg", src: "", backgroundColor: "#8BC34A" },
        { id: 9, content: "Landscaping", imgUrl: "/plants.jpg", src: "", backgroundColor: "#4CAF50" },
        { id: 10, content: "Pest Control", imgUrl: "/pest.jpg", src: "", backgroundColor: "#000" },
        { id: 11, content: "Commercial Cleaning", imgUrl: "/commercial.jpg", src: "", backgroundColor: "#00BCD4" },
        { id: 12, content: "Recruitment & Manpower Services", imgUrl: "/trains.jpg", src: "", backgroundColor: "#009688" },
        { id: 13, content: "Building Cleaning", imgUrl: "/buildingcleaning.jpg", src: "", backgroundColor: "#009688" },
        { id: 14, content: "Event Management", imgUrl: "/Elegant.jpg", src: "", backgroundColor: "rgb(218, 255, 159)" },
        { id: 15, content: "Housemaid Services", imgUrl: "/Housemaidservice.jpg", src: "", backgroundColor: "rgb(218, 255, 159)" },
        { id: 16, content: "Heavy Machine Operators", imgUrl: "/Heavy.jpg", src: "", backgroundColor: "rgb(218, 255, 159)" },
        { id: 17, content: "Social Media Handling", imgUrl: "/management.jpg", src: "", backgroundColor: "#8BC34A" },
        { id: 18, content: "Videography & Editing", imgUrl: "/Earbuds.jpg", src: "", backgroundColor: "#8BC34A" }
    ];

    const [filteredServices, setFilteredServices] = useState<Service[]>(allServices.filter(service => ![1, 2, 3, 4, 5, 6, 8, 17, 18].includes(service.id)));
    const [selectedService, setSelectedService] = useState<ServiceType>("facility");

    const handleToggleChange = (service: ServiceType) => {
        setSelectedService(service);
        if (service === "digital") {
            setFilteredServices(allServices.filter(service => [1, 2, 3, 4, 5, 6, 8, 17, 18].includes(service.id)));
        } else {
            setFilteredServices(allServices.filter(service => ![1, 2, 3, 4, 5, 6, 8, 17, 18].includes(service.id)));
        }
    };

    return (
        <div className="w-full text-center overflow-hidden mb-10 md:mt-0" id="about-us">
            <span className="text-[rgb(61,61,78)] text-[25px] md:text-[35px] font-bold  block py-15">
                About DELTA
            </span>
            <p className="text-gray-500 text-xs md:text-sm leading-5 font-normal text-center py-5">
                At DELTA Facility Services, we are your one-stop solution for digital and facility services. We deliver tailored, high-quality solutions to enhance your business <br />and environment,
                combining innovation and expertise to meet your unique needs with excellence and reliability.
            </p>

            {/* Toggle Section */}
            <div className="flex justify-center gap-8 items-center mt-5">
                <button
                    onClick={() => handleToggleChange("facility")}
                    className={`text-lg font-semibold pb-2 border-b-2 transition-all duration-300 ${selectedService === "facility" ? "border-b-[#FF8C50]" : "border-b-[#000]"}`}
                    style={{ cursor: "pointer" }}
                >
                    Facility Services
                </button>
                <button
                    onClick={() => handleToggleChange("digital")}
                    className={`text-lg font-semibold pb-2 border-b-2 transition-all duration-300 ${selectedService === "digital" ? "border-b-[#FF8C50]" : "border-b-[#000]"}`}
                    style={{ cursor: "pointer" }}
                >
                    Digital Services
                </button>
            </div>

            {/* Grid Section */}
            <div
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto pt-2 md:p-10 auto-rows-[200px] grid-flow-dense"
            >
                {filteredServices.map((service, index) => (
                    <div
                        key={service.id}
                        className={`relative h-full rounded-lg p-4 flex items-center justify-center text-center font-bold text-lg text-gray-800 shadow-lg hover:shadow-xl ${index % 10 === 0
                            ? "col-span-2 md:col-span-3 lg:col-span-3 row-span-2"
                            : index % 7 === 0
                                ? "col-span-2"
                                : index % 5 === 0
                                    ? "row-span-2"
                                    : ""
                        }`}
                        style={{
                            backgroundColor: !service.imgUrl && !service.src ? service.backgroundColor : "transparent",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            borderRadius: "0.8rem",
                            overflow: "hidden",
                        }}
                    >
                        {/* Overlay */}
                        <div
                            className="absolute inset-0 bg-black bg-opacity-40 z-[1]"
                            style={{
                                borderRadius: "0.8rem",
                            }}
                        />

                        {/* Image or Video */}
                        {service.imgUrl && !service.src ? (
                            <div
                                className="absolute inset-0 w-full h-full z-[0]"
                                style={{
                                    backgroundImage: `url(${service.imgUrl})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    borderRadius: "0.8rem",
                                }}
                            />
                        ) : service.src ? (
                            <video
                                className="absolute inset-0 w-full h-full object-cover rounded-lg z-[0]"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto" // Ensures the video loads faster
                                poster={service.imgUrl || "/default-placeholder.jpg"} // Placeholder before video is loaded
                                style={{ objectFit: "cover" }}
                            >
                                <source src={service.src} type="video/mp4" />
                            </video>
                        ) : null}

                        {/* Content */}
                        <div
                            className="relative text-[13px] md:text-[20px] leading-snug z-[2] font-bold text-center"
                            style={{
                                color: "#E9E9E9", // Adaptive text color
                                textShadow: "0px 0px 8px rgba(0, 0, 0, 0.7)", // Subtle shadow
                                padding: "0 10px",
                                wordBreak: "break-word",
                                width: "fit-content",
                                height: "fit-content",
                            }}
                        >
                            {service.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
