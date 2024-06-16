import { CurrentUserProfile, UserProfile } from "../models";
import { ENDPOINTS, LOCAL_STORAGE_KEYS } from "../utils/constants";
import { getLocalStorage, getQueryParameterStringFromObject } from "../utils/helpers";
import { fetchData } from ".";
import { HTTPMethod } from "../types/enums";
import { Ids } from "../types";

// API https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
export const fetchCurrentUserProfile = async (): Promise<CurrentUserProfile> => {
  const user: CurrentUserProfile = (await fetchData({
    url: ENDPOINTS.me,
    method: HTTPMethod.Get,
    headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
  }))!;

  return user;
};

// API https://developer.spotify.com/documentation/web-api/reference/get-users-profile
export const fetchUserProfileById = async (id: string): Promise<UserProfile> => {
  const user: UserProfile = (await fetchData({
    url: `${ENDPOINTS.users}/${id}`,
    method: HTTPMethod.Get,
    headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
  }))!;

  return user;
};

export type CheckIfUserFollowsPlaylistParams = object & Ids;

// API https://developer.spotify.com/documentation/web-api/reference/check-if-user-follows-playlist
export const checkIfUserFollowsPlaylist = async (
  playlistId: string,
  searchParams: CheckIfUserFollowsPlaylistParams
): Promise<boolean[]> => {
  const queryString = `?${getQueryParameterStringFromObject(searchParams)}`;

  const isSavedPlaylist: boolean[] = (await fetchData({
    url: `${ENDPOINTS.playlists}/${playlistId}/followers/contains${queryString}`,
    method: HTTPMethod.Get,
    headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
  }))!;

  return isSavedPlaylist;
};

// API https://developer.spotify.com/documentation/web-api/reference/follow-playlist
export const followPlaylist = async (id: string) => {
  await fetchData({
    url: `${ENDPOINTS.playlists}/${id}/followers`,
    method: HTTPMethod.Put,
    headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
  });
};

// API https://developer.spotify.com/documentation/web-api/reference/unfollow-playlist
export const unfollowPlaylist = async (id: string) => {
  await fetchData({
    url: `${ENDPOINTS.playlists}/${id}/followers`,
    method: HTTPMethod.Delete,
    headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
  });
};
