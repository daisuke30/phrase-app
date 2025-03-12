import { configureStore } from '@reduxjs/toolkit';
import phrasesReducer from './slices/phrasesSlice';
import progressReducer from './slices/progressSlice';

export const store = configureStore({
  reducer: {
    phrases: phrasesReducer,
    progress: progressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
