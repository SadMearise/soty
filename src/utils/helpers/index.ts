import { getCodeChallenge } from "./codeChallenge";
import { getCodeVerifier, setCodeVerifier } from "./codeVerifier";
import { getDeclension } from "./declension";
import { greeting, getAlbumDuration, getTrackTime, getAlbumReleaseDate } from "./text";
import { setLocalStorage, getLocalStorage, removeLocalStorage } from "./localStorage";
import { getQueryParameterStringFromObject } from "./queryParameters";
import { getSearchParamFromCurrentUrl } from "./searchParams";
import { checkExpiryToken, getTokenExpirationDate } from "./token";
import { getUrlPathAndSearch } from "./urlParts";

export {
  getCodeChallenge,
  getCodeVerifier,
  setCodeVerifier,
  getDeclension,
  greeting,
  getAlbumReleaseDate,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  getQueryParameterStringFromObject,
  getSearchParamFromCurrentUrl,
  getAlbumDuration,
  getTrackTime,
  getTokenExpirationDate,
  checkExpiryToken,
  getUrlPathAndSearch,
};
