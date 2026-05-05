"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FamilyImage {
    src: string;
    alt: string;
}

const familyImages: FamilyImage[] = [
    { src: "/assets/rebeccaFamily/rebeccainherweddingphoto.jpg", alt: "Our community" },
    { src: "/assets/rebeccaFamily/rebeccawithahappyfamillyandanoldlady.jpg", alt: "Happy families with their Cavaliers" },
    { src: "/assets/rebeccaFamily/rebeccaatbirthdaypartyofsomecomunitykids.jpg", alt: "Community events" },
    { src: "/assets/rebeccaFamily/rebeccaandsomeladiesatapress.jpg", alt: "Our team" },
    { src: "/assets/rebeccaFamily/rebebeccaandherfriendstakingselfieatnight.jpg", alt: "Cavalier lovers" },
    { src: "/assets/rebeccaFamily/twoofrebeccasdogssleepingonchair.jpg", alt: "Our Cavaliers" },
];

export function FamilyCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % familyImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + familyImages.length) % familyImages.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % familyImages.length);
    };

    return (
        <section 
            className="py-8 bg-brand-forest-50"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="mx-auto px-4">
                {/* Carousel Container */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Image Display */}
                    <div className="relative aspect-[16/9] md:aspect-[3/2] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                        {familyImages.map((img, idx) => (
                            <div
                                key={idx}
                                className="absolute inset-0 transition-opacity duration-700"
                                style={{ opacity: idx === currentIndex ? 1 : 0 }}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover"
                                    priority={idx === 0}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                        aria-label="Previous"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-brand-forest-900" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                        aria-label="Next"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-brand-forest-900" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-4">
                        {familyImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`min-w-[32px] min-h-[32px] md:min-w-3 md:min-h-3 p-2 md:p-0 rounded-full transition-all flex items-center justify-center ${
                                    idx === currentIndex 
                                        ? "bg-brand-orange-600 w-6 md:w-8" 
                                        : "bg-brand-orange-300 hover:bg-brand-orange-400"
                                }`}
                                aria-label={`Go to image ${idx + 1}`}
                            >
                                <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${idx === currentIndex ? "bg-white" : "bg-brand-orange-600"}`} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
