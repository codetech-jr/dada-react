// AnimatedListItem.js
"use client";
import React from "react";
import { motion } from "framer-motion";
import CheckIcon from "./CheckIcon"; // Assuming CheckIcon is in the same folder or adjust path

// Re-using listItemVariants from above
const listItemVariantsFM = { // Renamed to avoid conflict if in same file
    hidden: { opacity: 0, x: -20 },
    visible: { // Removed custom index 'i' if list items are staggered by parent
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
};


const AnimatedListItem = ({ item }) => {
    return (
        <motion.li
            className="flex items-start text-sm text-neutral-300"
            variants={listItemVariantsFM}
            // `initial` and `animate` will be controlled by parent `motion.ul` staggering
        >
            <CheckIcon />
            <span>{item}</span>
        </motion.li>
    );
};
export default AnimatedListItem;