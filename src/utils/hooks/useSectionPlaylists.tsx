import { useEffect, useState } from "react";
import { AlbumItem, NewReleases, BasePlaylist, Playlists } from "../../models";
import { fetchSection } from "../../services";

const useSectionPlaylists = (endpoint: string, searchParams: string) => {
  const [playlists, setPlaylists] = useState<BasePlaylist[] | AlbumItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!endpoint) return;
      try {
        setIsLoading(true);

        const data = await fetchSection(endpoint, searchParams);

        if (!data) return;

        if ("playlists" in data) {
          setPlaylists((data as Playlists).playlists.items as BasePlaylist[]);
        } else if ("albums" in data) {
          setPlaylists((data as NewReleases).albums.items);
        }
      } catch (err) {
        if (err instanceof Error) {
          setIsError(err.message);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [endpoint, searchParams]);

  return { playlists, isLoading, isError };
};

export default useSectionPlaylists;
