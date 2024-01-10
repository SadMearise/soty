import { LOCAL_STORAGE_KEYS } from "../constants";
import { setCodeVerifier } from "./codeVerifier";
import { getLocalStorage } from "./localStorage";

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const getCodeChallenge = async () => {
  setCodeVerifier();
  const codeVerifier = getLocalStorage(LOCAL_STORAGE_KEYS.codeVerifier)!;

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  return codeChallenge;
};

export default getCodeChallenge;
