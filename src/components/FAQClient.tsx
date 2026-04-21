"use client";

import { useState } from "react";
import { ChevronDown, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

type FAQItem = {
    question: string;
    answer: string;
};

export function FAQClient({ faqItems }: { faqItems: FAQItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <>
            {/* Header */}
            <section className="pt-28 pb-12 sm:pt-32 sm:pb-16 bg-brand-forest-900">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase mb-3 sm:mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                        Find answers to common questions about adopting a Cavalier King Charles Spaniel
                    </p>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-12 sm:py-20 -mt-6 sm:-mt-10">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="space-y-3 sm:space-y-4">
                        {faqItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-4 sm:p-6 text-left"
                                >
                                    <span className="font-bold text-sm sm:text-base md:text-lg text-brand-forest-900 pr-2 sm:pr-4">
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 sm:w-6 sm:h-6 text-brand-orange-600 shrink-0 transition-transform duration-200 ${
                                            openIndex === index ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base text-brand-forest-600 leading-relaxed">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-8 sm:mt-12 bg-brand-orange-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brand-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange-600" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-brand-forest-900 uppercase mb-2">
                            Still Have Questions?
                        </h3>
                        <p className="text-sm sm:text-base text-brand-forest-600 mb-4 sm:mb-6">
                            We're here to help you find your perfect Cavalier companion
                        </p>
                        <a href="/contact">
                            <Button className="bg-brand-orange-700 hover:bg-brand-orange-800 rounded-full font-black uppercase px-6 sm:px-8">
                                Contact Us
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}