import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {register, login, getMe} from "../../api/user.api";
import {LoginUser, InitialUserState} from "../../types/User";
import {updateAxiosInstanceWithToken} from '../../api/index.api';

function getError(caught: any) {
  return caught?.response?.data?.reason || caught?.response?.data?.errors?.join('\n') || 'Unknown';
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({email, password}: LoginUser, {rejectWithValue}) => {
    try {
      const response = await register(email, password);
      return response.data;
    } catch (caught: any) {
      const error = getError(caught);
      console.error(error);
      alert(error);
      return rejectWithValue(error);
    }
  }
);

export const getMeUser = createAsyncThunk(
  'auth/getMe',
  async (_, {rejectWithValue}) => {
    try {
      const response = await getMe();
      return response.data;
    } catch (caught: any) {
      const error = getError(caught);
      console.error(error);
      alert(error);
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({email, password}: LoginUser, {rejectWithValue}) => {
    try {
      const response = await login(email, password);
      updateAxiosInstanceWithToken(response.token);
      return response;
    } catch (caught: any) {
      const error = getError(caught);
      console.error(error);
      alert(error);
      return rejectWithValue(error);
    }
  }
);

const initialState: InitialUserState = {
  user: null,
  userId: null,
  token: null,
  loading: false,
  success: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logOut: (state) => {
      state.user = null;
      state.userId = null;
      state.token = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload as string | null;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.success = true;
      state.token = payload.token;
    });
    builder.addCase(loginUser.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload as string | null;
    });
    builder.addCase(getMeUser.fulfilled, (state, {payload}) => {
      state.success = true;
      state.loading = false;
      state.userId = payload.id;
    });
  },
});

export const {logIn, logOut} = authSlice.actions;
export default authSlice.reducer;
