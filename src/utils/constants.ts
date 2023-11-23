import { ClientData } from "../models";

export const CLIENT_DATA: ClientData = {
  clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET || "",
  clientId: import.meta.env.VITE_CTP_CLIENT_ID || "",
};

export const RESPONSE_TYPE = "token";
export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
export const URI = "http://localhost:3000/";
export const TOKEN_NAME_FROM_PARAMS = "access_token";
export const LOCAL_STORAGE_KEYS = {
  token: "token",
};

export const LINKS = {
  home: { path: "/", title: "Soty - Web Player" },
  error: { path: "*", title: "Страница не найдена" },
  login: { path: "/login", title: "Войти - Soty" },
};
