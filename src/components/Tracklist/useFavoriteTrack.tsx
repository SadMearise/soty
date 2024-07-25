import { useEffect, useState } from "react";
import { checkUserSavedTracks, removeUserSavedTracks, saveTracksForCurrentUser } from "../../services";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPlayingTrack } from "../../store/features/audioplayer/audioplayerSelectors";
import { setTrackPresence } from "../../store/features/audioplayer/audioplayerSlice";
import { useAlert } from "../../utils/hooks";
import { Severity } from "../../types/enums";
import { decreaseFavoriteTracks, increaseFavoriteTracks } from "../../store/features/favoriteItems/favoriteItemsSlice";

const useFavoriteTrack = (trackPresence: boolean, trackId?: string) => {
  const dispatch = useAppDispatch();
  const { displayCustomAlert } = useAlert();
  const playingTrack = useAppSelector(selectPlayingTrack);
  const [isFavorite, setIsFavorite] = useState(trackPresence);

  const handleFavoriteClick = async (isFavorite: boolean) => {
    const handleSuccess = (message: string) => {
      if (!isFavorite) {
        dispatch(decreaseFavoriteTracks());
      } else {
        dispatch(increaseFavoriteTracks());
      }

      displayCustomAlert(Severity.Success, message);
    };

    const handleError = (message: string) => {
      displayCustomAlert(Severity.Error, message);
    };

    try {
      if (!isFavorite) {
        await removeUserSavedTracks({ ids: trackId! });

        handleSuccess("Removed from the media library");
      } else {
        await saveTracksForCurrentUser({ ids: trackId! });

        handleSuccess("Added to the media library");
      }

      if (playingTrack && playingTrack.id === trackId) {
        dispatch(setTrackPresence(isFavorite));
      }

      setIsFavorite(isFavorite);
    } catch (err) {
      handleError(isFavorite ? "Failed to add track to media library" : "Failed to remove track from media library");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!trackId || !playingTrack || playingTrack.id !== trackId) return;

      const trackPresence = await checkUserSavedTracks({ ids: trackId });

      setIsFavorite(trackPresence[0]);
    };

    fetchData();
  }, [playingTrack, trackId]);

  return { isFavorite, handleFavoriteClick };
};

export default useFavoriteTrack;
