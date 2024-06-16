import { Artist, ArtistAlbums } from "../models";
import { ENDPOINTS, LOCAL_STORAGE_KEYS } from "../utils/constants";
import { getLocalStorage, getQueryParameterStringFromObject } from "../utils/helpers";
import { fetchData } from ".";
import { HTTPMethod } from "../types/enums";

// API https://developer.spotify.com/documentation/web-api/reference/get-an-artist
export const fetchArtistById = async (id: string): Promise<Artist> => {
  const artist: Artist = (await fetchData({
    url: `${ENDPOINTS.artists}/${id}`,
    method: HTTPMethod.Get,
    headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
  }))!;

  return artist;
};

export type ArtistAlbumsByIdParams = {
  include_groups?: string;
  market?: string;
  limit?: number;
  offset?: number;
};

// API https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
export const fetchArtistAlbumsById = async (
  id: string,
  searchParams?: ArtistAlbumsByIdParams
): Promise<ArtistAlbums> => {
  const queryString = searchParams ? `?${getQueryParameterStringFromObject(searchParams)}` : "";

  const albums: ArtistAlbums = (await fetchData({
    url: `${ENDPOINTS.artists}/${id}/albums${queryString}`,
    method: HTTPMethod.Get,
    headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
  }))!;

  return albums;
};
