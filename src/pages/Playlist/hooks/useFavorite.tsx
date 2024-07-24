import { useState, useEffect } from "react";
import { followPlaylist, unfollowPlaylist } from "../../../services";
import { Severity } from "../../../types/enums";
import { useAlert } from "../../../utils/hooks";
import { Playlist } from "../../../models";
import { useAppDispatch } from "../../../store/hooks";
import { addFavoritePlaylist, removeFavoritePlaylist } from "../../../store/features/favoriteItems/favoriteItemsSlice";
import { FavoritePlaylist } from "../../../store/features/favoriteItems/types";

const useFavorite = (playlistPresence?: boolean, playlist?: Playlist) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useAppDispatch();
  const { displayCustomAlert } = useAlert();

  const handleFavoriteClick = async (isFavorite: boolean) => {
    const handleSuccess = (message: string, favoritePlaylist: FavoritePlaylist) => {
      if (!isFavorite) {
        dispatch(removeFavoritePlaylist(favoritePlaylist));
      } else {
        dispatch(addFavoritePlaylist(favoritePlaylist));
      }

      displayCustomAlert(Severity.Success, message);
    };

    const handleError = (message: string) => {
      displayCustomAlert(Severity.Error, message);
    };

    if (!playlist || !playlist.id) {
      handleError("Something went wrong");

      return;
    }

    try {
      const favoritePlaylist = {
        id: playlist.id,
        name: playlist.name,
        ownerName: playlist.owner?.display_name,
        imageUrl: playlist.images && playlist.images[0].url,
      };

      if (!isFavorite) {
        await unfollowPlaylist(playlist.id);

        handleSuccess("Removed from the media library", favoritePlaylist);
      } else {
        await followPlaylist(playlist.id);

        handleSuccess("Added to the media library", favoritePlaylist);
      }

      setIsFavorite(isFavorite);
    } catch (err) {
      handleError(
        isFavorite ? "Failed to add playlist to media library" : "Failed to remove playlist from media library"
      );
    }
  };

  useEffect(() => {
    if (!playlist || !playlist.id || !playlistPresence) return;

    setIsFavorite(playlistPresence);
  }, [playlist, playlistPresence]);

  return { isFavorite, handleFavoriteClick };
};

export default useFavorite;
