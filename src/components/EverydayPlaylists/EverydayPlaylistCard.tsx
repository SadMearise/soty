import { FC } from "react";
import { Link } from "react-router-dom";
import { PlaybackWithEqualizer } from "..";
import { useAppSelector } from "../../store/hooks";
import { selectIsPlaying, selectPlayingPlaylistId } from "../../store/features/audioplayer/audioplayerSelectors";
import { LINKS } from "../../utils/constants";
import { MusicType, Severity, SvgGeneratorId, TracklistType } from "../../types/enums";
import { useAlert, useHandlePlayback } from "../../utils/hooks";
import { RoundedButtonColor, RoundedButtonSize } from "../enums";
import { PlaybackVariant } from "../Playback/enums";

type EverydayPlaylistProps = {
  type: TracklistType;
  imageUrl: string;
  name: string;
  id?: string;
};

const EverydayPlaylistCard: FC<EverydayPlaylistProps> = ({ type, id, imageUrl, name }) => {
  const handlePlayback = useHandlePlayback();
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

  const handlePlaybackClick = async () => {
    const errorMessage = "The Playlist cannot be played";

    if (!id) {
      displayCustomAlert(Severity.Error, errorMessage);

      return;
    }

    handlePlayback({ as: MusicType.Tracklist, type, id }, { playingPlaylistId: id }, errorMessage);
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
              id: SvgGeneratorId.Equalizer,
              colorFill: "fill-green-100",
              size: "16px",
            }}
            playback={{
              isPlaying: playlistIsPlaying,
              variant: PlaybackVariant.Rounded,
              roundedButtonSize: RoundedButtonSize.MdAdaptive,
              roundedButtonColor: RoundedButtonColor.Green,
              iconColorFill: "fill-black",
              onClick: handlePlaybackClick,
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
