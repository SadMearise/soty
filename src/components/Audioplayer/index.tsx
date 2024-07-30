import { useRef, useEffect, useState, ChangeEvent, useCallback } from "react";
import { VolumeBar } from "..";
import {
  selectIsPlaying,
  selectPlayingPlaylistId,
  selectPlayingTrack,
} from "../../store/features/audioplayer/audioplayerSelectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import TrackDurationBar from "./TrackDurationBar";
import { nextTrack, playback, prevTrack, setTrackPresence } from "../../store/features/audioplayer/audioplayerSlice";
import { PREVIEW_TRACK_DURATION_MS } from "../../utils/constants";
import TrackInfo from "./TrackInfo";
import AudioControls from "./AudioControls";
import { removeUserSavedTracks, saveTracksForCurrentUser } from "../../services";
import { useAlert } from "../../utils/hooks";
import { Severity } from "../../types/enums";
import { addFavoriteTrack, removeFavoriteTrack } from "../../store/features/favoriteItems/favoriteItemsSlice";
import { TracklistItem } from "../../types";

const classes = {
  wrapper: "flex items-center justify-between h-full",
  leftCol: "flex items-center w-[30%]",
  centerCol: "max-w-[722px] w-[40%]",
  audioControlsWrapper: "mb-[8px]",
  rightCol: "flex items-center justify-end w-[30%]",
  button: "group",
  hover: "fill-white/70 group-hover:fill-white group-active:fill-white/70",
  imageWrapper: "relative h-[52px] aspect-square mr-[8px] bg-dark-200",
  image: "block absolute h-full w-full top-0 left-0 object-cover",
};

const Audioplayer = () => {
  const dispatch = useAppDispatch();

  const [isProcessingFavoriteClick, setIsProcessingFavoriteClick] = useState(false);

  const { displayCustomAlert } = useAlert();
  const audioplayer = useRef<HTMLAudioElement>(null);
  const playingTrack = useAppSelector(selectPlayingTrack);
  const isPlaying = useAppSelector(selectIsPlaying);
  const playingPlaylistId = useAppSelector(selectPlayingPlaylistId);
  const [currentTrackTime, setCurrentTrackTime] = useState(0);

  const handleFavoriteClick = useCallback(
    async (isFavorite: boolean) => {
      if (isProcessingFavoriteClick) return;

      setIsProcessingFavoriteClick(true);

      dispatch(setTrackPresence(isFavorite));

      const handleError = (message: string) => {
        displayCustomAlert(Severity.Error, message);
      };

      if (!playingTrack || !playingTrack.id) {
        handleError("Something went wrong");

        return;
      }

      const handleSuccess = (message: string) => {
        if (!isFavorite) {
          dispatch(removeFavoriteTrack(playingTrack.id as string));
        } else {
          const favoriteTrack: TracklistItem = {
            id: playingTrack.id,
            name: playingTrack.name,
            artists: playingTrack.artists,
            image: playingTrack.image,
            previewUrl: playingTrack.previewUrl,
            durationMs: playingTrack.durationMs,
          };
          dispatch(addFavoriteTrack(favoriteTrack));
        }

        displayCustomAlert(Severity.Success, message);
      };

      try {
        if (!isFavorite) {
          await removeUserSavedTracks({ ids: playingTrack.id });

          handleSuccess("Removed from the media library");
        } else {
          await saveTracksForCurrentUser({ ids: playingTrack.id });

          handleSuccess("Added to the media library");
        }
      } catch (err) {
        handleError(isFavorite ? "Failed to add track to media library" : "Failed to remove track from media library");
      }

      setIsProcessingFavoriteClick(false);
    },
    [dispatch, displayCustomAlert, isProcessingFavoriteClick, playingTrack]
  );

  const playOrPause = () => {
    dispatch(playback({ playingPlaylistId }));
  };

  const updateSeek = () => {
    if (audioplayer.current) {
      const currentTrackTimeMs = audioplayer.current.currentTime * 1000;

      setCurrentTrackTime(currentTrackTimeMs);

      if (audioplayer.current.currentTime === audioplayer.current.duration) {
        dispatch(nextTrack());
      }
    }
  };

  const changeSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const newTime = +event.target.value;

    if (audioplayer.current) {
      audioplayer.current.currentTime = newTime / 1000;
      setCurrentTrackTime(newTime);
    }
  };

  const skipNextTrack = () => {
    dispatch(nextTrack());

    dispatch(playback({}));
  };

  const skipPrevTrack = () => {
    dispatch(prevTrack());

    dispatch(playback({}));
  };

  useEffect(() => {
    if (audioplayer.current) {
      if (isPlaying) {
        audioplayer.current.play();
      } else {
        audioplayer.current.pause();
      }
    }
  }, [isPlaying, playingTrack]);

  return (
    playingTrack && (
      <div className={classes.wrapper}>
        <div className={classes.leftCol}>
          <TrackInfo
            onFavoriteClick={handleFavoriteClick}
            isFavorite={playingTrack.presence}
            image={playingTrack.image}
            name={playingTrack.name}
            artists={playingTrack.artists}
          />
        </div>
        <div className={classes.centerCol}>
          <div className={classes.audioControlsWrapper}>
            <AudioControls
              isPlaying={isPlaying}
              onSkipForwardClick={skipNextTrack}
              onSkipBackwardClick={skipPrevTrack}
              onPlaybackClick={playOrPause}
            />
          </div>
          <TrackDurationBar
            trackDuration={
              playingTrack.durationMs && playingTrack.durationMs < PREVIEW_TRACK_DURATION_MS
                ? playingTrack.durationMs
                : PREVIEW_TRACK_DURATION_MS
            }
            currentTrackTime={currentTrackTime}
            changeSeek={changeSeek}
          />

          <audio
            ref={audioplayer}
            src={playingTrack.previewUrl || undefined}
            onTimeUpdate={updateSeek}
          >
            <track kind="captions" />
          </audio>
        </div>
        <div className={classes.rightCol}>
          <VolumeBar audioplayer={audioplayer} />
        </div>
      </div>
    )
  );
};

export default Audioplayer;
