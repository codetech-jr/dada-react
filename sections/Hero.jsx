"use client"

import Image from "next/image";
import memojiComputer from '../public/assets/memoji-computer.png';
import { FaArrowDownLong } from "react-icons/fa6";
import grainImage from "../public/assets/grain.jpg"
import { HeroOrbit } from "../components/HeroOrbit"; // Assuming this component is styled appropriately or accepts color props
import star from "../public/assets/star.png"
import { LuSparkle } from "react-icons/lu";
import "../app/globals.css"
import { FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";



// Color Palette:
// #231e64 (Dark Purple/Blue)
// #03d3b0 (Bright Teal)
// #ecb44b (Yellow/Gold)
// #7ed3a5 (Light Green/Mint)

export const HeroSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Time between each child animating
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };
    return (
        <section id="home">
            <div className="bg-[#231e64] text-white py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip">
                {/* Background Effects Layer */}
                <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
                    <div className="absolute inset-0 -z-30 opacity-5 animate-[slow-pan_60s_linear_infinite_alternate]" style={{backgroundImage:`url(${grainImage.src})`}}></div>
                    {/* Hero Rings - applied a subtle teal border. Adjust opacity as needed. */}
                    {/* Assuming 'hero-ring' class handles positioning and base styling (like border-style, border-width, rounded-full) */}
                    <div className="size-[620px] hero-ring border-[#03d3b0]/10 "></div>
                    <div className="size-[820px] hero-ring border-[#03d3b0]/10 "></div>
                    <div className="size-[1020px] hero-ring border-[#03d3b0]/10 "></div>
                    <div className="size-[1220px] hero-ring border-[#03d3b0]/10 "></div>

                    {/* Hero Orbits with Icons */}
                    <HeroOrbit 
                        size={530}
                        rotation={-45} // Ángulo inicial en la órbita
                        shouldOrbit={true}
                        orbitDuration="50s" // La estrella orbitará en 50 segundos
                        shouldSpin={true} // La estrella también girará sobre sí misma
                        spinDuration="5s"
                    >
                        <Image
                            src={star}
                            alt="star"
                            className="size-8"
                        /> 
                    </HeroOrbit>
                    <HeroOrbit 
                        size={530}
                        rotation={-45} // Ángulo inicial en la órbita
                        shouldOrbit={true}
                        orbitDuration="50s" // La estrella orbitará en 50 segundos
                        shouldSpin={true} // La estrella también girará sobre sí misma
                        spinDuration="5s"
                    >
                        <Image
                            src={star}
                            alt="star"
                            className="size-8"
                        /> 
                    </HeroOrbit>
                    <HeroOrbit 
                        size={530}
                        rotation={-45} // Ángulo inicial en la órbita
                        shouldOrbit={true}
                        orbitDuration="50s" // La estrella orbitará en 50 segundos
                        shouldSpin={true} // La estrella también girará sobre sí misma
                        spinDuration="5s"
                    >
                        <Image
                            src={star}
                            alt="star"
                            className="size-8"
                        /> 
                    </HeroOrbit>
                    <HeroOrbit 
                                        size={530}
                        rotation={-45} // Ángulo inicial en la órbita
                        shouldOrbit={true}
                        orbitDuration="50s" // La estrella orbitará en 50 segundos
                        shouldSpin={true} // La estrella también girará sobre sí misma
                        spinDuration="5s"
                    >
                        <Image
                            src={star}
                            alt="star"
                            className="size-8"
                        /> 
                    </HeroOrbit>
                    <HeroOrbit size={580} rotation={40} shouldOrbit orbitDuration="46s">
                        <Image
                            src={star}
                            alt="star"
                            className="size-8"
                        /> 
                    </HeroOrbit>
                    <HeroOrbit size={590} rotation={98} shouldOrbit orbitDuration="44s">
                        <Image
                            src={star}
                            alt="star"
                            className="size-8"
                        /> 
                    </HeroOrbit>
                    <HeroOrbit 
                        size={530}
                        rotation={-45} // Ángulo inicial en la órbita
                        shouldOrbit={true}
                        orbitDuration="50s" // La estrella orbitará en 50 segundos
                        shouldSpin={true} // La estrella también girará sobre sí misma
                        spinDuration="5s">
                        <LuSparkle  className="size-5 text-[#ecb44b]/40 animate-[twinkle_2s_ease-in-out_infinite]"/> {/* Yellow/Gold with opacity for sparkles */}
                    </HeroOrbit>
                    <HeroOrbit size={440} rotation={79} shouldOrbit orbitDuration="32s">
                        <LuSparkle  className="size-5 text-[#ecb44b]/40 animate-[twinkle_2.5s_ease-in-out_infinite_0.5s]"/>
                    </HeroOrbit>
                    <HeroOrbit size={530} rotation={178} shouldOrbit orbitDuration="34s">
                        <LuSparkle  className="size-10 text-[#ecb44b]/40 animate-[twinkle_2s_ease-in-out_infinite]"/>
                    </HeroOrbit>
                    <HeroOrbit size={580} rotation={144} shouldOrbit orbitDuration="36s">
                        <LuSparkle  className="size-14 text-[#ecb44b]/40 animate-[twinkle_2.5s_ease-in-out_infinite_0.5s]"/>
                    </HeroOrbit>
                    <HeroOrbit size={600} rotation={85} shouldOrbit orbitDuration="38s">
                        <LuSparkle  className="size-3 rounded-full text-[#ecb44b]/40 animate-[twinkle_2s_ease-in-out_infinite]"/>
                    </HeroOrbit>
                    <HeroOrbit size={600} rotation={-5} shouldOrbit orbitDuration="40s">
                        <LuSparkle  className="size-2 rounded-full text-[#ecb44b]/40 animate-[twinkle_2.5s_ease-in-out_infinite_0.5s]"/>
                    </HeroOrbit>
                    <HeroOrbit size={590} rotation={-3} shouldOrbit orbitDuration="42s">
                        <LuSparkle  className="size-4 rounded-full text-[#ecb44b]/40 animate-[twinkle_2s_ease-in-out_infinite]"/>
                    </HeroOrbit>
                </div>

                {/* Content Layer */}
                <motion.div 
                    className="container mx-auto px-4 relative z-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible" // Or control with `useInView` for scroll-triggered animation
                >
                    <div className="flex flex-col items-center">
                        <motion.div variants={itemVariants}>
                            <Image
                                src={memojiComputer}
                                alt="Person peeking from behind laptop"
                                className="size-[100px]  animate-[pop-in_0.5s_ease-out_forwards]"
                            />
                        </motion.div>
                        {/* Availability Pill */}
                        <motion.div variants={itemVariants} className="mt-6 bg-white/5 border border-white/10 px-4 py-1.5 inline-flex items-center gap-3 rounded-lg animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
                            <div className="bg-[#03d3b0] size-2.5 rounded-full relative">
                                <div className="bg-[#03d3b0] absolute inset-0 rounded-full animate-[pingLarge_1s_ease-in-out_infinite]"></div>
                            </div> {/* Teal dot */}
                            <div className="text-sm font-medium text-neutral-100">Available for new projects</div>
                        </motion.div>

                        {/* Headline and Sub-headline */}
                        <motion.div variants={itemVariants} className="max-w-lg mx-auto  animate-[fadeInUp_0.4s_ease-out_0.2s_forwards]">
                            <h1 className="text-3xl md:text-5xl text-center mt-8 tracking-wide font-semibold text-white">
                                Transform your brand with me!
                            </h1>
                            <p className="mt-4 text-center text-neutral-300 md:text-lg">
                                Let me bring the ideas you have in mind to life, together we will create a custom visual identity so that your brand flourishes and shines in no time.
                            </p>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4 animate-[fade-in-up_0.6s_ease-out_0.6s_forwards]">
                            <a href="#projects" className="inline">
                                <button className="inline-flex items-center gap-2 border border-[#03d3b0] text-[#03d3b0] px-6 h-12 rounded-xl hover:bg-[#03d3b0]/10 transition-colors duration-150  transform hover:scale-105">
                                        <span className="font-semibold">Explore My Work</span>
                                        <FaArrowDownLong className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                                </button>
                            </a>
                            <button className="inline-flex items-center gap-2 border border-[#03d3b0] bg-[#03d3b0] text-[#231e64] h-12 px-6 rounded-xl hover:bg-[#03d3b0]/90 transition-colors duration-150 transform hover:scale-105">
                                <FaLightbulb className="text-[#231e64]"/>
                                <span className="font-semibold">I want know more</span>
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};