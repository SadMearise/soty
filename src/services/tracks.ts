import { HTTPMethod } from "../types/enums";
import { ENDPOINTS, LOCAL_STORAGE_KEYS } from "../utils/constants";
import { getLocalStorage, getQueryParameterStringFromObject } from "../utils/helpers";
import { fetchData } from ".";
import { Ids } from "../types";
import { UserSavedTracks } from "../models";

export type SaveTracksForCurrentUserParams = object & Ids;

// API https://developer.spotify.com/documentation/web-api/reference/save-tracks-user
export const saveTracksForCurrentUser = async (searchParams: SaveTracksForCurrentUserParams) => {
  const queryString = `${getQueryParameterStringFromObject(searchParams)}`;

  await fetchData({
    url: `${ENDPOINTS.me}/tracks${queryString}`,
    method: HTTPMethod.Put,
    headers: new Headers({
      Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}`,
    }),
  });
};

export type RemoveUserSavedTracksParams = object & Ids;

// API https://developer.spotify.com/documentation/web-api/reference/remove-tracks-user
export const removeUserSavedTracks = async (searchParams: RemoveUserSavedTracksParams) => {
  const queryString = `${getQueryParameterStringFromObject(searchParams)}`;

  await fetchData({
    url: `${ENDPOINTS.me}/tracks${queryString}`,
    method: HTTPMethod.Delete,
    headers: new Headers({
      Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}`,
    }),
  });
};

export type CheckUserSavedTracksParams = object & Ids;

// API https://developer.spotify.com/documentation/web-api/reference/check-users-saved-tracks
export const checkUserSavedTracks = async (searchParams: CheckUserSavedTracksParams): Promise<boolean[]> => {
  const queryString = `${getQueryParameterStringFromObject(searchParams)}`;

  const isSavedTracks: boolean[] = (await fetchData({
    url: `${ENDPOINTS.me}/tracks/contains${queryString}`,
    method: HTTPMethod.Get,
    headers: new Headers({
      Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}`,
    }),
  }))!;

  return isSavedTracks;
};

type GetUserSavedTracksParams = {
  market?: string;
  limit?: number;
  offset?: number;
};

// API https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
export const fetchUserSavedTracks = async (searchParams: GetUserSavedTracksParams): Promise<UserSavedTracks> => {
  const queryString = `${getQueryParameterStringFromObject(searchParams)}`;

  const tracks: UserSavedTracks = (await fetchData({
    url: `${ENDPOINTS.me}/tracks${queryString}`,
    method: HTTPMethod.Get,
    headers: new Headers({
      Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}`,
    }),
  }))!;

  return tracks;
};
