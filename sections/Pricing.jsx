"use client";
import React from "react"; // Removed useEffect, useState unless used elsewhere
import { motion } from "framer-motion";
// import { useInView } from 'react-intersection-observer'; // No longer needed for these animations

import PricingPlanCard from "../components/PricingPlanCard"; // Adjust path as necessary
// Make sure CheckIcon and AnimatedListItem are either imported here if used directly,
// or correctly imported within their respective parent components.

// Data
const pricing = [
    {
        title: "I'LL DO IT FOR YOU!",
        pricing: "$840 dollars",
        description: "If your brand's visual identity doesn't convince you, we can give it a refresh. If you want to create your brand from scratch, we can create a new brand, more aligned with who you are and what you want to achieve in the future.",
        service: ["Logo Conceptualization", "Logo and variations", "Color palette", "Fonts", "Visual differentiation strategy", "Graphic elements", "Visual Identity Manual"],
        deliverables: ["Editable in Illustrator. RGB and CMYK", "Logo in JPG, PNG and SVG formats for use in Canva", "RGB, CMYK and HEX color palette", "Visual Identity Manual in PDF"],
        duration: "2 to 3 weeks"
    },
    {
        title: "YET!",
        pricing: "$1200 dollars",
        description: "I will design EVERYTHING you need for your brand, not just the logo, but an entire visual universe that is present in all facets of your business.",
        service: ["Logo Conceptualization", "Logo and variations", "Color palette", "Fonts", "Visual differentiation strategy", "3 Social Media Templates", "Catalog/Menu or Portfolio (Choose one)","Graphic elements", "Visual Identity Manual"],
        deliverables: ["Editable in Illustrator. RGB and CMYK", "Editable templates in Canva","Logo in JPG, PNG and SVG formats for use in Canva", "RGB, CMYK and HEX color palette", "Catalog/Menu and portfolio: Editable from Canva","Visual Identity Manual in PDF"],
        duration: "3 to 4 weeks"
    }
];


// Animation Variants (can be defined here or imported)
const sectionFadeInUpFM = { // Renamed
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 15,
            stiffness: 100,
            delay,
            duration: 0.5,
        }
    })
};


export const PricingSection = () => {
    // No more useInView hooks needed here for these elements

    return (
        <section id="services">
            <div className="bg-[#231e64] text-white py-12 sm:py-16 md:py-24 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <motion.h2
                            className="text-3xl sm:text-4xl font-semibold leading-tight"
                            variants={sectionFadeInUpFM}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            custom={0} // Optional: if your variant accepts a delay/custom prop
                        >
                            Choose the plan that best suits you:
                        </motion.h2>
                        <motion.p
                            className="mt-4 text-lg text-neutral-300"
                            variants={sectionFadeInUpFM}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            custom={0.2} // Slight delay after the heading
                        >
                            We offer flexible plans to match your branding needs.
                        </motion.p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
                        {pricing.map((plan, index) => (
                            <PricingPlanCard key={index} plan={plan} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};