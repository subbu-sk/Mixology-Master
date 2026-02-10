import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, removeIngredient, setStep } from '../features/cocktail/cocktailSlice';
import { INGREDIENTS } from '../data';
import { Wine, Coffee, Droplet, Leaf, Plus, Minus, ArrowRight, Layers } from 'lucide-react';

const IngredientSelection = () => {
    const { ingredients } = useSelector((state) => state.cocktail);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('spirits');

    const handleIngredientClick = (ingredient) => {
        if (ingredients.find(ig => ig.id === ingredient.id)) {
            dispatch(removeIngredient(ingredient.id));
        } else {
            if (ingredients.length < 5) {
                dispatch(addIngredient(ingredient));
            }
        }
    };

    const categories = [
        { id: 'spirits', label: 'Spirits', icon: <Wine size={16} /> },
        { id: 'liqueurs', label: 'Liqueurs', icon: <Coffee size={16} /> },
        { id: 'mixers', label: 'Mixers', icon: <Droplet size={16} /> },
        { id: 'garnishes', label: 'Garnishes', icon: <Leaf size={16} /> },
        { id: 'bitters', label: 'Bitters', icon: <Layers size={16} /> }
    ];

    return (
        <div className="min-h-screen pt-32 pb-48 px-4 bg-[var(--charcoal)] relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <header className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-[var(--gold)]/20 text-[var(--gold)] text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
                    >
                        Ingredient Selection 03
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="display-font text-6xl md:text-7xl font-bold text-white italic"
                    >
                        Build the <span className="text-gradient">Foundation</span>
                    </motion.h2>
                </header>

                {/* Deluxe Category Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-20 bg-white/5 p-2 rounded-[3rem] backdrop-blur-md border border-white/10 max-w-4xl mx-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-full uppercase tracking-[0.2em] font-black text-[10px] transition-all duration-500 whitespace-nowrap ${activeTab === cat.id
                                ? 'bg-[var(--amber)] text-[var(--charcoal)] shadow-[0_10px_30px_rgba(212,165,116,0.4)] scale-105'
                                : 'text-gray-400 hover:text-white hover:bg-white/10 italic'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* High-Fidelity Gallery Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8"
                    >
                        {INGREDIENTS[activeTab].map((item, idx) => {
                            const isSelected = ingredients.find(ig => ig.id === item.id);
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ y: -12 }}
                                    onClick={() => handleIngredientClick(item)}
                                    className={`relative dark-glass p-0 rounded-[2.5rem] cursor-pointer group group overflow-hidden border-2 transition-all duration-500 ${isSelected
                                        ? 'border-[var(--amber)] ring-4 ring-[var(--amber)]/20'
                                        : 'border-transparent hover:border-[var(--gold)]/30'
                                        }`}
                                >
                                    {/* Image Container with Ambient Lighting */}
                                    <div className="relative h-64 w-full flex items-center justify-center p-8 bg-gradient-to-b from-white/5 to-transparent">
                                        <div className="absolute inset-x-0 bottom-4 h-4 bg-black/40 rounded-[100%] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className="max-w-full max-h-full object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Status Tag */}
                                        <div className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-[var(--amber)] text-[var(--charcoal)] rotate-0' : 'bg-white/10 text-white/40 rotate-45 group-hover:rotate-0'
                                            }`}>
                                            {isSelected ? <Minus size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                                        </div>
                                    </div>

                                    {/* Content Info */}
                                    <div className="p-8 space-y-2 text-center">
                                        <h3 className="display-font text-2xl font-bold text-white group-hover:text-[var(--gold)] transition-colors">{item.name}</h3>
                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">{item.desc}</p>
                                    </div>

                                    {/* Interaction Indicator */}
                                    <div className={`absolute inset-x-0 bottom-0 h-1 transition-all duration-500 ${isSelected ? 'bg-[var(--amber)] opacity-100' : 'bg-[var(--gold)] opacity-0'
                                        }`} />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Premium Docked Ingredient Tray */}
            <AnimatePresence>
                {ingredients.length > 0 && (
                    <motion.div
                        initial={{ y: 200 }}
                        animate={{ y: 0 }}
                        exit={{ y: 200 }}
                        className="fixed bottom-10 left-0 right-0 z-50 px-4"
                    >
                        <div className="max-w-4xl mx-auto dark-glass rounded-[3.5rem] p-6 border border-white/10 flex flex-col md:flex-row items-center gap-10 justify-between">
                            <div className="flex items-center gap-8 pl-6">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-[var(--gold)] text-[10px] font-bold uppercase tracking-[0.4em]">Current Reservoir</h4>
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    </div>
                                    <div className="flex -space-x-4">
                                        {ingredients.map((ig, i) => (
                                            <motion.div
                                                key={ig.id}
                                                layoutId={`tray-${ig.id}`}
                                                className="w-14 h-14 rounded-full border-2 border-[var(--charcoal)] bg-white p-1 shadow-xl relative group z-10"
                                            >
                                                <img src={ig.img} alt={ig.name} className="w-full h-full object-contain" />
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--charcoal)] text-white text-[10px] px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold uppercase tracking-widest border border-white/10">
                                                    {ig.name}
                                                </div>
                                            </motion.div>
                                        ))}
                                        {Array.from({ length: 5 - ingredients.length }).map((_, i) => (
                                            <div key={i} className="w-14 h-14 rounded-full border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center text-white/10 font-bold">
                                                {ingredients.length + i + 1}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-12 w-px bg-white/10" />
                                <div className="text-[var(--gold)] flex items-end gap-1">
                                    <span className="text-5xl font-black font-mono leading-none tracking-tighter">{ingredients.length}</span>
                                    <span className="text-sm opacity-30 font-bold mb-1">/5</span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    dispatch(setStep('mixing'));
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="group relative overflow-hidden bg-white text-[var(--charcoal)] px-12 py-5 rounded-full font-black uppercase tracking-[0.3em] flex items-center gap-4 hover:pr-16 transition-all duration-500 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                            >
                                <span className="relative z-10">Initiate Synthesis</span>
                                <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--amber)] to-[var(--gold)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default IngredientSelection;
