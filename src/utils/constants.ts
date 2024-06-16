export const PROJECT_NAME = "Soty";

type ClientData = {
  clientSecret: string;
  clientId: string;
  scope: string;
};

export const CLIENT_DATA: ClientData = {
  clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET || "",
  clientId: import.meta.env.VITE_CTP_CLIENT_ID || "",
  scope: import.meta.env.VITE_CTP_SCOPE || "",
};

export const ENDPOINTS = {
  auth: "https://accounts.spotify.com/authorize",
  me: "https://api.spotify.com/v1/me",
  token: "https://accounts.spotify.com/api/token",
  newReleases: "https://api.spotify.com/v1/browse/new-releases",
  featuredPlaylists: "https://api.spotify.com/v1/browse/featured-playlists",
  albums: "https://api.spotify.com/v1/albums",
  recommendations: "https://api.spotify.com/v1/recommendations",
  categories: "https://api.spotify.com/v1/browse/categories",
  artists: "https://api.spotify.com/v1/artists",
  tracks: "https://api.spotify.com/v1/tracks",
  playlists: "https://api.spotify.com/v1/playlists",
  users: "https://api.spotify.com/v1/users",
};

export const URI = "http://localhost:3000/";

export const LOCAL_STORAGE_KEYS = {
  authCode: "authCode",
  authProgress: "authProgress",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  codeVerifier: "codeVerifier",
  expirationDate: "expirationDate",
  volume: "volume",
};

export const SESSION_STORAGE_KEYS = {
  historyStack: "historyStack",
  startedHistoryLength: "startedHistoryLength",
};

export const LINKS = {
  home: { route: "/", title: `${PROJECT_NAME} - Веб-плеер` },
  error: { route: "*", title: "Страница не найдена" },
  login: { route: "login", title: `Войти - ${PROJECT_NAME}` },
  search: { route: "search", title: `${PROJECT_NAME} - Поиск` },
  section: { route: "section", title: `${PROJECT_NAME} - Веб-плеер` },
  playlist: { route: "playlist" },
  album: { route: "album" },
};

export const CATEGORY_IDS = {
  sleep: "0JQ5DAqbMKFCuoRTxhYWow",
};

export const ERRORS = {
  nodata: "data isn't defined",
};

export const PREVIEW_TRACK_DURATION_MS = 29753.468999999997;
