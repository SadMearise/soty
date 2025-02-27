import { useEffect, useState } from "react";
import { BasePlaylist } from "../../models";
import { FeaturedPlaylistsParams, fetchFeaturedPlaylists } from "../../services";

const useFeaturedPlaylists = (params?: FeaturedPlaylistsParams) => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState<BasePlaylist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const data = await fetchFeaturedPlaylists(params);

      if (!data) {
        setIsError(true);

        return;
      }

      setFeaturedPlaylists(data.playlists.items as BasePlaylist[]);
      setIsLoading(false);
    };

    fetchData();
  }, [params]);

  return { featuredPlaylists, isLoading, isError };
};

export default useFeaturedPlaylists;
