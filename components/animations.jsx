// You can put these at the top of your file or in a separate animations.js file

const sectionFadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({ // Accept a delay parameter
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

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({ // i is the custom index for staggering
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.15, // Stagger delay for each card
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.07, // Stagger delay for each list item
            duration: 0.4,
            ease: "easeOut",
        },
    }),
};

// Variants for elements within the card, to be staggered after card appears
const cardContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};