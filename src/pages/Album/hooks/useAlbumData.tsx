import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Album, Artist, ArtistAlbumsItem } from "../../../models";
import {
  checkUserSavedAlbums,
  fetchAlbumById,
  fetchArtistAlbumsById,
  fetchArtistById,
  processUserSavedTracksChunk,
} from "../../../services";

const useAlbumData = () => {
  const { id: albumId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [album, setAlbum] = useState<Album>();
  const [artist, setArtist] = useState<Artist>();
  const [artistAlbums, setArtistAlbums] = useState<ArtistAlbumsItem[]>([]);
  const [tracksPresence, setTracksPresence] = useState<boolean[]>([]);
  const [albumsPresence, setAlbumsPresence] = useState<boolean>();
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (!albumId) return;

        const album = await fetchAlbumById(albumId);
        setAlbum(album);

        if (!album?.artists[0]?.id) return;

        const artist = await fetchArtistById(album.artists[0].id);
        setArtist(artist);

        if (!artist?.id) return;

        const artistAlbums = await fetchArtistAlbumsById(artist.id, { limit: 9 });
        setArtistAlbums(artistAlbums.items);

        const trackIds = album?.tracks.items.reduce((res, track) => `${res + track.id},`, "").slice(0, -1);

        if (!trackIds) return;

        const trackPresenceData = await processUserSavedTracksChunk(trackIds.split(","));
        setTracksPresence(trackPresenceData);

        const albumPresenceData = await checkUserSavedAlbums({ ids: album.id });
        setAlbumsPresence(albumPresenceData[0]);
      } catch (err) {
        if (err instanceof Error) {
          setIsError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [albumId]);

  return { album, artist, artistAlbums, tracksPresence, albumsPresence, isLoading, isError };
};

export default useAlbumData;
