import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for the progress tracking
interface PhraseProgress {
  level: number;
  nextReviewDate: string | null;
  lastReviewDate: string | null;
}

interface ProgressState {
  phraseProgress: Record<string, PhraseProgress>;
}

// Initial state
const initialState: ProgressState = {
  phraseProgress: {},
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    updatePhraseProgress: (
      state,
      action: PayloadAction<{ phraseId: string; progress: PhraseProgress }>
    ) => {
      const { phraseId, progress } = action.payload;
      state.phraseProgress[phraseId] = progress;
    },
    resetProgress: (state) => {
      state.phraseProgress = {};
    },
  },
});

export const { updatePhraseProgress, resetProgress } = progressSlice.actions;
export default progressSlice.reducer;
