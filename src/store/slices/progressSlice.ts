import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProgress, PhraseProgress } from '../../models/progress';

interface ProgressState {
  userProgress: UserProgress | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  userProgress: null,
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgressLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserProgress: (state, action: PayloadAction<UserProgress>) => {
      state.userProgress = action.payload;
      state.loading = false;
      state.error = null;
    },
    setProgressError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updatePhraseProgress: (
      state,
      action: PayloadAction<{ phraseId: string; progress: PhraseProgress }>
    ) => {
      const { phraseId, progress } = action.payload;
      if (state.userProgress) {
        state.userProgress.phraseProgress = {
          ...state.userProgress.phraseProgress,
          [phraseId]: progress,
        };
      }
    },
    updateStats: (state, action: PayloadAction<Partial<UserProgress['stats']>>) => {
      if (state.userProgress) {
        state.userProgress.stats = {
          ...state.userProgress.stats,
          ...action.payload,
        };
      }
    },
    clearProgress: state => {
      state.userProgress = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setProgressLoading,
  setUserProgress,
  setProgressError,
  updatePhraseProgress,
  updateStats,
  clearProgress,
} = progressSlice.actions;

export default progressSlice.reducer;
