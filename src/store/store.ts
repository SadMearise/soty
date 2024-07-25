import { configureStore } from "@reduxjs/toolkit";
import oAuthSlice from "./features/oAuth/oAuthSlice";
import audioplayerSlice from "./features/audioplayer/audioplayerSlice";
import alertSlice from "./features/alert/alertSlice";
import favoriteItemsSlice from "./features/favoriteItems/favoriteItemsSlice";

export const store = configureStore({
  reducer: {
    oAuth: oAuthSlice.reducer,
    audioplayer: audioplayerSlice.reducer,
    alert: alertSlice.reducer,
    favoriteItems: favoriteItemsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
