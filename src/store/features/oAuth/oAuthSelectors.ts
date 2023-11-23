import { RootState } from "../../store";

export const selectIsAuthenticated = (state: RootState) => {
  return state.oAuth.isAuthenticated;
};

export const selectIsAuthInProgress = (state: RootState) => {
  return state.oAuth.isAuthInProgress;
};
