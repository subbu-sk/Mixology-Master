import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setMood, setStep } from '../features/cocktail/cocktailSlice';
import { MOODS } from '../data';

const MoodSelection = () => {
    const dispatch = useDispatch();

    const handleSlowScroll = (targetId) => {
        const element = document.getElementById(targetId);
        if (!element) return;

        const targetPosition = element.offsetTop;
        const startPosition = window.pageYOffset;

        animate(startPosition, targetPosition, {
            duration: 2.5,
            ease: [0.43, 0.13, 0.23, 0.96],
            onUpdate: (latest) => window.scrollTo(0, latest)
        });
    };

    const handleMoodSelect = (mood) => {
        dispatch(setMood(mood));
        dispatch(setStep('taste'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Perspective Effect Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="hero-bg min-h-screen flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="display-font text-6xl md:text-8xl font-bold mb-6"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--amber)] to-[var(--gold)]">Craft</span>
                        <span className="block">Perfect</span>
                        <span className="block script-font text-5xl md:text-7xl">Cocktails</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
                    >
                        Discover the art of mixology through personalized cocktail creation. Select your mood, choose your taste, and craft the perfect drink.
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        onClick={() => handleSlowScroll('mood-selection-section')}
                        className="bg-gradient-to-r from-[var(--amber)] to-[var(--gold)] text-[var(--charcoal)] px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                        Start Mixing
                    </motion.button>
                </div>
            </section>

            {/* Showcase Section */}
            <section className="py-32 px-4 bg-gradient-to-b from-[var(--ivory)] to-[var(--cream)] overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex-1 space-y-8"
                        >
                            <h2 className="display-font text-6xl font-black text-[var(--charcoal)] leading-tight uppercase">
                                The Master's <br /><span className="text-[var(--amber)] italic">Collection</span>
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                Experience the pinnacle of mixology with our signature creations. Each drink is a testament to the harmony of high-quality spirits and fresh botanicals.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                        <h4 className="font-bold text-[var(--mahogany)] uppercase tracking-wider text-xs mb-1">Purity</h4>
                                        <p className="text-gray-400 text-[10px]">Triple-distilled foundations</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                        <h4 className="font-bold text-[var(--mahogany)] uppercase tracking-wider text-xs mb-1">Alchemy</h4>
                                        <p className="text-gray-400 text-[10px]">Precision-balanced profiles</p>
                                    </div>
                                </div>
                                <div className="pt-8 space-y-4">
                                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                        <h4 className="font-bold text-[var(--mahogany)] uppercase tracking-wider text-xs mb-1">Botany</h4>
                                        <p className="text-gray-400 text-[10px]">Fresh-picked herbal accents</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div
                            className="flex-1 relative"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{ perspective: 1000 }}
                        >
                            <motion.img
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
                                style={{ rotateX, rotateY }}
                                src="/resources/hero-landing.png"
                                className="w-full h-[500px] object-cover rounded-[60px] shadow-2xl relative z-10 border-[12px] border-white cursor-pointer"
                                alt="Master Collection"
                            />
                            <motion.img
                                initial={{ opacity: 0, x: 50, y: 50 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ delay: 0.3 }}
                                style={{ rotateX: rotateY, rotateY: rotateX }}
                                src="/resources/cocktails-showcase.png"
                                className="absolute -bottom-16 -right-16 w-64 h-64 object-cover rounded-[40px] shadow-2xl z-20 border-8 border-white pointer-events-none"
                                alt="Showcase"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Cocktail Gallery Section */}
            <section className="py-24 px-4 bg-gradient-to-b from-[var(--cream)] to-[var(--ivory)]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="display-font text-5xl font-bold text-center mb-4 text-[var(--charcoal)]">Cocktail Gallery</h2>
                    <p className="text-xl text-center mb-16 text-gray-600">Discover inspiration from our collection</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: 'Crystal Void', img: '/resources/final-cocktail.png', mood: 'Mysterious', rating: '4.9' },
                            { name: 'Amber Alchemy', img: '/resources/mixing-showcase.png', mood: 'Sophisticated', rating: '4.7' },
                            { name: 'Sunset Ember', img: '/resources/cocktails-showcase.png', mood: 'Romantic', rating: '4.8' },
                            { name: 'Botanical Bloom', img: '/resources/hero-landing.png', mood: 'Happy', rating: '4.6' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="cocktail-card rounded-3xl p-6 shadow-xl space-y-4 border border-white"
                            >
                                <img src={item.img} alt={item.name} className="w-full h-48 object-cover rounded-2xl" />
                                <h3 className="display-font text-2xl font-bold text-[var(--charcoal)]">{item.name}</h3>
                                <p className="text-gray-500 italic text-sm">{item.mood} & Refreshing</p>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-[var(--amber)] font-bold">⭐ {item.rating}</span>
                                    <button
                                        onClick={() => handleSlowScroll('mood-selection-section')}
                                        className="text-sm font-bold text-[var(--mahogany)] hover:underline"
                                    >
                                        Try Mixing
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mood Selection Section */}
            <section id="mood-selection-section" className="py-24 px-4 bg-[var(--ivory)] border-t border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="display-font text-5xl font-bold text-center mb-4 text-[var(--charcoal)]">How Are You Feeling?</h2>
                    <p className="text-xl text-center mb-16 text-gray-600">Your mood will guide our cocktail recommendations</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {MOODS.map((mood, idx) => (
                            <motion.div
                                key={mood.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => handleMoodSelect(mood)}
                                className="mood-selector bg-white rounded-3xl p-8 text-center shadow-lg border border-gray-100"
                            >
                                <div className="text-6xl mb-6">{mood.emoji}</div>
                                <h3 className="display-font text-2xl font-bold text-[var(--charcoal)] mb-3">{mood.label}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{mood.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MoodSelection;
