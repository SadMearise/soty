import { Token } from "../models";
import { CLIENT_DATA, ENDPOINTS, LOCAL_STORAGE_KEYS, URI } from "../utils/constants";
import { getCodeVerifier, getLocalStorage } from "../utils/helpers";
import { fetchData } from ".";
import { HTTPMethod } from "../types/enums";

export const postToken = async (code: string): Promise<Token> => {
  const { clientId } = CLIENT_DATA;
  const codeVerifier = getCodeVerifier();

  const token: Token = (await fetchData({
    url: ENDPOINTS.token,
    method: HTTPMethod.Post,
    headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded" }),
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: URI,
      code_verifier: codeVerifier,
    }),
  }))!;

  return token;
};

export const fetchRefreshToken = async (): Promise<Token> => {
  const refreshTokenFromLocalStorage = getLocalStorage(LOCAL_STORAGE_KEYS.refreshToken)!;

  const refreshToken: Token = (await fetchData({
    url: ENDPOINTS.token,
    method: HTTPMethod.Post,
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${CLIENT_DATA.clientId}:${CLIENT_DATA.clientSecret}`)}`,
    }),
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshTokenFromLocalStorage,
    }),
  }))!;

  return refreshToken;
};
