import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
  getSearchParamFromCurrentUrl,
  getCodeChallenge,
  getTokenExpirationDate,
} from "../../../utils/helpers";
import { ENDPOINTS, CLIENT_DATA, LOCAL_STORAGE_KEYS } from "../../../utils/constants";
import { postToken } from "../../../services";
import { OAuthState } from "./types";

const initialState: OAuthState = {
  isAuthenticated: Boolean(getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)),
  isAuthProgress: Boolean(getLocalStorage(LOCAL_STORAGE_KEYS.authProgress)),
};

export const getToken = createAsyncThunk("oAuth/getToken", async () => {
  const code = getSearchParamFromCurrentUrl("code");

  if (!code) return null;

  const data = await postToken(code);

  return data;
});

export const login = createAsyncThunk("oAuth/login", async () => {
  const { clientId, scope, serverUrl } = CLIENT_DATA;
  const codeChallenge = await getCodeChallenge();

  const authUrl = new URL(ENDPOINTS.auth);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: serverUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
});

const oAuthSlice = createSlice({
  name: "oAuth",
  initialState,
  reducers: {
    logout: (state) => {
      removeLocalStorage(LOCAL_STORAGE_KEYS.accessToken);
      removeLocalStorage(LOCAL_STORAGE_KEYS.refreshToken);
      removeLocalStorage(LOCAL_STORAGE_KEYS.expirationDate);

      state.isAuthenticated = false;
      state.isAuthProgress = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getToken.fulfilled, (state, action) => {
      if (!action.payload) {
        removeLocalStorage(LOCAL_STORAGE_KEYS.authProgress);
        removeLocalStorage(LOCAL_STORAGE_KEYS.codeVerifier);
        state.isAuthProgress = false;

        return;
      }

      setLocalStorage(LOCAL_STORAGE_KEYS.accessToken, action.payload.access_token);
      setLocalStorage(LOCAL_STORAGE_KEYS.refreshToken, action.payload.refresh_token);
      setLocalStorage(LOCAL_STORAGE_KEYS.expirationDate, getTokenExpirationDate(action.payload.expires_in));
      removeLocalStorage(LOCAL_STORAGE_KEYS.authProgress);
      removeLocalStorage(LOCAL_STORAGE_KEYS.codeVerifier);

      const newUrl = new URL(CLIENT_DATA.baseUrl, window.location.origin);
      window.history.replaceState({ idx: 0 }, "", newUrl);

      state.isAuthenticated = true;
      state.isAuthProgress = false;
    });
    builder.addCase(login.fulfilled, (state) => {
      setLocalStorage(LOCAL_STORAGE_KEYS.authProgress, "true");
      state.isAuthProgress = true;
    });
  },
});

export const { logout } = oAuthSlice.actions;

export default oAuthSlice;
