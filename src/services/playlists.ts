import { Playlist, Playlists, UserPlaylists } from "../models";
import { ENDPOINTS, LOCAL_STORAGE_KEYS } from "../utils/constants";
import { getLocalStorage, getQueryParameterStringFromObject } from "../utils/helpers";
import { fetchData } from ".";
import { HTTPMethod } from "../types/enums";

export type FeaturedPlaylistsParams = {
  country?: string;
  locale?: string;
  timestamp?: string;
  limit?: number;
  offset?: number;
};

// API https://developer.spotify.com/documentation/web-api/reference/get-featured-playlists
export const fetchFeaturedPlaylists = async (params?: FeaturedPlaylistsParams): Promise<Playlists> => {
  const queryString = params ? `?${getQueryParameterStringFromObject(params)}` : "";

  const featuredPlaylists: Playlists = (await fetchData({
    url: `${ENDPOINTS.featuredPlaylists}${queryString}`,
    method: HTTPMethod.Get,
    headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
  }))!;

  return featuredPlaylists;
};

export type CategoryPlaylistsParams = {
  limit?: number;
  offset?: number;
};

// API https://developer.spotify.com/documentation/web-api/reference/get-a-categories-playlists
export const fetchCategoryPlaylistsById = async (
  id: string,
  searchParams?: CategoryPlaylistsParams
): Promise<Playlists> => {
  const queryString = searchParams ? `?${getQueryParameterStringFromObject(searchParams)}` : "";

  const categoryPlaylists: Playlists = (await fetchData({
    url: `${ENDPOINTS.categories}/${id}/playlists${queryString}`,
    method: HTTPMethod.Get,
    headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
  }))!;

  return categoryPlaylists;
};

export type PlaylistParams = {
  market?: string;
  fields?: string;
  additional_types?: string;
};

// API https://developer.spotify.com/documentation/web-api/reference/get-playlist
export const fetchPlaylistById = async (id: string, searchParams?: PlaylistParams): Promise<Playlist> => {
  const queryString = searchParams ? `?${getQueryParameterStringFromObject(searchParams)}` : "";

  const playlist: Playlist = (await fetchData({
    url: `${ENDPOINTS.playlists}/${id}${queryString}`,
    method: HTTPMethod.Get,
    headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
  }))!;

  return playlist;
};

export type UserPlaylistsParams = {
  limit?: number;
  offset?: number;
};

// API https://developer.spotify.com/documentation/web-api/reference/get-list-users-playlists
export const fetchUserPlaylists = async (id: string, searchParams?: UserPlaylistsParams): Promise<UserPlaylists> => {
  const queryString = searchParams ? `?${getQueryParameterStringFromObject(searchParams)}` : "";

  const playlists: UserPlaylists = (await fetchData({
    url: `${ENDPOINTS.users}/${id}/playlists${queryString}`,
    method: HTTPMethod.Get,
    headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
  }))!;

  return playlists;
};
