// PricingPlanCard.js
"use client";
import React from "react";
import { motion } from "framer-motion";
import AnimatedListItem from "./AnimatedListItem"; // Adjust path

// Variants from above (or imported)
const cardVariantsFM = { // Renamed
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.05, // Stagger direct motion children of the card
        },
    }),
};

const cardContentVariantsFM = { // Renamed
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const listContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.07, // This will stagger AnimatedListItem components
        }
    }
};


const PricingPlanCard = ({ plan, index }) => {
    return (
        <motion.div
            className="bg-black/20 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col ring-1 ring-[#03d3b0]/20 hover:shadow-2xl hover:ring-[#03d3b0]/50"
            variants={cardVariantsFM}
            initial="hidden"
            whileInView="visible" // Triggers animation when in view
            viewport={{ once: true, amount: 0.15 }} // Animate once, when 15% is visible
            custom={index} // Pass index for staggering delay in cardVariants
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }} // Hover effect
        >
            <motion.h3 variants={cardContentVariantsFM} className="text-2xl font-semibold text-[#ecb44b] mb-3">{plan.title}</motion.h3>
            <motion.p variants={cardContentVariantsFM} className="text-4xl font-extrabold text-[#ecb44b] mb-4">{plan.pricing}</motion.p>
            <motion.p variants={cardContentVariantsFM} className="text-neutral-300 mb-6 text-sm leading-relaxed">{plan.description}</motion.p>

            <motion.div variants={cardContentVariantsFM} className="mb-6">
                <h4 className="font-medium text-neutral-100 mb-2 text-sm">WHAT'S INCLUDED:</h4>
                <motion.ul
                    className="space-y-2"
                    variants={listContainerVariants} // To stagger its children
                    // initial="hidden" and animate="visible" will be inherited from parent card's "visible" state
                >
                    {plan.service.map((item, sIndex) => (
                        <AnimatedListItem key={sIndex} item={item} />
                    ))}
                </motion.ul>
            </motion.div>

            <motion.div variants={cardContentVariantsFM} className="mb-6">
                <h4 className="font-medium text-neutral-100 mb-2 text-sm">DELIVERABLES:</h4>
                <motion.ul
                    className="space-y-2"
                    variants={listContainerVariants}
                >
                    {plan.deliverables.map((item, dIndex) => (
                        <AnimatedListItem key={dIndex} item={item} />
                    ))}
                </motion.ul>
            </motion.div>

            <motion.div variants={cardContentVariantsFM} className="text-sm text-neutral-400 mb-8">
                <strong>Duration:</strong> {plan.duration}
            </motion.div>

            <motion.button
                variants={cardContentVariantsFM}
                className="mt-auto w-full bg-[#03d3b0] text-[#231e64] font-bold py-3 px-6 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#ecb44b] focus:ring-offset-2 focus:ring-offset-[#231e64]"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(3, 211, 176, 0.9)" }}
                whileTap={{ scale: 0.98 }}
            >
                Choose Plan
            </motion.button>
        </motion.div>
    );
};
export default PricingPlanCard;