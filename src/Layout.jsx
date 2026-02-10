import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { resetCocktail, setStep } from './features/cocktail/cocktailSlice';

const Layout = ({ children }) => {
    const step = useSelector((state) => state.cocktail.step);
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { id: 'mood', label: 'Mood' },
        { id: 'taste', label: 'Taste' },
        { id: 'ingredients', label: 'Ingredients' },
        { id: 'mixing', label: 'Synthesis' },
    ];

    return (
        <div className="min-h-screen bg-[var(--ivory)] selection:bg-[var(--amber)] selection:text-white">
            {/* Global Background */}
            <div className={`fixed inset-0 pointer-events-none transition-colors duration-1000 ${step === 'mood' ? 'bg-[var(--ivory)]' : 'bg-[var(--charcoal)]'
                }`} />

            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${step === 'mood'
                ? 'glass-effect border-[var(--gold)]/20 shadow-lg'
                : 'dark-glass border-white/5 shadow-2xl'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20 md:h-24">
                        {/* Logo */}
                        <div
                            className="flex items-center cursor-pointer group shrink-0"
                            onClick={() => {
                                dispatch(resetCocktail());
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <span className="text-3xl md:text-4xl mr-3 group-hover:rotate-12 transition-transform duration-300 drop-shadow-lg">🍸</span>
                            <div className="flex flex-col">
                                <h1 className={`display-font text-lg md:text-2xl font-black uppercase tracking-[0.2em] transition-colors duration-500 ${step === 'mood' ? 'text-[var(--mahogany)]' : 'text-white'
                                    }`}>
                                    Mixology <span className="font-light text-[var(--amber)] italic">Master</span>
                                </h1>
                                <span className="text-[6px] md:text-[8px] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-[var(--amber)] opacity-50">Est. 2024 • Artisanal</span>
                            </div>
                        </div>

                        {/* Navigation Links - Desktop */}
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

                        {/* Mobile Controls */}
                        <div className="md:hidden flex items-center gap-3">
                            <div className={`px-4 py-1.5 rounded-full text-[8px] md:text-[10px] font-black tracking-widest uppercase transition-colors duration-500 ${step === 'mood'
                                ? 'bg-[var(--mahogany)] text-white'
                                : 'bg-[var(--amber)] text-[var(--charcoal)] shadow-xl shadow-[var(--amber)]/20'
                                }`}>
                                {step === 'mood' ? 'Focus' : step}
                            </div>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`p-2 rounded-lg transition-colors ${step === 'mood' ? 'text-[var(--mahogany)] bg-black/5' : 'text-white bg-white/5'}`}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    {isMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`md:hidden border-t overflow-hidden ${step === 'mood' ? 'glass-effect border-[var(--gold)]/20 shadow-lg' : 'dark-glass border-white/5 shadow-2xl'}`}
                        >
                            <div className="flex flex-col p-4 gap-2">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => {
                                            dispatch(setStep(link.id));
                                            setIsMenuOpen(false);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-[9px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${step === link.id
                                            ? (step === 'mood' ? 'bg-[var(--mahogany)] text-white' : 'bg-[var(--amber)] text-[var(--charcoal)]')
                                            : (step === 'mood' ? 'text-[var(--charcoal)]/60 hover:bg-black/5' : 'text-white/40 hover:bg-white/5')
                                            }`}
                                    >
                                        <span>{link.label}</span>
                                        {step === link.id && <span className="text-sm">✨</span>}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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
            <footer className={`transition-colors duration-1000 py-12 md:py-20 px-4 relative z-10 border-t ${step === 'mood' ? 'bg-[var(--ivory)] border-[var(--gold)]/10' : 'bg-[var(--charcoal)] border-white/5 shadow-inner'
                }`}>
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6 md:space-y-12">
                    <div className="flex flex-col items-center">
                        <h3 className={`display-font text-2xl md:text-5xl font-black mb-2 transition-colors duration-500 ${step === 'mood' ? 'text-[var(--mahogany)]' : 'text-white'
                            }`}>Mixology Master</h3>
                        <div className="w-12 md:w-24 h-1 bg-gradient-to-r from-transparent via-[var(--amber)] to-transparent" />
                    </div>

                    <p className={`max-w-lg transition-colors duration-500 font-serif italic text-sm md:text-lg px-4 ${step === 'mood' ? 'text-gray-500' : 'text-white/40'
                        }`}>
                        "Crafting perfect moments, one molecular synthesis at a time. Discover the art of the perfect pour."
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-10">
                        {['Press', 'Legal', 'Privacy', 'Heritage'].map(link => (
                            <a key={link} href="#" className={`text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] transition-colors ${step === 'mood' ? 'text-[var(--charcoal)]/30 hover:text-[var(--mahogany)]' : 'text-white/20 hover:text-[var(--amber)]'
                                }`}>{link}</a>
                        ))}
                    </div>

                    <div className="space-y-3">
                        <div className={`text-[8px] md:text-[10px] uppercase font-black tracking-[0.3em] md:tracking-[0.6em] transition-colors ${step === 'mood' ? 'text-gray-300' : 'text-white/5'
                            }`}>© 2024 Mixology Master Pro • Geneva Labs</div>
                        <p className={`text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-bold transition-colors ${step === 'mood' ? 'text-red-900/40' : 'text-[var(--amber)]/40'
                            }`}>Please Enjoy Responsibly • 21+</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
