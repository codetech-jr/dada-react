"use client";

import Image from "next/image";
import "../app/globals.css"
import { GoArrowUpRight } from "react-icons/go";
import grainImage from "../public/assets/grain.jpg";
import brand1Image from "../public/assets/brand-1.jpg";
import brand2Image from "../public/assets/brand-2.jpg";
import brand3Image from "../public/assets/brand-3.jpg";
import brand4Image from "../public/assets/brand-4.jpg";
import brand5Image from "../public/assets/Screenshot_3.png";
import brand6Image from "../public/assets/Screenshot_5.png";
import brand7Image from "../public/assets/Screenshot_6.png";

// Import Swiper components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import Framer Motion
import { motion } from "framer-motion";

const portfolioProjects = [
    {
        company: "Cuerpos Libres",
        year: "2022",
        title: "Marca Conceptual Cuerpos Libres",
        description: "THE ZAIQA is a Spanish brand that sells cocoa. One of the main challenges I had with this brand was that the client wanted the visual identity not to be pigeonholed into a specific type of product, since in the future it will be a multi-product brand.",
        link: "https://example.com",
        images: [brand1Image, brand2Image, brand3Image, brand4Image],
    },
    {
        company: "Proyecto Ejemplo 2",
        year: "2023",
        title: "Otro Proyecto Increíble",
        description: "Este proyecto tiene una sola imagen.",
        link: null,
        images: [brand5Image, brand6Image, brand7Image, brand5Image],
    },
    {
        company: "Proyecto Ejemplo 3",
        year: "2024",
        title: "Proyecto Sin Imágenes",
        description: "Este proyecto aún no tiene imágenes visuales.",
        link: "https://ejemplo.com/proyecto3",
        images: [brand6Image, brand7Image, brand5Image, brand7Image],
    },
];

// Framer Motion Variants
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (customDelay = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: customDelay,
            ease: "easeOut",
        },
    }),
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            delay: 0.1 + index * 0.15,
            ease: "easeOut",
        },
    }),
};

const cardContentVariants = {
    hidden: (direction = -30) => ({ opacity: 0, x: direction }),
    visible: {
        opacity: 1,
        x: 0,
    }
};


export const ProjectsSection = () => {
    return (
        <section id="projects" className="bg-[#231e64] text-white pb-16 lg:py-24 overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.h2
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    custom={0}
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-3xl text-center mt-6 md:text-5xl font-semibold"
                >
                    Every brand has its own incredible story of change.
                </motion.h2>
                <motion.p
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    custom={0.2}
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center lg:text-xl text-neutral-300 mt-4 md:text-lg mx-auto"
                >
                    I invite you to take a look at the journey behind each project, where you will see how we create authentic and successful brands.
                </motion.p>
                <div className="flex flex-col md:mt-20 mt-10 gap-20">
                    {portfolioProjects.map((project, index) => {
                        const staggeredCardDelay = 0.1 + index * 0.15;

                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                custom={index}
                                viewport={{ once: true, amount: 0.15 }}
                                className={`
                                    bg-black/20 rounded-3xl relative z-0 overflow-hidden 
                                    px-8 p-8 md:pt-12 md:px-10 lg:pt-16 lg:px-20 
                                    group 
                                    transition-all duration-300 ease-out
                                    hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#03d3b0]/20
                                    after:content-[''] after:absolute after:z-10 after:inset-0 
                                    after:outline-2 after:-outline-offset-2 after:rounded-3xl 
                                    after:outline-[#03d3b0]/30 after:pointer-events-none
                                    after:transition-all after:duration-300 after:ease-out
                                    group-hover:after:outline-[#03d3b0]/70 group-hover:after:outline-offset-0
                                `} // Added hover effects and transitions for card and its ::after
                            >
                                    <div
                                        className="absolute inset-0 -z-10 opacity-5 animate-[subtleGrainShift_25s_infinite_linear]"
                                        style={{ backgroundImage: `url(${grainImage.src})` }}
                                    ></div>
                                <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                                    {/* Contenido de Texto */}
                                    <motion.div
                                        variants={cardContentVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        custom={-30}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: staggeredCardDelay + 0.1,
                                            ease: "easeOut"
                                        }}
                                        className="lg:pb-16"
                                    >
                                        <div className="bg-gradient-to-r from-[#03d3b0] to-[#7ed3a5] inline-flex font-bold gap-2 uppercase tracking-widest text-sm text-transparent bg-clip-text">
                                            <span>{project.company}</span>
                                            <span>•</span>
                                            <span>{project.year}</span>
                                        </div>

                                        <h3 className="text-2xl mt-2 md:mt-5 md:text-4xl font-medium text-white ">{project.title}</h3>
                                        <hr className="border-t-2 border-[#7ed3a5]/20 mt-4 md:mt-5" />
                                        <p className="text-justify lg:text-xl text-neutral-300 mt-4 md:text-lg">
                                            {project.description ? project.description : "No description available."}
                                        </p>

                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                {/* Button: group/button and icon hover effects are already correctly implemented */}
                                                <button className="bg-[#03d3b0] hover:bg-[#03d3b0]/90 transition-colors duration-150 md:w-auto px-6 text-[#231e64] h-12 w-full rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8 group/button">
                                                    <span>View Live</span>
                                                    <GoArrowUpRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
                                                </button>
                                            </a>
                                        )}
                                    </motion.div>

                                    {/* Contenedor de la Imagen / Carrusel - en la primera columna en LG */}
                                    <motion.div
                                        variants={cardContentVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        custom={30}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: staggeredCardDelay + 0.15,
                                            ease: "easeOut"
                                        }}
                                        className="relative mt-8 lg:mt-0 lg:order-first"
                                    >
                                        {project.images && project.images.length > 0 ? (
                                            project.images.length > 1 ? (
                                                <Swiper
                                                    modules={[Navigation, Pagination, Autoplay]}
                                                    spaceBetween={10}
                                                    slidesPerView={1}
                                                    navigation={true}
                                                    pagination={{ clickable: true }}
                                                    loop={true}
                                                    autoplay={{
                                                        delay: 3500,
                                                        disableOnInteraction: false,
                                                    }}
                                                    className="rounded-xl overflow-hidden w-full [&_.swiper-button-next]:text-[#03d3b0] [&_.swiper-button-prev]:text-[#03d3b0] [&_.swiper-pagination-bullet-active]:bg-[#03d3b0] [&_.swiper-pagination-bullet]:bg-[#03d3b0]/30"
                                                >
                                                    {project.images.map((imgSrc, imgIndex) => (
                                                        <SwiperSlide key={imgIndex}>
                                                            <Image
                                                                src={imgSrc}
                                                                alt={`${project.title} - Imagen ${imgIndex + 1}`}
                                                                className="w-full h-auto object-cover"
                                                                width={500}
                                                                height={400}
                                                                priority={index === 0 && imgIndex === 0}
                                                            />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            ) : (
                                                <Image
                                                    src={project.images[0]}
                                                    alt={project.title}
                                                    className="rounded-xl w-full h-auto object-cover"
                                                    width={500}
                                                    height={400}
                                                    priority={index === 0}
                                                />
                                            )
                                        ) : (
                                            <div className="flex items-center justify-center h-[400px] bg-black/10 rounded-xl text-neutral-400">
                                                No image available
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};