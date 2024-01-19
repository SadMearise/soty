import { FeaturedPlaylists, NewReleases } from "../models";
import { ENDPOINTS, HTTPMethod, HTTPStatusCode, LOCAL_STORAGE_KEYS } from "../utils/constants";
import { getLocalStorage } from "../utils/helpers/localStorage";
import updateToken from "../utils/helpers/updateToken";

export const fetchNewReleases = async (): Promise<NewReleases | undefined> => {
  try {
    const response = await fetch(`${ENDPOINTS.newReleases}`, {
      method: HTTPMethod.Get,
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}`,
      },
    });

    if (response.status === HTTPStatusCode.Unauthorized) {
      await updateToken();
      return await fetchNewReleases();
    }
    if (!response.ok) {
      throw new Error(`code ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("An error occured during album data retrieval.", (error as Error).message);

    return undefined;
  }
};

export const fetchFeaturedPlaylists = async (): Promise<FeaturedPlaylists | undefined> => {
  try {
    const response = await fetch(`${ENDPOINTS.featuredPlaylists}`, {
      method: HTTPMethod.Get,
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}`,
      },
    });

    if (response.status === HTTPStatusCode.Unauthorized) {
      await updateToken();
      return await fetchFeaturedPlaylists();
    }
    if (!response.ok) {
      throw new Error(`code ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("An error occured during playlists data retrieval.", (error as Error).message);

    return undefined;
  }
};
