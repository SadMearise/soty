import { useEffect, useState } from "react";
import { checkUserSavedTracks, removeUserSavedTracks, saveTracksForCurrentUser } from "../../services";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPlayingTrack } from "../../store/features/audioplayer/audioplayerSelectors";
import { setTrackPresence } from "../../store/features/audioplayer/audioplayerSlice";
import { useAlert } from "../../utils/hooks";
import { Severity } from "../../types/enums";
import { addFavoriteTrack, removeFavoriteTrack } from "../../store/features/favoriteItems/favoriteItemsSlice";
import { TracklistItem } from "../../types";

const useFavoriteTrack = (tracklistItem: TracklistItem, presence: boolean) => {
  const dispatch = useAppDispatch();

  const [isProcessingFavoriteClick, setIsProcessingFavoriteClick] = useState(false);

  const { displayCustomAlert } = useAlert();
  const playingTrack = useAppSelector(selectPlayingTrack);
  const [isFavorite, setIsFavorite] = useState(presence);

  const handleFavoriteClick = async (isFavorite: boolean) => {
    if (isProcessingFavoriteClick) return;

    setIsProcessingFavoriteClick(true);

    if (!tracklistItem.id) {
      displayCustomAlert(Severity.Success, "Something went wrong");

      return;
    }

    const handleSuccess = (message: string) => {
      if (!isFavorite) {
        dispatch(removeFavoriteTrack(tracklistItem.id!));
      } else {
        const favoriteTrack: TracklistItem = {
          id: tracklistItem.id,
          name: tracklistItem.name,
          artists: tracklistItem.artists,
          image: tracklistItem.image,
          previewUrl: tracklistItem.previewUrl,
          durationMs: tracklistItem.durationMs,
        };
        dispatch(addFavoriteTrack(favoriteTrack));
      }

      displayCustomAlert(Severity.Success, message);
    };

    const handleError = (message: string) => {
      displayCustomAlert(Severity.Error, message);
    };

    try {
      if (!isFavorite) {
        await removeUserSavedTracks({ ids: tracklistItem.id! });

        handleSuccess("Removed from the media library");
      } else {
        await saveTracksForCurrentUser({ ids: tracklistItem.id! });

        handleSuccess("Added to the media library");
      }

      if (playingTrack && playingTrack.id === tracklistItem.id) {
        dispatch(setTrackPresence(isFavorite));
      }

      setIsFavorite(isFavorite);
    } catch (err) {
      handleError(isFavorite ? "Failed to add track to media library" : "Failed to remove track from media library");
    }

    setIsProcessingFavoriteClick(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!tracklistItem.id || !playingTrack || playingTrack.id !== tracklistItem.id) return;

      const trackPresence = await checkUserSavedTracks({ ids: tracklistItem.id });

      setIsFavorite(trackPresence[0]);
    };

    fetchData();
  }, [playingTrack, tracklistItem]);

  return { isFavorite, handleFavoriteClick };
};

export default useFavoriteTrack;
