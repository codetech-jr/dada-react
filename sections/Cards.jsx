"use client";

import { useState } from 'react'; // 1. Import useState
import grainImage from "../public/assets/grain.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import { Navigation, Pagination, A11y, EffectCreative } from 'swiper/modules';
import { motion } from 'framer-motion';

const cards = [
    { id: 1, description: "You've tried creating your brand on Canva, but you didn't get the result you wanted." },
    { id: 2, description: "Your brand looks cheap and does not reflect the quality of your product." },
    { id: 3, description: "You have no idea what your brand needs and where to start." },
    { id: 4, description: "You have looked for designers but none of them inspire confidence in you." },
    { id: 5, description: "You are responsible for all the tasks of your business and want to delegate the design of your brand." },
    { id: 6, description: "Has this happened to you?" },
];

export const CardsSection = () => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0); // 3. Track active slide

    // Framer Motion variants for the overall section and its main children
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };
    const headingVariants = { // Renamed from childrenVariants for clarity
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };
    const swiperContainerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } }
    };
    const paragraphVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.4 } }
    };

    // 2. Animation variants for card content (the text)
    const cardTextVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
                delay: 0.15 // Delay slightly after the slide itself starts appearing
            }
        }
    };

    return (
        <motion.div
            className="container mx-auto px-4 py-16 md:py-24 text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
        >
            <motion.h2
                className="text-3xl text-center mt-6 md:text-4xl mb-10 md:mb-16 font-medium"
                variants={headingVariants}
            >
                I understand the challenges you face with your brand as you try to stand out in a world saturated with visual information, and I'm sure...
            </motion.h2>

            <motion.div
                variants={swiperContainerVariants}
            >
                <Swiper
                    modules={[Navigation, Pagination, A11y, EffectCreative]}
                    effect="creative"
                    creativeEffect={{
                        prev: { translate: ['-100%', 0, -1], opacity: 0 },
                        next: { translate: ['100%', 0, 0], opacity: 0 },
                    }}
                    slidesPerView={1}
                    centeredSlides={true}
                    spaceBetween={30}
                    navigation={true}
                    pagination={{ clickable: true }}
                    loop={cards.length > 1}
                    onSlideChange={(swiper) => { // 3. Update active index
                        setActiveSlideIndex(swiper.realIndex);
                    }}
                    className="mySwiper [&_.swiper-button-next]:text-[#03d3b0] [&_.swiper-button-prev]:text-[#03d3b0] [&_.swiper-pagination-bullet-active]:bg-[#03d3b0] [&_.swiper-pagination-bullet]:bg-[#03d3b0]/30"
                >
                    {cards.map((card, index) => (
                        <SwiperSlide key={card.id} className="h-auto self-stretch">
                            <div className="bg-black/20 rounded-3xl relative z-0 overflow-hidden card-hover-target">
                                <div
                                    className="bg-black/20 rounded-3xl relative z-0 overflow-hidden
                                                after:content-[''] after:absolute after:z-10 after:inset-0
                                                after:outline-2 after:-outline-offset-2
                                                after:rounded-3xl after:outline-[#03d3b0]/30
                                                after:pointer-events-none
                                                px-6 py-8 md:px-8 md:py-10
                                                h-full flex flex-col justify-center"
                                >
                                    <div className="absolute inset-0 -z-10 opacity-5" style={{
                                        backgroundImage: `url(${grainImage.src})`
                                    }}></div>
                                    <div className="flex-grow flex items-center justify-center text-center min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
                                        {/* 4. Animate the paragraph conditionally */}
                                        <motion.p
                                            className="text-base lg:text-xl sm:text-lg text-neutral-200"
                                            key={card.id + "-text-" + index} // Unique key for re-animation
                                            variants={cardTextVariants}
                                            initial="hidden" // Always start hidden
                                            animate={activeSlideIndex === index ? "visible" : "hidden"}
                                        >
                                            {card.description ? card.description : "No description available."}
                                        </motion.p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

            <motion.p
                className="mt-12 text-center lg:text-xl text-neutral-300 md:text-lg mx-auto mb-10 md:mb-16 max-w-3xl"
                variants={paragraphVariants}
            >
                With my graphic design service you can evolve with your brand, in just a few weeks and without complications.
            </motion.p>
        </motion.div>
    );
}