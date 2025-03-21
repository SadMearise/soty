import { Albums, Playlists } from "../models";
import { SearchResult } from "../types";
import { HTTPMethod } from "../types/enums";
import { ENDPOINTS, LOCAL_STORAGE_KEYS } from "../utils/constants";
import { getLocalStorage, getQueryParameterStringFromObject } from "../utils/helpers";
import { fetchData } from ".";

type SearchItemParams = {
  q: string;
  type: string[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
};

// API https://developer.spotify.com/documentation/web-api/reference/search
export const fetchSearchItem = async (searchParams: SearchItemParams): Promise<SearchResult> => {
  const queryString = searchParams ? `${getQueryParameterStringFromObject(searchParams)}` : "";

  const searchResult: Playlists | Albums = (await fetchData({
    url: `${ENDPOINTS.search}${queryString}`,
    method: HTTPMethod.Get,
    headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
  }))!;

  return searchResult;
};
