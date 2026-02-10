import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    step: 'mood',
    mood: null,
    taste: { sweet: 50, sour: 50, bitter: 50, strong: 50, fruity: 50 },
    ingredients: [],
    result: null,
};

export const cocktailSlice = createSlice({
    name: 'cocktail',
    initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload;
        },
        setMood: (state, action) => {
            state.mood = action.payload;
        },
        setTaste: (state, action) => {
            state.taste = { ...state.taste, ...action.payload };
        },
        addIngredient: (state, action) => {
            state.ingredients.push(action.payload);
        },
        removeIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(ig => ig.id !== action.payload);
        },
        setResult: (state, action) => {
            state.result = action.payload;
        },
        resetCocktail: () => initialState,
    },
});

export const { setStep, setMood, setTaste, addIngredient, removeIngredient, setResult, resetCocktail } = cocktailSlice.actions;

export default cocktailSlice.reducer;
