"use client";

import { MdArrowOutward } from "react-icons/md";
import grainImage from "../public/assets/grain.jpg";
import { motion } from "framer-motion"; // Import Framer Motion
import "../app/globals.css";

// Color Palette:
// #231e64 (Dark Purple/Blue)
// #03d3b0 (Bright Teal)
// #ecb44b (Yellow/Gold)
// #7ed3a5 (Light Green/Mint)

export const ContactSection = () => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <section id="contact">
            <div className="py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
                        className="bg-gradient-to-r from-[#03d3b0] to-[#7ed3a5] text-[#231e64]
                        py-10 px-6 sm:py-12 sm:px-8 md:py-16 md:px-10 lg:px-12
                        rounded-3xl relative overflow-hidden z-0 shadow-xl
                        bg-200% animate-[gradientShift_15s_ease_infinite]" // Hover effect
                    >
                        {/* Grain with subtle pan (if you added the custom animation to tailwind.config.js) */}
                        <div className="absolute inset-0 -z-10 opacity-10 animate-[grainPan_50s_linear_infinite]" style={{
                                backgroundImage: `url(${grainImage.src})`,
                                backgroundRepeat: 'repeat', // Ensure it repeats
                                // backgroundSize: '512px 512px' // Optional: set a fixed size for more predictable panning
                        }}></div>

                        <div className="flex flex-col md:flex-row md:justify-between items-center gap-8 md:gap-10">
                            <div className="md:w-3/5 lg:w-2/3 text-center md:text-left">
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-3xl sm:text-4xl font-bold leading-tight text-[#231e64]"
                                >
                                    If you feel like your brand is missing that special touch, you've come to the right place!
                                </motion.h2>
                                <motion.p
                                    variants={itemVariants}
                                    className="text-sm sm:text-base text-[#231e64]/80 mt-4 md:mt-5 max-w-md mx-auto md:mx-0"
                                >
                                    With my 1:1 brand design consultation, you can rent my brain for 60 minutes to thoroughly evaluate your visual identity, logo, color palette, typography, and more.
                                </motion.p>
                            </div>

                            <motion.div
                                variants={itemVariants} // Button container also animates in
                                className="w-full md:w-auto flex justify-center md:justify-end mt-6 md:mt-0"
                            >
                                <button className="text-[#ecb44b] bg-[#231e64] hover:bg-[#231e64]/90
                                                    transition-all duration-200 ease-out
                                                    hover:-translate-y-1 hover:scale-105 active:scale-95 active:translate-y-0
                                                    inline-flex items-center justify-center px-8 py-3
                                                    rounded-xl gap-2.5 text-base md:text-lg font-semibold
                                                shadow-lg min-w-[180px] md:min-w-[200px] group"> {/* Added group */}
                                    <span>This is what I need!</span>
                                    <MdArrowOutward className="size-5 md:size-6 group-hover:rotate-45 transition-transform duration-300 ease-out"/> {/* Icon hover */}
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}