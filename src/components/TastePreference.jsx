import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTaste, setStep } from '../features/cocktail/cocktailSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Sliders, Zap, Droplets, Flame, Wind } from 'lucide-react';

const TastePreference = () => {
    const { taste } = useSelector((state) => state.cocktail);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setTaste({ [name]: parseInt(value) }));
    };

    const sliders = [
        { name: 'sweet', label: 'Sweetness', icon: <Droplets size={16} />, color: '#D4A574' },
        { name: 'sour', label: 'Sourness', icon: <Wind size={16} />, color: '#F4E4BC' },
        { name: 'bitter', label: 'Bitterness', icon: <Flame size={16} />, color: '#8B4513' },
        { name: 'strong', label: 'Strength', icon: <Zap size={16} />, color: '#36454F' },
        { name: 'fruity', label: 'Fruity', icon: <Sparkles size={16} />, color: '#D4A574' }
    ];

    const data = sliders.map(s => ({
        subject: s.label,
        A: taste[s.name],
        fullMark: 100,
    }));

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-[var(--charcoal)] overflow-hidden relative">
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[var(--mahogany)]/10 blur-[120px]" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[var(--amber)]/10 blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="text-center mb-10 md:mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-[var(--gold)]/20 text-[var(--gold)] text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
                    >
                        Calibration Phase 02
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="display-font text-5xl md:text-7xl font-bold text-white italic px-4"
                    >
                        Refine the <span className="text-gradient">Essence</span>
                    </motion.h2>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-12 items-start">
                    {/* Left Side: Fine Tuning Controls */}
                    <div className="xl:col-span-12 2xl:col-span-5 space-y-6 w-full max-w-2xl mx-auto xl:max-w-none">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="dark-glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem]"
                        >
                            <h3 className="text-[var(--gold)] text-xs font-bold uppercase tracking-[0.3em] mb-8 md:mb-10 flex items-center gap-3">
                                <Sliders size={18} />
                                Taste Modulation
                            </h3>

                            <div className="space-y-8 md:space-y-10">
                                {sliders.map((slider, idx) => (
                                    <motion.div
                                        key={slider.name}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * idx }}
                                        className="space-y-4"
                                    >
                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-white/5 text-[var(--amber)]">
                                                    {slider.icon}
                                                </div>
                                                <label className="text-white/80 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                                                    {slider.label}
                                                </label>
                                            </div>
                                            <span className="font-mono text-[var(--amber)] font-black text-lg md:text-xl">
                                                {taste[slider.name]}%
                                            </span>
                                        </div>
                                        <div className="relative group px-1">
                                            <input
                                                type="range"
                                                name={slider.name}
                                                min="0"
                                                max="100"
                                                step="1"
                                                value={taste[slider.name]}
                                                onChange={handleChange}
                                                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[var(--amber)] group-hover:bg-white/20 transition-all touch-none"
                                            />
                                            {/* Stylized Slider Track Overlay */}
                                            <div
                                                className="absolute top-1/2 -translate-y-1/2 left-1 h-1.5 bg-gradient-to-r from-[var(--mahogany)] to-[var(--amber)] rounded-full pointer-events-none"
                                                style={{ width: `calc(${taste[slider.name]}% - 8px)` }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    dispatch(setStep('ingredients'));
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="w-full mt-10 md:mt-12 bg-gradient-to-r from-[var(--amber)] to-[var(--gold)] text-[var(--charcoal)] py-5 rounded-2xl font-black uppercase tracking-[0.3em] shadow-2xl shadow-[var(--amber)]/20 hover:shadow-[0_0_30px_var(--amber)] transition-all duration-500 active:scale-95"
                            >
                                Lock in Profile
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Right Side: Visual Projection */}
                    <div className="xl:col-span-12 2xl:col-span-7 h-full w-full max-w-2xl mx-auto xl:max-w-none">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="dark-glass p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden h-full flex flex-col justify-center min-h-[400px] md:min-h-[500px]"
                        >
                            {/* Technical Overlay */}
                            <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden sm:block">
                                <div className="absolute top-8 left-8 border-l border-t border-white/20 w-8 h-8" />
                                <div className="absolute top-8 right-8 border-r border-t border-white/20 w-8 h-8" />
                                <div className="absolute bottom-8 left-8 border-l border-b border-white/20 w-8 h-8" />
                                <div className="absolute bottom-8 right-8 border-r border-b border-white/20 w-8 h-8" />
                            </div>

                            <div className="relative z-10 text-center space-y-6">
                                <div className="flex flex-col items-center">
                                    <h4 className="text-[var(--gold)] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] opacity-40 mb-4 italic">Spectral Analysis</h4>
                                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[var(--amber)] to-transparent" />
                                </div>

                                <div className="h-[300px] sm:h-[400px] md:h-[450px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                                            <PolarGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="5 5" />
                                            <PolarAngleAxis
                                                dataKey="subject"
                                                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em' }}
                                            />
                                            <PolarRadiusAxis
                                                angle={30}
                                                domain={[0, 100]}
                                                tick={false}
                                                axisLine={false}
                                            />
                                            <Radar
                                                name="Profile"
                                                dataKey="A"
                                                stroke="var(--amber)"
                                                strokeWidth={4}
                                                fill="url(#radarGradient)"
                                                fillOpacity={0.6}
                                            />
                                            <defs>
                                                <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                                                    <stop offset="0%" stopColor="var(--mahogany)" />
                                                    <stop offset="100%" stopColor="var(--amber)" />
                                                </linearGradient>
                                            </defs>
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="flex justify-center gap-12">
                                    <div className="text-center">
                                        <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-1">Stability</div>
                                        <div className="text-[var(--gold)] font-mono font-black text-lg">98.4%</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-1">Complexity</div>
                                        <div className="text-[var(--gold)] font-mono font-black text-lg">HIGH</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Sparkles = ({ size, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m12 3-1.912 5.813a2.01 2.01 0 0 1-1.275 1.275L3 12l5.813 1.912a2.01 2.01 0 0 1 1.275 1.275L12 21l1.912-5.813a2.01 2.01 0 0 1 1.275-1.275L21 12l-5.813-1.912a2.01 2.01 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
    </svg>
);

export default TastePreference;
