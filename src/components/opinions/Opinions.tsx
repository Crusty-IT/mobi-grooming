'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

type Testimonial = {
    name: string;
    text: string;
    rating: number;
};

const testimonials: Testimonial[] = [
    {
        name: "Michał M.",
        text: "Pełen profesjonalizm! Pan Mateusz zna się na tym, co robi, a poza tym można się wiele od niego dowiedzieć na temat dbania i pielęgnacji psa.",
        rating: 5,
    },
    {
        name: "Anita M.",
        text: "Dzisiaj pierwszy raz byliśmy na strzyżeniu w salonie Mobi i z czystym sumieniem jak najbardziej polecam! Super strzyżenie, piesek zadowolony oraz bardzo miły Pan.",
        rating: 5,
    },
    {
        name: "Marek Z.",
        text: "Dzisiaj po raz pierwszy odwiedziliśmy salonik Mobi z naszym labradorem Dago. Pies odmieniony! A stało się to za sprawą pana Mateusza. Polecamy z całego serca!",
        rating: 5,
    },
    {
        name: "Miłosz Z.",
        text: "Bardzo miły i profesjonalny groomer. Mój pies skakał tam ze szczęścia.",
        rating: 5,
    },
    {
        name: "Iwona G.",
        text: "Cudownie ostrzyżone pieski. Pan, który obcinał, ma niesamowity talent do strzyżenia nożyczkami. Dziękuję!",
        rating: 5,
    },
    {
        name: "Ewelina D.",
        text: "Polecam, dobre podejście do pieska i pełen profesjonalizm.",
        rating: 5,
    },
    {
        name: "TDW C.",
        text: "Sympatyczna Pani podchodzi do pieska z wyczuciem. Zna się na tym! Polecam serdecznie!",
        rating: 5,
    },
    {
        name: "Rafał M.",
        text: "Super strzyżenie i podejście do psa.",
        rating: 5,
    },
    {
        name: "Magda P.",
        text: "Gorąco polecam, pełen profesjonalizm.",
        rating: 5,
    },
    {
        name: "Beata C.",
        text: "Najlepszy salon w Stargardzie.",
        rating: 5,
    },
    {
        name: "Shadowofyourmind",
        text: "Bardzo miła i kompetentna obsługa. Piesek także zadowolony.",
        rating: 5,
    },
];


export default function Opinions() {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(true);

    const updateArrows = () => {
        const el = scrollerRef.current;
        if (!el) return;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        setCanLeft(el.scrollLeft > 10);
        setCanRight(el.scrollLeft < maxScrollLeft - 10);
    };

    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;
        updateArrows();

        const handleScroll = () => updateArrows();
        const handleResize = () => updateArrows();

        el.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        return () => {
            el.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const scrollByAmount = (dir: 'left' | 'right') => {
        const el = scrollerRef.current;
        if (!el) return;
        const cardWidth = el.querySelector('article')?.offsetWidth || 300;
        const gap = parseInt(window.getComputedStyle(el).gap || '32px', 10);
        const amount = cardWidth + gap;
        el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    };

    return (
        <section id="opinie" className="relative py-20 bg-white overflow-x-clip">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Co mówią nasi klienci
                    </h2>
                    <p className="text-xl text-gray-600">
                        Zaufało nam już wielu właścicieli pupili
                    </p>
                </div>

                <div className="relative">

                    <button
                        onClick={() => scrollByAmount('left')}
                        aria-label="Poprzednie opinie"
                        disabled={!canLeft}
                        className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <button
                        onClick={() => scrollByAmount('right')}
                        aria-label="Następne opinie"
                        disabled={!canRight}
                        className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>




                    <div
                        ref={scrollerRef}
                        className="no-scrollbar flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 py-4"
                    >
                        {testimonials.map((t, index) => (
                            <article
                                key={index}
                                className="flex-none snap-center w-[85%] sm:w-[60%] md:w-[45%] lg:w-[31%] bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-3xl border border-pink-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="mb-4 flex items-center">
                                    <div className="flex">
                                        {Array.from({ length: t.rating }).map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-6 italic">"{t.text}"</p>
                                <div className="font-semibold text-gray-900">{t.name}</div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </section>
    );
}