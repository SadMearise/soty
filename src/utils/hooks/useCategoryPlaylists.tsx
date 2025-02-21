import { useEffect, useState } from "react";
import { getUrlPathAndSearch } from "../helpers";
import { BasePlaylist } from "../../models";
import { CategoryPlaylistsParams, fetchCategoryPlaylistsById } from "../../services";

const useCategoryPlaylists = (id: string, params?: CategoryPlaylistsParams) => {
  const [categoryPlaylists, setCategoryPlaylists] = useState<BasePlaylist[]>([]);
  const [categoryPlaylistsPath, setCategoryPlaylistsPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const data = await fetchCategoryPlaylistsById(id, params);

      if (!data) {
        setIsError(true);

        return;
      }

      setCategoryPlaylistsPath(getUrlPathAndSearch(data.playlists.href));
      setCategoryPlaylists(data.playlists.items as BasePlaylist[]);
      setIsLoading(false);
    };

    fetchData();
  }, [id, params]);

  return { categoryPlaylistsPath, categoryPlaylists, isLoading, isError };
};

export default useCategoryPlaylists;
