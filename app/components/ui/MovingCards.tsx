"use client";
import React, { useEffect, useRef, useState } from "react";


export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        quote: string;
        name?: string;
        title?: string;
        imgUrl: string;
        url: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLUListElement>(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        addAnimation();
    }, []);

    const addAnimation = () => {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            // Duplicate items for continuous scroll
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                scrollerRef.current?.appendChild(duplicatedItem);
            });

            applyDirection();
            applySpeed();
            setStart(true);
        }
    };

    const applyDirection = () => {
        if (containerRef.current) {
            const animationDirection = direction === "left" ? "forwards" : "reverse";
            containerRef.current.style.setProperty("--animation-direction", animationDirection);
        }
    };

    const applySpeed = () => {
        if (containerRef.current) {
            let duration = "60s"; // Default for "normal"
            if (speed === "fast") duration = "30s"; // Fast speed
            else if (speed === "slow") duration = "5000s"; // Slower speed
            containerRef.current.style.setProperty("--animation-duration", duration);
        }
    };


    return (
        <div
            ref={containerRef}
            className={`scroller relative z-20 w-full overflow-hidden ${className}`}
        >
            <ul
                ref={scrollerRef}
                className={`flex gap-3 w-max flex-nowrap ${start ? "animate-scroll" : ""} ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
            >
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        className="relative w-[350px] h-[50vh] max-w-full rounded-3xl overflow-hidden flex-shrink-0 bg-gradient-to-r from-[#1D2235] to-[#121318] p-5 my-10 cursor-pointer group"
                        style={{
                            background: "linear-gradient(to right, #FCA765, #FB866D, #f98ba2)",
                        }}
                    >
                        <div className="relative z-10 flex flex-col items-center justify-between h-full rounded-[11px] group-hover:shadow-lg transition-shadow duration-300">
                            <div className="relative w-full h-[60%] overflow-hidden rounded-2xl">
                                <img
                                    src={item.imgUrl}
                                    alt={item.name}
                                    className="w-full h-full object-scale-down p-2 rounded-2xl"
                                />
                            </div>

                            {/* Card Content */}
                            <div className="py-4 relative z-20 w-full text-center">
                                <h2 className="text-[rgb(61 61 78)] text-2xl font-bold">{item.name}</h2>
                                <p className="text-[rgb(61 61 78)]-200 mt-4 h-[72px]">
                                    The all-new {item.name} is a game-changer in {item.title || "its field"}.
                                </p>
                            </div>

                            {/* Call to Action Button */}
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer hidden md:inline-flex relative focus:outline-none focus:ring-0 mt-6 h-12 w-full overflow-hidden rounded-full p-[1px] focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                            >
                                {/* Animated Border */}
                                <span className="absolute inset-[-1000%] animate-[spin_1s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#CE604A_0%,#FFF_50%,#FFF_100%)] sm:animate-[spin_2s_linear_infinite]" />

                                {/* Link Content */}
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white backdrop-blur-3xl">
                                    Visit Site &nbsp; →
                                </span>
                            </a>

                        </div>
                    </li>

                ))}
            </ul>
        </div>
    );
};
