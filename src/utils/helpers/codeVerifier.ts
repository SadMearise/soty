import { LOCAL_STORAGE_KEYS } from "../constants";
import { getLocalStorage, setLocalStorage } from ".";

const generateRandomString = (length: number) => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));

  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

export const getCodeVerifier = () => {
  const codeVerifier = getLocalStorage(LOCAL_STORAGE_KEYS.codeVerifier) || generateRandomString(64);

  return codeVerifier;
};

export const setCodeVerifier = () => {
  const codeVerifier = generateRandomString(64);

  if (!getLocalStorage(LOCAL_STORAGE_KEYS.codeVerifier)) {
    setLocalStorage(LOCAL_STORAGE_KEYS.codeVerifier, codeVerifier);
  }
};
