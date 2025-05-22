"use client";

import React, { useState } from "react";
import { useInView } from "react-intersection-observer"; // Import
import "../app/globals.css"

// Color Palette:
// #231e64 (Dark Purple/Blue)
// #03d3b0 (Bright Teal)
// #ecb44b (Yellow/Gold)
// #7ed3a5 (Light Green/Mint)

const faqsData = [
    // ... (your faqsData remains the same)
    {
        id: 1,
        question: "What are the payment methods?",
        answer: "If you are in a country other than Venezuela, payments are made through Paypal and Binance. If you are in Venezuela, payments are made in bolivars, mobile payment, transfer, and Binance.",
    },
    {
        id: 2,
        question: "Do you work with clients from other countries?",
        answer: "Yes, 90% of my clients are in different countries. That is not a problem for us to work together.",
    },
    {
        id: 3,
        question: "What is the payment method?",
        answer: "Brand design consulting is 100% paid before starting. For other design plans, 50% is paid in advance and 50% upon completion of the project.",
    },
];

const FaqItem = ({ id, question, answer, isOpen, onToggle, index }) => {
    // For individual item fade-in
    const { ref: itemRef, inView: itemInView } = useInView({
        triggerOnce: true, // Animate only once
        threshold: 0.1,    // Trigger when 10% of the item is visible
    });

    return (
        <div
            ref={itemRef}
            key={id}
            className={`border-t border-white/15 border-dotted last:border-b transition-all duration-500 ${
                itemInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }} // Staggered delay
        >
            <button
                onClick={onToggle}
                className="group flex items-center justify-between w-full py-6 md:py-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#03d3b0] focus-visible:ring-opacity-75 transition-colors duration-200 hover:bg-[#03d3b0]/5" // Added group and hover bg
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${id}`}
            >
                <span className="text-xl md:text-2xl font-medium text-white group-hover:text-[#7ed3a5] transition-colors duration-200"> {/* Question text hover color */}
                    {question}
                </span>
                <div
                    className={`inline-flex items-center justify-center size-10 md:size-11 border border-[#03d3b0]/70 rounded-full shrink-0 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:border-[#ecb44b] ${ // Icon hover scale and border color
                        isOpen ? 'rotate-180 bg-[#03d3b0]/10' : 'rotate-0'
                    }`}
                >
                    {isOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-5 md:size-6 text-[#ecb44b]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 12h-15"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-5 md:size-6 text-[#03d3b0] group-hover:text-[#ecb44b] transition-colors duration-200" // Icon color hover
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    )}
                </div>
            </button>
            <div
                id={`faq-answer-${id}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                {/* Added inner div for slideDownEnter animation */}
                <div className={`pb-6 md:pb-8 pr-12 text-base md:text-lg leading-relaxed text-neutral-300 ${isOpen ? 'animate-[slideDownEnter_0.4s_ease-in-out]' : ''}`}>
                    {answer}
                </div>
            </div>
        </div>
    );
};


export const Faqs = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    // For the whole section fade-in
    const { ref: sectionRef, inView: sectionInView } = useInView({
        triggerOnce: true,
        threshold: 0.1, // Adjust as needed
    });

    return (
        <section
            ref={sectionRef}
            className={`py-12 md:py-20 text-white transition-opacity duration-1000 ${ // Section fade-in
                sectionInView ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div className="container mx-auto px-4">
                <h2 className={`text-3xl md:text-4xl font-semibold text-center mb-12 md:mb-16 transition-all duration-700 delay-200 ${ // Title animation
                    sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}>
                    You're probably wondering:
                </h2>
                <div className="max-w-3xl mx-auto">
                    {faqsData.map(({ id, question, answer }, index) => (
                        <FaqItem
                            key={id}
                            id={id}
                            question={question}
                            answer={answer}
                            isOpen={openFaqIndex === index}
                            onToggle={() => toggleFaq(index)}
                            index={index} // Pass index for staggered delay
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};