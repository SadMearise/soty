import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../../../utils/helpers/localStorage";
import { LINKS, LOCAL_STORAGE_KEYS } from "../../../utils/constants";
import extractTokenFromHash from "../../../utils/helpers/extractTokenFromHash";
import getLoginHref from "../../../utils/helpers/getLoginHref";

interface OAuthState {
  isAuthenticated: boolean;
  isAuthInProgress: boolean;
}

const initialState: OAuthState = {
  isAuthenticated: Boolean(getLocalStorage(LOCAL_STORAGE_KEYS.token)),
  isAuthInProgress: Boolean(getLocalStorage(LOCAL_STORAGE_KEYS.authInProgress)),
};

const oAuthSlice = createSlice({
  name: "oAuth",
  initialState,
  reducers: {
    login: (state) => {
      const loginLink = getLoginHref();

      window.location.href = loginLink;

      setLocalStorage(LOCAL_STORAGE_KEYS.authInProgress, "true");
      state.isAuthInProgress = true;
    },
    logout: (state) => {
      removeLocalStorage(LOCAL_STORAGE_KEYS.token);
      removeLocalStorage(LOCAL_STORAGE_KEYS.authInProgress);

      state.isAuthenticated = false;
      state.isAuthInProgress = false;
    },
    checkToken: (state) => {
      const token = extractTokenFromHash(window.location.hash);

      if (token) {
        setLocalStorage(LOCAL_STORAGE_KEYS.token, token);
        removeLocalStorage(LOCAL_STORAGE_KEYS.authInProgress);

        window.history.replaceState({ idx: 0 }, "", LINKS.home.route);

        state.isAuthenticated = true;
        state.isAuthInProgress = false;
      }
    },
  },
});

export const { login, logout, checkToken } = oAuthSlice.actions;

export default oAuthSlice;
