import { configureStore } from '@reduxjs/toolkit';
import ingredientSlice from './ingredientSlice';


export const store = configureStore({
  reducer: {
    ingredients: ingredientSlice
  }
 });