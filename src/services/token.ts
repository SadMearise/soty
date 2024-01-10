import { Token } from "../models";
import { CLIENT_DATA, ENDPOINTS, HTTPMethod, LOCAL_STORAGE_KEYS, REDIRECT_URI } from "../utils/constants";
import { getCodeVerifier } from "../utils/helpers/codeVerifier";

export const fetchToken = async (code: string): Promise<Token | undefined> => {
  try {
    const { clientId } = CLIENT_DATA;
    const codeVerifier = getCodeVerifier();

    const response = await fetch(ENDPOINTS.token, {
      method: HTTPMethod.Post,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
    });

    if (!response.ok) {
      throw new Error(`code ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("An error occured during token data retrieval.", (error as Error).message);

    return undefined;
  }
};

export const fetchRefreshToken = async (): Promise<Token | undefined> => {
  try {
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.refreshToken)!;
    const { clientId } = CLIENT_DATA;

    const response = await fetch(ENDPOINTS.token, {
      method: HTTPMethod.Post,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
      }),
    });

    if (!response.ok) {
      throw new Error(`code ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("An error occured when updating token data.", (error as Error).message);

    return undefined;
  }
};
