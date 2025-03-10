import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Phrase } from '../../models/phrase';

interface PhrasesState {
  phrases: Phrase[];
  loading: boolean;
  error: string | null;
  currentLanguage: string;
}

const initialState: PhrasesState = {
  phrases: [],
  loading: false,
  error: null,
  currentLanguage: 'russian', // default language
};

const phrasesSlice = createSlice({
  name: 'phrases',
  initialState,
  reducers: {
    setPhrasesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPhrases: (state, action: PayloadAction<Phrase[]>) => {
      state.phrases = action.payload;
      state.loading = false;
      state.error = null;
    },
    setPhrasesError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setCurrentLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
    },
    addPhrase: (state, action: PayloadAction<Phrase>) => {
      state.phrases.push(action.payload);
    },
    updatePhrase: (state, action: PayloadAction<Phrase>) => {
      const index = state.phrases.findIndex(phrase => phrase.id === action.payload.id);
      if (index !== -1) {
        state.phrases[index] = action.payload;
      }
    },
    removePhrase: (state, action: PayloadAction<string>) => {
      state.phrases = state.phrases.filter(phrase => phrase.id !== action.payload);
    },
  },
});

export const {
  setPhrasesLoading,
  setPhrases,
  setPhrasesError,
  setCurrentLanguage,
  addPhrase,
  updatePhrase,
  removePhrase,
} = phrasesSlice.actions;

export default phrasesSlice.reducer;
