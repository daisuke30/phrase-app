import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the phrase type
interface Phrase {
  id: string;
  english: string;
  russian: string;
  pronunciation: string;
  meaning: string;
  example: string;
  category: string;
  difficulty: number;
  audioPath?: string;
}

interface PhrasesState {
  phrases: Phrase[];
  loading: boolean;
  error: string | null;
}

// Initial state with sample phrases
const initialState: PhrasesState = {
  phrases: [
    {
      id: '1',
      english: 'Hello, how are you?',
      russian: 'Привет, как дела?',
      pronunciation: 'Privet, kak dela?',
      meaning: 'Greeting and asking how someone is doing',
      example: 'A: Привет, как дела? B: Хорошо, спасибо!',
      category: 'greetings',
      difficulty: 1,
    },
    {
      id: '2',
      english: 'My name is...',
      russian: 'Меня зовут...',
      pronunciation: 'Menya zovut...',
      meaning: 'Introducing yourself by name',
      example: 'Меня зовут Иван. А как вас зовут?',
      category: 'introduction',
      difficulty: 1,
    },
    {
      id: '3',
      english: 'I don\'t understand',
      russian: 'Я не понимаю',
      pronunciation: 'Ya ne ponimayu',
      meaning: 'Expressing that you don\'t understand something',
      example: 'Извините, я не понимаю. Вы можете говорить медленнее?',
      category: 'communication',
      difficulty: 1,
    },
  ],
  loading: false,
  error: null,
};

const phrasesSlice = createSlice({
  name: 'phrases',
  initialState,
  reducers: {
    setPhrases: (state, action: PayloadAction<Phrase[]>) => {
      state.phrases = action.payload;
    },
    addPhrase: (state, action: PayloadAction<Phrase>) => {
      state.phrases.push(action.payload);
    },
  },
});

export const { setPhrases, addPhrase } = phrasesSlice.actions;
export default phrasesSlice.reducer;
