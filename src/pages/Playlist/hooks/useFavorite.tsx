import { useState, useEffect } from "react";
import { followPlaylist, unfollowPlaylist } from "../../../services";
import { Severity } from "../../../types/enums";
import { useAlert } from "../../../utils/hooks";

const useFavorite = (playlistPresence?: boolean, playlistId?: string) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { displayCustomAlert } = useAlert();

  const handleFavoriteClick = async (isFavorite: boolean) => {
    if (!playlistId) {
      displayCustomAlert(Severity.Error, "Something went wrong");

      return;
    }

    try {
      if (!isFavorite) {
        await unfollowPlaylist(playlistId);
      } else {
        await followPlaylist(playlistId);
      }

      setIsFavorite(isFavorite);
    } catch (err) {
      if (!isFavorite) {
        displayCustomAlert(Severity.Error, "Failed to remove playlist from media library");
      } else {
        displayCustomAlert(Severity.Error, "Failed to add playlist to media library");
      }
    }
  };

  useEffect(() => {
    if (!playlistId || !playlistPresence) return;

    setIsFavorite(playlistPresence);
  }, [playlistId, playlistPresence]);

  return { isFavorite, handleFavoriteClick };
};

export default useFavorite;
