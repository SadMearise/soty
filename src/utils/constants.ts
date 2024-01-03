import { ClientData } from "../models";

export const PROJECT_NAME = "Soty";

export const CLIENT_DATA: ClientData = {
  clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET || "",
  clientId: import.meta.env.VITE_CTP_CLIENT_ID || "",
};

export const USER_ENDPOINT = "https://api.spotify.com/v1/me";
export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
export const RESPONSE_TYPE = "token";
export const URI = "http://localhost:3000/";
export const TOKEN_NAME_FROM_PARAMS = "access_token";
export const LOCAL_STORAGE_KEYS = {
  token: "token",
  authInProgress: "authInProgress",
};

export const LINKS = {
  home: { route: "/", title: `${PROJECT_NAME} - Web Player` },
  error: { route: "*", title: "Страница не найдена" },
  login: { route: "/login", title: `Войти - ${PROJECT_NAME}` },
  search: { route: "/search", title: `${PROJECT_NAME} - Поиск` },
  profile: { route: "/profile", title: "Профиль" },
};

export enum TooltipPosition {
  Top = "top",
  Bottom = "bottom",
  Left = "left",
  Right = "right",
}

export enum HTTPMethods {
  Get = "GET",
}
