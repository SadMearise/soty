import { useState, useEffect } from "react";
import { removeUserSavedAlbums, saveAlbumsForCurrentUser } from "../../../services";
import { useAlert } from "../../../utils/hooks";
import { Severity } from "../../../types/enums";
import { useAppDispatch } from "../../../store/hooks";
import { addFavoriteAlbum, removeFavoriteAlbum } from "../../../store/features/favoriteItems/favoriteItemsSlice";
import { Album } from "../../../models";
import { FavoriteAlbum } from "../../../store/features/favoriteItems/types";

const useFavorite = (albumPresence?: boolean, album?: Album) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { displayCustomAlert } = useAlert();
  const dispatch = useAppDispatch();

  const handleFavoriteClick = async (isFavorite: boolean) => {
    const handleSuccess = (message: string, favoriteAlbum: FavoriteAlbum) => {
      if (!isFavorite) {
        dispatch(removeFavoriteAlbum(favoriteAlbum));
      } else {
        dispatch(addFavoriteAlbum(favoriteAlbum));
      }

      displayCustomAlert(Severity.Success, message);
    };

    const handleError = (message: string) => {
      displayCustomAlert(Severity.Error, message);
    };

    if (!album) {
      handleError("Something went wrong");

      return;
    }

    try {
      const favoriteAlbum = {
        id: album.id,
        name: album.name,
        artistName: album.artists[0].name,
        imageUrl: album.images[0].url,
      };

      if (!isFavorite) {
        await removeUserSavedAlbums({ ids: album.id });

        handleSuccess("Removed from the media library", favoriteAlbum);
      } else {
        await saveAlbumsForCurrentUser({ ids: album.id });

        handleSuccess("Added to the media library", favoriteAlbum);
      }

      setIsFavorite(isFavorite);
    } catch (err) {
      handleError(isFavorite ? "Failed to add album to media library" : "Failed to remove album from media library");
    }
  };

  useEffect(() => {
    if (!album || !albumPresence) return;

    setIsFavorite(albumPresence);
  }, [album, albumPresence]);

  return { isFavorite, handleFavoriteClick };
};

export default useFavorite;
