import { Album, Albums, UserSavedAlbums } from "../models";
import { ENDPOINTS, LOCAL_STORAGE_KEYS } from "../utils/constants";
import { getLocalStorage, getQueryParameterStringFromObject } from "../utils/helpers";
import { fetchData } from ".";
import { HTTPMethod } from "../types/enums";
import { Ids } from "../types";

export type NewReleasesParams = {
  limit?: number;
  offset?: number;
};

// API https://developer.spotify.com/documentation/web-api/reference/get-new-releases
export const fetchNewReleases = async (params?: NewReleasesParams): Promise<Albums | null> => {
  const queryString = params ? `${getQueryParameterStringFromObject(params)}` : "";

  try {
    const newReleases: Albums = (await fetchData({
      url: `${ENDPOINTS.newReleases}${queryString}`,
      method: HTTPMethod.Get,
      headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
    }))!;

    return newReleases;
  } catch {
    return null;
  }
};

export type AlbumParams = {
  market?: string;
};

// API https://developer.spotify.com/documentation/web-api/reference/get-an-album
export const fetchAlbumById = async (id: string, searchParams?: AlbumParams): Promise<Album> => {
  const queryString = searchParams ? `${getQueryParameterStringFromObject(searchParams)}` : "";

  const album: Album = (await fetchData({
    url: `${ENDPOINTS.albums}/${id}${queryString}`,
    method: HTTPMethod.Get,
    headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
  }))!;

  return album;
};

export type SaveAlbumsForCurrentUserParams = object & Ids;

// API https://developer.spotify.com/documentation/web-api/reference/save-albums-user
export const saveAlbumsForCurrentUser = async (searchParams: SaveAlbumsForCurrentUserParams) => {
  const queryString = `${getQueryParameterStringFromObject(searchParams)}`;

  await fetchData({
    url: `${ENDPOINTS.me}/albums${queryString}`,
    method: HTTPMethod.Put,
    headers: new Headers({
      Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}`,
    }),
  });
};

export type RemoveUserSavedAlbumsParams = object & Ids;

// API https://developer.spotify.com/documentation/web-api/reference/remove-albums-user
export const removeUserSavedAlbums = async (searchParams: RemoveUserSavedAlbumsParams) => {
  const queryString = `${getQueryParameterStringFromObject(searchParams)}`;

  await fetchData({
    url: `${ENDPOINTS.me}/albums${queryString}`,
    method: HTTPMethod.Delete,
    headers: new Headers({
      Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}`,
    }),
  });
};

export type CheckUserSavedAlbumsParams = object & Ids;

// API https://developer.spotify.com/documentation/web-api/reference/check-users-saved-albums
export const checkUserSavedAlbums = async (searchParams: CheckUserSavedAlbumsParams): Promise<boolean[]> => {
  const queryString = `${getQueryParameterStringFromObject(searchParams)}`;

  const isSavedAlbums: boolean[] = (await fetchData({
    url: `${ENDPOINTS.me}/albums/contains${queryString}`,
    method: HTTPMethod.Get,
    headers: new Headers({
      Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}`,
    }),
  }))!;

  return isSavedAlbums;
};

type GetUserSavedAlbumsParams = {
  limit?: number;
  offset?: number;
  market?: string;
};

// API https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums
export const fetchUserSavedAlbums = async (searchParams: GetUserSavedAlbumsParams): Promise<UserSavedAlbums> => {
  const queryString = `${getQueryParameterStringFromObject(searchParams)}`;

  const albums: UserSavedAlbums = (await fetchData({
    url: `${ENDPOINTS.me}/albums${queryString}`,
    method: HTTPMethod.Get,
    headers: new Headers({
      Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}`,
    }),
  }))!;

  return albums;
};
