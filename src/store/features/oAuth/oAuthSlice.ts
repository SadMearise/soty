import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../../../utils/helpers/localStorage";
import {
  ENDPOINTS,
  CLIENT_DATA,
  CODE_CHALLENGE_METHOD,
  LINKS,
  LOCAL_STORAGE_KEYS,
  REDIRECT_URI,
  RESPONSE_TYPE,
} from "../../../utils/constants";
import { fetchToken } from "../../../services/token";
import extractSearchParam from "../../../utils/helpers/searchParam";
import getCodeChallenge from "../../../utils/helpers/codeChallenge";

interface OAuthState {
  isAuthenticated: boolean;
  isAuthProgress: boolean;
}

const initialState: OAuthState = {
  isAuthenticated: Boolean(getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)),
  isAuthProgress: Boolean(getLocalStorage(LOCAL_STORAGE_KEYS.authProgress)),
};

export const getToken = createAsyncThunk("oAuth/getToken", async () => {
  const code = extractSearchParam("code");

  if (code) {
    const response = await fetchToken(code);

    return response;
  }

  return null;
});

export const login = createAsyncThunk("oAuth/login", async () => {
  const { clientId, scope } = CLIENT_DATA;
  const codeChallenge = await getCodeChallenge();

  const authUrl = new URL(ENDPOINTS.auth);

  const params = {
    response_type: RESPONSE_TYPE,
    client_id: clientId,
    scope,
    code_challenge_method: CODE_CHALLENGE_METHOD,
    code_challenge: codeChallenge,
    redirect_uri: REDIRECT_URI,
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

      state.isAuthenticated = false;
      state.isAuthProgress = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getToken.fulfilled, (state, action) => {
      if (!action.payload) return;

      setLocalStorage(LOCAL_STORAGE_KEYS.accessToken, action.payload.access_token);
      setLocalStorage(LOCAL_STORAGE_KEYS.refreshToken, action.payload.refresh_token);
      removeLocalStorage(LOCAL_STORAGE_KEYS.authProgress);
      removeLocalStorage(LOCAL_STORAGE_KEYS.codeVerifier);

      window.history.replaceState({ idx: 0 }, "", LINKS.home.route);

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
