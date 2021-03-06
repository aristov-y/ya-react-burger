import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  updateUserInfo,
  userInfoRequest
} from '../utils/auth';
import { TSimpleUserInfo } from '../types';

export type UserInfo = {
  name: string;
  email: string;
}

type AuthState = {
  user: UserInfo;
  error?: boolean;
}

type LoginRequest = {
  email: string;
  password: string;
}

type RegisterRequest = LoginRequest & {
  name: string;
}

const loginAction = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginRequest) => {
    return loginRequest(email, password)
  }
);

const logoutAction = createAsyncThunk(
  'auth/logout',
  async () => logoutRequest()
)

const registerAction = createAsyncThunk(
  'auth/register',
  async ({ email, name, password }: RegisterRequest) => {
    return registerRequest(email, name, password);
  }
)

const getUserAction = createAsyncThunk(
  'auth/getUser',
  async () => userInfoRequest()
)

const updateUserAction = createAsyncThunk(
  'auth/updateUser',
  async (user: TSimpleUserInfo) => updateUserInfo(user)
)

const initialState: AuthState = {
  user: {
    name: '',
    email: ''
  },
  error: false
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state: Draft<AuthState>, action: PayloadAction<TSimpleUserInfo>) {
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.error = false;
        state.user.email = '';
        state.user.name = '';
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      })
      .addCase(loginAction.rejected, (state) => {
        state.error = true
      })
      .addCase(registerAction.pending, state => {
        state.error = false;
        state.user.email = '';
        state.user.name = '';
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      })
      .addCase(registerAction.rejected, (state) => {
        state.error = true;
      })
      .addCase(logoutAction.pending, (state) => {
        state.error = false;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.user.name = ''
        state.user.email = ''
      })
      .addCase(getUserAction.pending, (state) => {
        state.user.name = ''
        state.user.email = ''
        state.error = false;
      })
      .addCase(getUserAction.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
      })
      .addCase(getUserAction.rejected, (state) => {
        state.error = true;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
      })
  }
})

const {
  setUser
} = auth.actions

export {
  auth,
  setUser,
  registerAction,
  loginAction,
  logoutAction,
  getUserAction,
  updateUserAction
}
