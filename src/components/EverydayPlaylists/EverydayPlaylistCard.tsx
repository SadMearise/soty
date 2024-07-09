import { FC } from "react";
import { Link } from "react-router-dom";
import { PlaybackWithEqualizer } from "..";
import { RoundedButtonColor, RoundedButtonSize } from "../RoundedButton/enums";
import { getAudioplayerTracksInfo } from "../../services";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { playback, setTracksInfo } from "../../store/features/audioplayer/audioplayerSlice";
import { selectIsPlaying, selectPlayingPlaylistId } from "../../store/features/audioplayer/audioplayerSelectors";
import { AudioplayerTrackInfo } from "../../types";
import { LINKS } from "../../utils/constants";
import { Severity, TracklistType } from "../../types/enums";
import { useAlert } from "../../utils/hooks";

type EverydayPlaylistProps = {
  type: TracklistType;
  imageUrl: string;
  name: string;
  id?: string;
};

const EverydayPlaylistCard: FC<EverydayPlaylistProps> = ({ type, id, imageUrl, name }) => {
  const dispatch = useAppDispatch();
  const { displayCustomAlert } = useAlert();
  const playingPlaylistId = useAppSelector(selectPlayingPlaylistId);
  const isPlaying = useAppSelector(selectIsPlaying);
  const playlistIsPlaying = isPlaying && playingPlaylistId === id;

  const classes = {
    item: "relative flex rounded-[4px] bg-white/[.07] overflow-hidden transition-colors hover:bg-white/[.2] group",
    itemLink: "absolute w-full h-full top-0 left-0",
    leftSide: "relative h-full aspect-square",
    leftSideImage: "block absolute h-full w-full top-0 left-0 object-cover",
    rightSide: "flex flex-auto justify-between items-center px-[16px] overflow-hidden",
    rightSideWrapper: "w-12 h-12 2xl-max:w-9 2xl-max:h-9",
    rightSideText: "text-white text-sm font-bold truncate xl-min:text-base",
  };

  const handlePlayback = async () => {
    if (!id) return;

    const tracksInfo: AudioplayerTrackInfo[] = await getAudioplayerTracksInfo(type, id);

    if (!tracksInfo.length) {
      displayCustomAlert(Severity.Error, "The Playlist cannot be played");
    } else {
      dispatch(setTracksInfo(tracksInfo));
      dispatch(playback({ playingPlaylistId: id }));
    }
  };

  return (
    id && (
      <article className={classes.item}>
        <div className={classes.leftSide}>
          <img
            src={imageUrl}
            className={classes.leftSideImage}
          />
        </div>
        <div className={classes.rightSide}>
          <span className={classes.rightSideText}>{name}</span>
          <div className={classes.rightSideWrapper}>
            <PlaybackWithEqualizer
              isPlaying={playlistIsPlaying}
              equalizer={{
                id: "equalizer",
                colorFill: "fill-green-100",
                size: "16px",
              }}
              playback={{
                isPlaying: playlistIsPlaying,
                variant: "rounded",
                roundedButtonSize: RoundedButtonSize.MdAdaptive,
                roundedButtonColor: RoundedButtonColor.Green,
                iconColorFill: "fill-black",
                onClick: handlePlayback,
                shadow: true,
              }}
              playbackVisibility
            />
          </div>
        </div>
        <Link
          to={`/${LINKS[type].route}/${id}`}
          className={classes.itemLink}
        />
      </article>
    )
  );
};

export default EverydayPlaylistCard;
