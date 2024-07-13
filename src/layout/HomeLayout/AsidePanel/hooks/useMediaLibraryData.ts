import { useEffect, useState } from "react";
import { BasePlaylist, UserSavedAlbum } from "../../../../models";
import { fetchUserSavedAlbums } from "../../../../services/albums";
import { fetchCurrentUserSavedPlaylists } from "../../../../services/playlists";
import { fetchUserSavedTracks } from "../../../../services/tracks";

const useMediaLibraryData = () => {
  const [userAlbums, setUserAlbums] = useState<UserSavedAlbum[]>([]);
  const [userPlaylists, setUserPlaylists] = useState<Partial<BasePlaylist>[]>([]);
  const [totalTracks, setTotalTracks] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const userAlbums = await fetchUserSavedAlbums({});

      setUserAlbums(userAlbums.items);

      const userPlaylists = await fetchCurrentUserSavedPlaylists({});

      setUserPlaylists(userPlaylists.items);

      const userTracks = await fetchUserSavedTracks({});

      setTotalTracks(userTracks.total);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { userAlbums, userPlaylists, totalTracks, isLoading };
};

export default useMediaLibraryData;
