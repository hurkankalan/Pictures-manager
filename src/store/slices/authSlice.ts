import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "../../api/user.api";
import { User, InitialUserState } from "../../types/User";

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password }: User, { rejectWithValue }) => {
    try {
      const response = await registerUser(email, password);

      return response.data;
    } catch (error: any) {
      // return rejectWithValue(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: InitialUserState = {
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  success: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = payload;
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
  },
});

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
