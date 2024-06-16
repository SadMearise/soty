import { RootState } from "../../store";

export const selectIsAuthenticated = (state: RootState) => state.oAuth.isAuthenticated;

export const selectIsAuthProgress = (state: RootState) => state.oAuth.isAuthProgress;
