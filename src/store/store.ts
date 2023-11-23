import { configureStore } from "@reduxjs/toolkit";
import oAuthSlice from "./features/oAuth/oAuthSlice";

export const store = configureStore({
  reducer: {
    oAuth: oAuthSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
