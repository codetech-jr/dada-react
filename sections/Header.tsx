"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import "../app/globals.css" // Assuming this contains your fadeInDown if you keep it, or other global styles

// Define your color palette as constants
const PALETTE = {
    darkBluePurple: '#231e64',
    brightTeal: '#03d3b0',
    mustardYellow: '#ecb44b',
    lightMintGreen: '#7ed3a5',
    lightText: '#e2e8f0',
    hoverLightText: '#ffffff', // For active link text
};

export const Header = () => {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState('');

    const navLinks = [
        { href: "/#home", label: "Home", sectionId: "home" },
        { href: "/#projects", label: "Projects", sectionId: "projects" },
        { href: "/#services", label: "Services", sectionId: "services" },
        { href: "/#contact", label: "Contact", sectionId: "contact" },
    ];

    useEffect(() => {
        // ... (your useEffect logic - looks good)
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.4
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = navLinks
            .map(link => document.getElementById(link.sectionId))
            .filter(Boolean);

        sections.forEach(section => {
            if (section) observer.observe(section);
        });

        const currentHash = window.location.hash.substring(1);
        if (navLinks.some(link => link.sectionId === currentHash)) {
            setActiveSection(currentHash);
        } else if (navLinks.length > 0 && !currentHash && pathname === "/") { // Only default if on homepage and no hash
            // setActiveSection(navLinks[0].sectionId); // Consider if you want a default active
        }

        return () => {
            sections.forEach(section => {
                if (section) observer.unobserve(section);
            });
        };
    }, [navLinks, pathname]); // Added pathname to ensure effect reruns if path changes and you want to reset active section logic


    const handleLinkClick = (e, sectionId) => {
        // ... (your handleLinkClick logic - looks good)
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = sectionElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            if (history.pushState) {
                history.pushState(null, null, `#${sectionId}`);
            } else {
                window.location.hash = sectionId;
            }
            setActiveSection(sectionId);
        }
    };


    const navContainerStyle = `
        flex items-center gap-1 sm:gap-1.5 p-1 border border-white/10 rounded-full
        bg-[${PALETTE.darkBluePurple}]/75 backdrop-blur-md shadow-lg
    `;

    // --- KEY CHANGE HERE ---
    const navItemBaseStyle = `
        relative px-4 py-1.5 rounded-full text-sm font-medium
        transition-all duration-200 ease-in-out cursor-pointer
    `; // Added 'relative'

    const inactiveLinkTextStyle = `
        text-[${PALETTE.lightMintGreen}] hover:text-[${PALETTE.mustardYellow}] hover:scale-105 hover:shadow-md
    `;

    const activeLinkTextStyle = `
        text-[${PALETTE.hoverLightText}]
    `;

    const activePillStyle = `
        absolute inset-0 rounded-full bg-black/30 z-[-1]
    `;

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            // Removed: animate-[fadeInDown_0.5s_ease-out_forwards]
            className="flex justify-center items-start fixed top-4 md:top-6 w-full z-50 px-4"
        >
            <nav className={navContainerStyle}>
                {navLinks.map((link) => {
                    const isActive = activeSection === link.sectionId;
                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.sectionId)}
                            className={`
                                ${navItemBaseStyle}
                                ${isActive ? activeLinkTextStyle : inactiveLinkTextStyle}
                            `}
                            scroll={false}
                        >
                            {link.label}
                            {isActive && (
                                <motion.div
                                    className={activePillStyle}
                                    layoutId="active-nav-pill"
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                    }}
                                />
                            )}
                        </Link>
                    );
})}
            </nav>
        </motion.header>
    );
};