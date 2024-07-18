import { useState, useEffect } from "react";
import { removeUserSavedAlbums, saveAlbumsForCurrentUser } from "../../../services";
import { useAlert } from "../../../utils/hooks";
import { Severity } from "../../../types/enums";

const useFavorite = (albumPresence?: boolean, albumId?: string) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { displayCustomAlert } = useAlert();

  const handleFavoriteClick = async (isFavorite: boolean) => {
    if (!albumId) {
      displayCustomAlert(Severity.Error, "Something went wrong");

      return;
    }

    try {
      if (!isFavorite) {
        await removeUserSavedAlbums({ ids: albumId });
      } else {
        await saveAlbumsForCurrentUser({ ids: albumId });
      }

      setIsFavorite(isFavorite);
    } catch (err) {
      if (!isFavorite) {
        displayCustomAlert(Severity.Error, "Failed to remove album from media library");
      } else {
        displayCustomAlert(Severity.Error, "Failed to add album to media library");
      }
    }
  };

  useEffect(() => {
    if (!albumId || !albumPresence) return;

    setIsFavorite(albumPresence);
  }, [albumId, albumPresence]);

  return { isFavorite, handleFavoriteClick };
};

export default useFavorite;
