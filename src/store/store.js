import { configureStore } from '@reduxjs/toolkit';
import cocktailReducer from '../features/cocktail/cocktailSlice';

export const store = configureStore({
    reducer: {
        cocktail: cocktailReducer,
    },
});
