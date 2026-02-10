import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCocktail } from '../features/cocktail/cocktailSlice';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { RefreshCw, Star, Share2, Award, BookOpen, Clock, Thermometer } from 'lucide-react';

const CocktailResult = () => {
    const { mood, taste, ingredients } = useSelector((state) => state.cocktail);
    const dispatch = useDispatch();
    const [cocktailName, setCocktailName] = useState('');
    const [rating, setRating] = useState('0.0');

    useEffect(() => {
        const prefixes = ['The', 'Golden', 'Crimson', 'Emerald', 'Silk', 'Midnight', 'Velvet', 'Crystal', 'Obsidian', 'Aura'];
        const suffixes = ['Harmony', 'Alchemy', 'Essence', 'Void', 'Ember', 'Mist', 'Bloom', 'Zenith', 'Sanctum', 'Flow'];
        const randomName = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${mood?.label || 'Master'} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
        setCocktailName(randomName);
        setRating((4.5 + Math.random() * 0.5).toFixed(1));
    }, [mood]);

    const chartData = [
        { subject: 'Sweet', A: taste.sweet },
        { subject: 'Sour', A: taste.sour },
        { subject: 'Bitter', A: taste.bitter },
        { subject: 'Strong', A: taste.strong },
        { subject: 'Fruity', A: taste.fruity },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-[var(--charcoal)] relative overflow-hidden">
            {/* Background Texture & Ambient Lights */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-paper.png")' }} />
            <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-[var(--amber)]/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-[var(--mahogany)]/5 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="text-center mb-8 md:mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-[var(--gold)]/20 text-[var(--gold)] text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
                    >
                        Creation Finalized 05
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="display-font text-3xl sm:text-5xl md:text-8xl font-bold text-white italic px-4 uppercase tracking-tighter md:tracking-normal"
                    >
                        Behold your <span className="text-gradient">Masterpiece</span>
                    </motion.h2>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-16">

                    {/* Left Side: The Reveal */}
                    <div className="xl:col-span-12 2xl:col-span-5 space-y-6 md:space-y-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group"
                        >
                            <div className="relative rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] border-[6px] md:border-[12px] border-white/5 bg-white/5 p-2 md:p-4 backdrop-blur-xl transition-all duration-700 hover:shadow-[0_40px_120px_var(--amber)]/10">
                                <img
                                    src="/resources/final-cocktail.png"
                                    alt="Result"
                                    className="w-full h-[300px] md:h-[600px] object-cover rounded-[1.5rem] md:rounded-[3rem] transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-transparent to-transparent opacity-80" />

                                <div className="absolute bottom-4 left-4 right-4 md:bottom-12 md:left-12 md:right-12 space-y-3 md:space-y-6">
                                    <div className="space-y-1 md:space-y-2">
                                        <h1 className="display-font text-2xl sm:text-5xl md:text-7xl font-black text-white leading-tight uppercase">{cocktailName}</h1>
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className="flex items-center gap-1.5 bg-[var(--amber)] text-[var(--charcoal)] px-3 py-1 md:px-4 md:py-1.5 rounded-full font-black text-[10px] md:text-sm shadow-xl">
                                                <Star className="fill-[var(--charcoal)] w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={3} />
                                                <span>{rating}</span>
                                            </div>
                                            <span className="text-[var(--gold)]/40 text-[7px] md:text-[10px] uppercase font-black tracking-[0.2em] md:tracking-[0.4em]">Signature Mix</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Analysis Grid */}
                        <div className="grid grid-cols-2 gap-3 md:gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="dark-glass p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col items-center justify-center space-y-2 md:space-y-4 text-center"
                            >
                                <Award className="text-[var(--amber)] mb-1 w-6 h-6 md:w-8 md:h-8" />
                                <div>
                                    <div className="text-[var(--gold)]/30 text-[7px] md:text-[9px] font-bold uppercase tracking-[0.3em] mb-1">Status</div>
                                    <div className="text-white font-black text-xs md:text-lg tracking-widest italic uppercase">Flawless</div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="dark-glass p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col items-center justify-center space-y-2 md:space-y-4 text-center"
                            >
                                <Clock className="text-[var(--amber)] mb-1 w-6 h-6 md:w-8 md:h-8" />
                                <div>
                                    <div className="text-[var(--gold)]/30 text-[7px] md:text-[9px] font-bold uppercase tracking-[0.3em] mb-1">Prep Time</div>
                                    <div className="text-white font-black text-xs md:text-lg tracking-widest italic uppercase">3:45 MIN</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side: The Data Blueprint */}
                    <div className="xl:col-span-12 2xl:col-span-7 space-y-6 md:space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="dark-glass p-5 md:p-12 rounded-[2rem] md:rounded-[4rem] space-y-10 md:space-y-16"
                        >
                            {/* Flavor Equilibrium Chart */}
                            <section className="space-y-4 md:space-y-8">
                                <div className="flex justify-between items-end">
                                    <h3 className="text-[var(--gold)] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] mb-2 flex items-center gap-2 italic">
                                        <Thermometer className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                        Spectral Equilibrium
                                    </h3>
                                </div>
                                <div className="h-[250px] sm:h-[350px] w-full bg-white/5 rounded-[1.5rem] md:rounded-[3rem] p-2 md:p-8 border border-white/5">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                            <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 8, fontWeight: 700 }} />
                                            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                                            <Radar
                                                name="Harmony"
                                                dataKey="A"
                                                stroke="var(--amber)"
                                                strokeWidth={3}
                                                fill="var(--amber)"
                                                fillOpacity={0.4}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </section>

                            {/* Ingredient Breakdown */}
                            <section className="space-y-6 md:space-y-8">
                                <h3 className="text-[var(--gold)] text-xs font-bold uppercase tracking-[0.4em] mb-6 flex items-center gap-3 italic">
                                    <BookOpen size={16} />
                                    The Ingredients
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                    {ingredients.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 + i * 0.1 }}
                                            className="flex items-center gap-4 md:gap-5 p-3 md:p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-[var(--gold)]/20 transition-all group"
                                        >
                                            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl p-2 shadow-xl group-hover:scale-110 transition-transform">
                                                <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white tracking-wide text-sm md:text-base">{item.name}</h4>
                                                <p className="text-[8px] md:text-[9px] text-[var(--amber)] font-black uppercase tracking-widest">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                            {/* Interactive Actions */}
                            <footer className="pt-4 md:pt-8 flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => dispatch(resetCocktail())}
                                    className="flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-white text-[var(--charcoal)] px-8 py-4 md:px-10 md:py-5 rounded-full text-xs md:text-sm font-black uppercase tracking-[0.3em] hover:bg-[var(--gold)] transition-all shadow-[0_10px_40px_rgba(255,255,255,0.1)] active:scale-95"
                                >
                                    <RefreshCw size={18} strokeWidth={3} />
                                    New Synthesis
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-4 md:p-5 rounded-full bg-[var(--charcoal)] text-white border-2 border-white/10 hover:border-[var(--amber)] hover:text-[var(--amber)] transition-all flex items-center justify-center shrink-0 shadow-xl"
                                    onClick={() => alert('Recipe stored in Local Archives.')}
                                >
                                    <Share2 size={24} />
                                </motion.button>
                            </footer>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CocktailResult;
