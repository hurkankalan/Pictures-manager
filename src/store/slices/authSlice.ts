import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register, login } from "../../api/user.api";
import { LoginUser, InitialUserState } from "../../types/User";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }: LoginUser, { rejectWithValue }) => {
    try {
      const response = await register(email, password);

      return response.data;
    } catch (error: any) {
      // return rejectWithValue(error.message);
      alert(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginUser, { rejectWithValue }) => {
    try {
      return await login(email, password);
    } catch (error: any) {
      // return rejectWithValue(error.message);
      alert(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: InitialUserState = {
  user: null,
  token: "faketoken",
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
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string | null;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.token = payload.token;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string | null;
    });
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
