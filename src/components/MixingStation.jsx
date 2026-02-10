import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../features/cocktail/cocktailSlice';

const MixingStation = () => {
    const { ingredients } = useSelector((state) => state.cocktail);
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(0);
    const [isMixing, setIsMixing] = useState(false);
    const [technique, setTechnique] = useState(null); // 'shake' or 'stir'

    useEffect(() => {
        let interval;
        if (isMixing) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => dispatch(setStep('result')), 800);
                        return 100;
                    }
                    return prev + (technique === 'shake' ? 1.5 : 1);
                });
            }, 30);
        }
        return () => clearInterval(interval);
    }, [isMixing, technique, dispatch]);

    const shakeAnimation = {
        rotate: [0, -20, 20, -20, 20, 0],
        x: [0, -10, 10, -10, 10, 0],
        y: [0, -10, 10, -10, 10, 0],
        transition: {
            duration: 0.4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const stirAnimation = {
        rotate: 360,
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
        }
    };

    return (
        <div className="min-h-screen py-32 px-4 bg-[var(--charcoal)] flex items-center justify-center relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[var(--mahogany)] blur-[150px] opacity-30" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[var(--amber)] blur-[150px] opacity-30" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl w-full text-center relative z-10"
            >
                <header className="mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-[var(--gold)]/20 text-[var(--gold)] text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
                    >
                        Molecular Phase 04
                    </motion.div>
                    <motion.h2
                        className="display-font text-7xl font-black text-white"
                    >
                        Synthesis in <span className="text-gradient italic">Motion</span>
                    </motion.h2>
                </header>

                <AnimatePresence mode="wait">
                    {!isMixing ? (
                        <motion.div
                            key="method-choice"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col md:flex-row justify-center gap-10"
                        >
                            {[
                                { id: 'shake', label: 'Shake', emoji: '🥤', desc: 'Aerated & Cold' },
                                { id: 'stir', label: 'Stir', emoji: '🥃', desc: 'Silky & Clear' }
                            ].map((method) => (
                                <motion.button
                                    key={method.id}
                                    whileHover={{ y: -12, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setTechnique(method.id);
                                        setIsMixing(true);
                                    }}
                                    className="group relative dark-glass p-12 rounded-[3.5rem] border-2 border-transparent hover:border-[var(--amber)] transition-all duration-500 w-80 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-8xl block mb-8 relative z-10 group-hover:drop-shadow-[0_0_40px_rgba(212,165,116,0.5)] transition-all">
                                        {method.emoji}
                                    </span>
                                    <h3 className="display-font text-3xl font-bold text-white mb-2 relative z-10">{method.label}</h3>
                                    <p className="text-[var(--amber)] text-[10px] font-black uppercase tracking-[0.2em] relative z-10">{method.desc}</p>

                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--amber)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                                </motion.button>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="mixing-animation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-16"
                        >
                            <div className="relative h-96 flex items-center justify-center">
                                {/* Intense Ambient Glow */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.2, 0.4, 0.2]
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--amber),transparent_60%)] blur-[100px] -z-10"
                                />

                                <motion.div
                                    animate={technique === 'shake' ? shakeAnimation : stirAnimation}
                                    className="text-[15rem] relative filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                                >
                                    {technique === 'shake' ? '🥤' : '🥃'}

                                    {/* Particle Bursts during mixing */}
                                    <motion.div
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0.5, 2, 0.5],
                                            rotate: 360,
                                            y: [-50, 50, -50]
                                        }}
                                        transition={{ duration: 1.2, repeat: Infinity }}
                                        className="absolute -top-10 -right-10 text-5xl"
                                    >
                                        ✨
                                    </motion.div>
                                    <motion.div
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0.5, 1.8, 0.5],
                                            rotate: -360,
                                            x: [-50, 50, -50]
                                        }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="absolute -bottom-10 -left-10 text-4xl"
                                    >
                                        ✨
                                    </motion.div>
                                </motion.div>
                            </div>

                            <div className="max-w-xl mx-auto space-y-6">
                                <div className="flex justify-between items-end mb-2">
                                    <div className="text-left">
                                        <div className="text-[10px] text-white/30 font-bold uppercase tracking-[0.4em] mb-1">Process</div>
                                        <span className="display-font text-3xl font-bold text-[var(--gold)] italic">
                                            {technique === 'shake' ? 'Molecular Shaking' : 'Cold Infusion'}
                                        </span>
                                    </div>
                                    <span className="font-mono text-[var(--amber)] font-black text-4xl">{Math.floor(progress)}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner p-0.5">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[var(--mahogany)] via-[var(--amber)] to-[var(--gold)] rounded-full shadow-[0_0_15px_var(--amber)]"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.5em] animate-pulse">Equilibrium Calibration in Progress</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default MixingStation;
