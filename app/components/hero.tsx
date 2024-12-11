"use client";
import React from "react";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import MagicButton from "./ui/MagicButton";

const Hero = () => {
    return (
        <div className="relative w-full overflow-hidden" id="home">
            {/* Background Image Div */}
            <div
                className="absolute right-0 -top-20 w-full md:w-6/12 lg:w-7/12 h-full animate-slideIn"
                style={{
                    backgroundImage: 'url(/background.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right',
                    backgroundSize: 'cover',
                    WebkitBackgroundSize: 'cover',
                    height: '100vh',
                }}
            ></div>


            {/* Content Div */}
            <div className="relative z-10 flex flex-col w-full items-center">
                <p className="text-gray-500 text-sm leading-7 font-normal">
                    Optimise Growth
                </p>
                <TextGenerateEffect
                    className="text-gray-700 text-[30px] md:text-[45px] leading-[45px] font-bold text-center pt-8"
                    words="Streamline Your Goals with Our Services & Facilities."
                />

                <p className="text-gray-500 text-sm leading-5 font-normal text-center mt-10">
                    Our innovative platform offers a robust solution to help you stay organized, focused, and on<br />
                    track to achieve your strategic objectives.
                </p>
                <MagicButton />

            </div>
        </div>
    );
};

export default Hero;
