import { LOCAL_STORAGE_KEYS } from "../constants";
import { setCodeVerifier, getLocalStorage } from ".";

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: ArrayBuffer) => {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(input)));

  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};

export const getCodeChallenge = async () => {
  setCodeVerifier();
  const codeVerifier = getLocalStorage(LOCAL_STORAGE_KEYS.codeVerifier)!;

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  return codeChallenge;
};
