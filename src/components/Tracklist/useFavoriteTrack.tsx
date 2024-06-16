import { useEffect, useState } from "react";
import { checkUserSavedTracks, removeUserSavedTracks, saveTracksForCurrentUser } from "../../services";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPlayingTrack } from "../../store/features/audioplayer/audioplayerSelectors";
import { setTrackPresence } from "../../store/features/audioplayer/audioplayerSlice";
import { useAlert } from "../../utils/hooks";
import { Severity } from "../../types/enums";

const useFavoriteTrack = (trackPresence: boolean, trackId?: string) => {
  const dispatch = useAppDispatch();
  const { displayCustomAlert } = useAlert();
  const playingTrack = useAppSelector(selectPlayingTrack);
  const [isFavorite, setIsFavorite] = useState(trackPresence);

  const onFavoriteClick = async (isFavorite: boolean) => {
    try {
      if (!isFavorite) {
        await removeUserSavedTracks({ ids: trackId! });
      } else {
        await saveTracksForCurrentUser({ ids: trackId! });
      }

      if (playingTrack && playingTrack.id === trackId) {
        dispatch(setTrackPresence(isFavorite));
      }

      setIsFavorite(isFavorite);
    } catch (err) {
      if (!isFavorite) {
        displayCustomAlert(Severity.Error, "Failed to remove track from media library");
      } else {
        displayCustomAlert(Severity.Error, "Failed to add track to media library");
      }
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

  return { isFavorite, onFavoriteClick };
};

export default useFavoriteTrack;
