// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/redux/reducer';

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};
