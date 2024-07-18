import { useEffect, useState } from "react";
import { fetchUserSavedTracks } from "../../../services/tracks";
import { CurrentUserProfile, UserSavedTrack } from "../../../models";
import { fetchCurrentUserProfile } from "../../../services";

const useTracksData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState<UserSavedTrack[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUserProfile | null>(null);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (
      offset = 0,
      accumulatedTracks: UserSavedTrack[] = []
    ): Promise<UserSavedTrack[] | undefined> => {
      try {
        const limit = 20;

        const response = await fetchUserSavedTracks({ offset, limit });

        const tracks = [...accumulatedTracks, ...response.items];

        if (tracks.length < response.total) {
          return fetchData(offset + limit, tracks);
        }

        return tracks;
      } catch (err) {
        return undefined;
      }
    };

    const initializeFetch = async () => {
      try {
        setIsLoading(true);

        const fetchedTracks = await fetchData();
        if (fetchedTracks) {
          setTracks(fetchedTracks);
        } else {
          throw new Error();
        }

        const currentUser = await fetchCurrentUserProfile();

        setCurrentUser(currentUser);
      } catch (err) {
        if (err instanceof Error) {
          setIsError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeFetch();
  }, []);

  return { tracks, currentUser, isLoading, isError };
};

export default useTracksData;
