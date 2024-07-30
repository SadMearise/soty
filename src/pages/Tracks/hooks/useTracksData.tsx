import { useState, useEffect } from "react";
import { useCurrentUser } from "../../../utils/hooks";
import { useAppSelector } from "../../../store/hooks";
import {
  selectFavoriteTracks,
  selectIsLoadingTracks,
} from "../../../store/features/favoriteItems/favoriteItemsSelectors";
import { selectIsPlaying, selectPlayingPlaylistId } from "../../../store/features/audioplayer/audioplayerSelectors";

const useTracksData = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { user: currentUser, isLoading: isLoadingUser } = useCurrentUser();
  const isLoadingTracks = useAppSelector(selectIsLoadingTracks);

  const tracks = useAppSelector(selectFavoriteTracks);
  const playingPlaylistId = useAppSelector(selectPlayingPlaylistId);
  const isPlaying = useAppSelector(selectIsPlaying);
  const tracksIds = tracks ? tracks.filter((item) => item.id).map((item) => item.id!) : [];

  useEffect(() => {
    setIsLoading(isLoadingUser || isLoadingTracks);
  }, [isLoadingTracks, isLoadingUser]);

  return { currentUser, tracks, playingPlaylistId, isPlaying, tracksIds, isLoading };
};

export default useTracksData;
