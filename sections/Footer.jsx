"use client";

import Image from "next/image";
import Link from "next/link";
import Social from "../components/Socials"; // Asegúrate que este componente esté bien
import { Button } from "../components/ui/button"; // Asegúrate que este componente esté bien
import { motion } from "framer-motion";
import { useState, useEffect } from "react"; // Importa useState y useEffect

// import "../app/globals.css"; // Solo si no está importado globalmente

const navItems = [
    { href: "/#home", label: "Home", sectionId: "home" },
    { href: "/#projects", label: "Projects", sectionId: "projects" },
    { href: "/#services", label: "Services", sectionId: "services" },
    { href: "/#contact", label: "Contact", sectionId: "contact" },
];

export const Footer = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // Para evitar hydration mismatch con el año
    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    const footerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.2, // Esto animará los hijos directos de motion.footer
            },
        },
    };

    // itemVariants se aplicará a los hijos directos de motion.footer
    // (Logo/Slogan div, Socials div, nav, y los párrafos de copyright/créditos)
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const slogan = "Transform your brand with me!";
    const sloganChars = Array.from(slogan);

    const sloganContainerVariants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({ // 'i' permite personalizar el delay si usaras esta variante en múltiples H2
            opacity: 1,
            transition: { staggerChildren: 0.04, delayChildren: i * 0.1 },
        }),
    };

    const sloganCharVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { type: "spring", damping: 12, stiffness: 200 },
        },
    };

    return (
        <motion.footer
            className="bg-[#231e64] text-white py-12 md:py-16"
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10 md:mb-12 ">
                    {/* Logo and Slogan Section */}
                    <motion.div
                        variants={itemVariants} // Este div es hijo directo, así que itemVariants se aplica bien
                        className="text-center md:text-left"
                    >
                        <Link href="/" className="inline-block mb-4">
                            <motion.div
                                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            >
                                <Image
                                    src="/assets/logo.png"
                                    alt="Dada Media Design Logo"
                                    width={180}
                                    height={60}
                                    className="h-auto"
                                    // priority // Eliminado: raramente necesario para un logo en el footer
                                />
                            </motion.div>
                        </Link>
                        <motion.h2
                            variants={sloganContainerVariants}
                            className="text-3xl lg:text-4xl font-extralight text-white mb-6 md:mb-0 flex flex-wrap justify-center md:justify-start"
                        >
                            {sloganChars.map((char, index) => (
                                <motion.span key={index} variants={sloganCharVariants}>
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </motion.h2>
                    </motion.div>

                    {/* Social Icons Section */}
                    <motion.div variants={itemVariants}> {/* Este div también es hijo directo */}
                        <Social
                            containerStyles="flex gap-5 justify-center md:justify-end"
                            // iconHoverColor="text-[#03d3b0]"
                        />
                    </motion.div>
                </div>

                {/* Navigation Links */}
                <motion.nav
                    variants={itemVariants} // nav es hijo directo, itemVariants se aplica
                    className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 my-8 py-6 border-y border-white/15"
                >
                    {navItems.map(({ href, label }) => (
                        // Los motion.div aquí dentro NO necesitan itemVariants de nuevo,
                        // porque motion.nav (su padre con itemVariants) ya los anima si es un staggerChildren.
                        // Si footerVariants tiene staggerChildren, y itemVariants en nav NO tiene staggerChildren,
                        // entonces los motion.div aquí no serán animados automáticamente por itemVariants.
                        // La animación de aparición vendrá de itemVariants aplicado a motion.nav.
                        // La animación whileHover es local a cada item.
                        <motion.div
                            key={label}
                            whileHover={{ y: -3 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {/* Asumiendo que tu Button renderiza un <a> o lo maneja correctamente */}
                            <Link href={href} passHref legacyBehavior>
                                <Button variant="text" className="text-lg text-white hover:text-[#03d3b0] transition-colors duration-200">
                                    {label}
                                </Button>
                            </Link>
                            {/* Alternativa si Button no es un <a>:
                            <Link href={href} legacyBehavior>
                                <a className="text-lg text-white hover:text-[#03d3b0] transition-colors duration-200 px-3 py-2 inline-block">
                                    {label}
                                </a>
                            </Link>
                            */}
                        </motion.div>
                    ))}
                </motion.nav>

                {/* Copyright and Credits */}
                <motion.p
                    variants={itemVariants} // Hijo directo, itemVariants se aplica
                    className="text-center text-neutral-400 text-sm pt-8"
                >
                    Copyright © {currentYear} Dada Media Design • All rights reserved.
                </motion.p>
                <motion.p
                    variants={itemVariants} // Hijo directo, itemVariants se aplica
                    className="text-center text-neutral-400 text-sm pt-2 md:pt-3"
                >
                    Created by <Link href="https://portfolio-codetech.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#03d3b0] hover:text-[#ecb44b] transition-colors duration-200">Codetech Junior</Link>.
                </motion.p>
            </div>
        </motion.footer>
    );
}