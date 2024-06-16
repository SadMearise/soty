import { fetchRefreshToken } from "../../services";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { getLocalStorage, setLocalStorage } from ".";

export const getTokenExpirationDate = (expiresIn: number) => `${Date.now() + expiresIn * 1000}`;

const updateToken = async () => {
  const data = await fetchRefreshToken();

  setLocalStorage(LOCAL_STORAGE_KEYS.accessToken, data.access_token);
  setLocalStorage(LOCAL_STORAGE_KEYS.refreshToken, data.refresh_token);

  setLocalStorage(LOCAL_STORAGE_KEYS.expirationDate, getTokenExpirationDate(data.expires_in));
};

export const checkExpiryToken = async () => {
  const tokenExpiry = +getLocalStorage(LOCAL_STORAGE_KEYS.expirationDate)!;

  if (!tokenExpiry || Date.now() >= tokenExpiry) {
    await updateToken();
  }
};
