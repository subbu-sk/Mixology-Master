import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { resetCocktail, setStep } from './features/cocktail/cocktailSlice';

const Layout = ({ children }) => {
    const step = useSelector((state) => state.cocktail.step);
    const dispatch = useDispatch();

    const navLinks = [
        { id: 'mood', label: 'Mood' },
        { id: 'taste', label: 'Taste' },
        { id: 'ingredients', label: 'Ingredients' },
        { id: 'mixing', label: 'Synthesis' },
    ];

    return (
        <div className="min-h-screen bg-[var(--ivory)] selection:bg-[var(--amber)] selection:text-white">
            {/* Global Background (Mood-Aware later potentially) */}
            <div className={`fixed inset-0 pointer-events-none transition-colors duration-1000 ${step === 'mood' ? 'bg-[var(--ivory)]' : 'bg-[var(--charcoal)]'
                }`} />

            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${step === 'mood'
                ? 'glass-effect border-[var(--gold)]/20 shadow-lg'
                : 'dark-glass border-white/5 shadow-2xl'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        {/* Logo */}
                        <div
                            className="flex items-center cursor-pointer group shrink-0"
                            onClick={() => {
                                dispatch(resetCocktail());
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <span className="text-4xl mr-3 group-hover:rotate-12 transition-transform duration-300 drop-shadow-lg">🍸</span>
                            <div className="flex flex-col">
                                <h1 className={`display-font text-2xl font-black uppercase tracking-[0.2em] transition-colors duration-500 ${step === 'mood' ? 'text-[var(--mahogany)]' : 'text-white'
                                    }`}>
                                    Mixology <span className="font-light text-[var(--amber)] italic">Master</span>
                                </h1>
                                <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-[var(--amber)] opacity-50">Est. 2024 • Artisanal</span>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-2">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => {
                                            dispatch(setStep(link.id));
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className={`relative px-6 py-3 text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300 group ${step === link.id
                                            ? (step === 'mood' ? 'text-[var(--mahogany)]' : 'text-white shadow-[0_0_15px_var(--amber)]')
                                            : (step === 'mood' ? 'text-[var(--charcoal)]/40 hover:text-[var(--mahogany)]' : 'text-white/30 hover:text-white italic')
                                            }`}
                                    >
                                        <span className="relative z-10">{link.label}</span>
                                        {step === link.id && (
                                            <motion.div
                                                layoutId="nav-active"
                                                className={`absolute bottom-0 left-6 right-6 h-0.5 shadow-[0_0_10px_var(--amber)] ${step === 'mood' ? 'bg-[var(--amber)]' : 'bg-[var(--gold)]'
                                                    }`}
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        <div className={`absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-10 rounded-xl -z-0 ${step === 'mood' ? 'bg-[var(--mahogany)]' : 'bg-white'
                                            }`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Status */}
                        <div className="md:hidden flex items-center">
                            <div className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-colors duration-500 ${step === 'mood'
                                ? 'bg-[var(--mahogany)] text-white'
                                : 'bg-[var(--amber)] text-[var(--charcoal)] shadow-xl shadow-[var(--amber)]/20'
                                }`}>
                                {step === 'mood' ? 'Mood Selection' : `Step: ${step}`}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Premium Footer */}
            <footer className={`transition-colors duration-1000 py-20 px-4 relative z-10 border-t ${step === 'mood' ? 'bg-[var(--ivory)] border-[var(--gold)]/10' : 'bg-[var(--charcoal)] border-white/5 shadow-inner'
                }`}>
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">
                    <div className="flex flex-col items-center">
                        <h3 className={`display-font text-5xl font-black mb-2 transition-colors duration-500 ${step === 'mood' ? 'text-[var(--mahogany)]' : 'text-white'
                            }`}>Mixology Master</h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--amber)] to-transparent" />
                    </div>

                    <p className={`max-w-lg transition-colors duration-500 font-serif italic text-lg ${step === 'mood' ? 'text-gray-500' : 'text-white/40'
                        }`}>
                        "Crafting perfect moments, one molecular synthesis at a time. Discover the art of the perfect pour."
                    </p>

                    <div className="flex gap-10">
                        {['Press', 'Legal', 'Privacy', 'Heritage'].map(link => (
                            <a key={link} href="#" className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-colors ${step === 'mood' ? 'text-[var(--charcoal)]/30 hover:text-[var(--mahogany)]' : 'text-white/20 hover:text-[var(--amber)]'
                                }`}>{link}</a>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className={`text-[10px] uppercase font-black tracking-[0.6em] transition-colors ${step === 'mood' ? 'text-gray-300' : 'text-white/5'
                            }`}>© 2024 Mixology Master Pro • Geneva Labs</div>
                        <p className={`text-[9px] uppercase tracking-[0.2em] font-bold transition-colors ${step === 'mood' ? 'text-red-900/40' : 'text-[var(--amber)]/40'
                            }`}>Please Enjoy Responsibly • 21+</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
