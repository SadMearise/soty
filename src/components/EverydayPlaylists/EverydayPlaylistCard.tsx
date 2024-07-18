import { FC } from "react";
import { Link } from "react-router-dom";
import { PlaybackWithEqualizer } from "..";
import { getAudioplayerTracksInfo } from "../../services";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { playback, setTracksInfo } from "../../store/features/audioplayer/audioplayerSlice";
import { selectIsPlaying, selectPlayingPlaylistId } from "../../store/features/audioplayer/audioplayerSelectors";
import { AudioplayerTrackInfo } from "../../types";
import { LINKS } from "../../utils/constants";
import { MusicType, Severity, TracklistType } from "../../types/enums";
import { useAlert } from "../../utils/hooks";
import { RoundedButtonColor, RoundedButtonSize } from "../enums";

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
    item: "relative flex rounded-[4px] bg-white/[.07] transition-colors hover:bg-white/[.2] items-center group",
    itemLink: "absolute w-full h-full top-0 left-0",
    leftCol: "relative h-full aspect-square",
    leftColImage: "block absolute h-full w-full top-0 left-0 object-cover",
    centerCol: "flex flex-auto items-center px-[16px] overflow-hidden",
    centerColText: "text-white text-sm font-bold truncate xl-min:text-base",
    rightColWrapper: "w-12 h-12 2xl-max:w-9 2xl-max:h-9 mr-[16px]",
  };

  const handlePlayback = async () => {
    if (!id) return;

    const tracksInfo: AudioplayerTrackInfo[] = await getAudioplayerTracksInfo({ as: MusicType.Tracklist, type, id });

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
        <div className={classes.leftCol}>
          <img
            src={imageUrl}
            className={classes.leftColImage}
          />
        </div>
        <div className={classes.centerCol}>
          <span className={classes.centerColText}>{name}</span>
        </div>
        <div className={classes.rightColWrapper}>
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
        <Link
          to={`/${LINKS[type].route}/${id}`}
          className={classes.itemLink}
        />
      </article>
    )
  );
};

export default EverydayPlaylistCard;
