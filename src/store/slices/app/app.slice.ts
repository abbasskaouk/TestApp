import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {users} from '@/constants/mockData';
import {TUser} from '@/common/common.types';
import {TAppState, TSignInPayload} from './app.types';

const initialState: TAppState = {
  id: '',
  name: '',
  email: '',
  token: '',
  isLoading: false,
};

const signIn = createAsyncThunk(
  'app/SignIn',
  async ({email, password}: TSignInPayload, {rejectWithValue}) => {
    const user = users.find(
      (userToCheck: TUser) =>
        userToCheck.email === email && userToCheck.password === password,
    );

    if (!user) {
      return rejectWithValue({success: false});
    }
    return {success: true, user};
  },
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    reset: () => initialState,
    setIsLoading: (state, {payload}: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(signIn.fulfilled, (state, {payload}) => {
      state.id = payload.user.id;
      state.name = payload.user.name;
      state.email = payload.user.email;
      state.token = `token123`;
    });
  },
});

export const appReducer = appSlice.reducer;
export const appActions = {
  ...appSlice.actions,
  signIn,
};
