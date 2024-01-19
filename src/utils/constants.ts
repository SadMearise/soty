import { ClientData } from "../models";

export const PROJECT_NAME = "Soty";

export const CLIENT_DATA: ClientData = {
  clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET || "",
  clientId: import.meta.env.VITE_CTP_CLIENT_ID || "",
  scope: import.meta.env.VITE_CTP_SCOPE || "",
};

export const ENDPOINTS = {
  auth: "https://accounts.spotify.com/authorize",
  user: "https://api.spotify.com/v1/me",
  token: "https://accounts.spotify.com/api/token",
  newReleases: "https://api.spotify.com/v1/browse/new-releases",
  featuredPlaylists: "https://api.spotify.com/v1/browse/featured-playlists",
};

export const RESPONSE_TYPE = "code";
export const CODE_CHALLENGE_METHOD = "S256";
export const REDIRECT_URI = "http://localhost:3000/";
export const TOKEN_NAME_FROM_PARAMS = "access_token";
export const LOCAL_STORAGE_KEYS = {
  authCode: "authCode",
  authProgress: "authProgress",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  codeVerifier: "codeVerifier",
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

export enum HTTPMethod {
  Get = "GET",
  Post = "POST",
}

export enum HTTPStatusCode {
  Unauthorized = 401,
}
