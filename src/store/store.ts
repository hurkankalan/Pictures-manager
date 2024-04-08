import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import albumSlice from "./slices/albumSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    album: albumSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
