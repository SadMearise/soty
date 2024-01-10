import { RootState } from "../../store";

export const selectIsAuthenticated = (state: RootState) => {
  return state.oAuth.isAuthenticated;
};

export const selectIsAuthProgress = (state: RootState) => {
  return state.oAuth.isAuthProgress;
};
