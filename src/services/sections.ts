import { NewReleases, Playlists } from "../models";
import { LOCAL_STORAGE_KEYS } from "../utils/constants";
import { getLocalStorage } from "../utils/helpers";
import { fetchData } from ".";
import { HTTPMethod } from "../types/enums";

export const fetchSection = async (endpoint: string, searchParams: string): Promise<NewReleases | Playlists> => {
  const section: NewReleases | Playlists = (await fetchData({
    url: `https://api.spotify.com/${endpoint}${searchParams}`,
    method: HTTPMethod.Get,
    headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
  }))!;

  return section;
};
