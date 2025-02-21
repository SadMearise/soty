import { useEffect, useState } from "react";
import { getUrlPathAndSearch } from "../helpers";
import { AlbumItem } from "../../models";
import { NewReleasesParams, fetchNewReleases } from "../../services";

const useNewReleasedPlaylists = (params?: NewReleasesParams) => {
  const [newReleasedPlaylists, setNewReleasedPlaylists] = useState<AlbumItem[]>([]);
  const [newReleasedPlaylistsPath, setNewReleasedPlaylistsPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const data = await fetchNewReleases(params);

      if (!data) {
        setIsError(true);

        return;
      }

      setNewReleasedPlaylistsPath(getUrlPathAndSearch(data.albums.href));
      setNewReleasedPlaylists(data.albums.items);
      setIsLoading(false);
    };

    fetchData();
  }, [params]);

  return { newReleasedPlaylistsPath, newReleasedPlaylists, isLoading, isError };
};

export default useNewReleasedPlaylists;
