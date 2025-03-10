import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user';

interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    setUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserSettings: (state, action: PayloadAction<Partial<User['settings']>>) => {
      if (state.currentUser) {
        state.currentUser.settings = {
          ...state.currentUser.settings,
          ...action.payload,
        };
      }
    },
    clearUser: state => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUserLoading, setUser, setUserError, updateUserSettings, clearUser } =
  userSlice.actions;

export default userSlice.reducer;
