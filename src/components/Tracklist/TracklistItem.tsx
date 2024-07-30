import { FC } from "react";
import { FavoriteAction, ArtistsList, TrackTime, PlaybackWithEqualizer } from "..";
import { PREVIEW_TRACK_DURATION_MS } from "../../utils/constants";
import useFavoriteTrack from "./useFavoriteTrack";
import { FavoriteButtonSize } from "../enums";
import { TooltipPosition } from "../../hocs/enums";
import { PlaybackVariant } from "../Playback/enums";
import { SvgGeneratorId } from "../../types/enums";
import { AudioplayerTrackInfo } from "../../types";

type TracklistItemProps = {
  disabled?: boolean;
  trackNumber: number;
  isPlaying: boolean;
  onPlaybackClick: () => void;
} & AudioplayerTrackInfo;

const TracklistItem: FC<TracklistItemProps> = ({
  id,
  name,
  durationMs,
  image,
  artists,
  disabled,
  trackNumber,
  presence,
  isPlaying,
  onPlaybackClick,
}) => {
  const { isFavorite, handleFavoriteClick } = useFavoriteTrack({ id, name, durationMs, image, artists }, presence);

  const trackDurationMs = durationMs && durationMs < PREVIEW_TRACK_DURATION_MS ? durationMs : PREVIEW_TRACK_DURATION_MS;

  const classes = {
    row: "relative grid grid-cols-[16px_minmax(120px,_4fr)_1fr] gap-[16px] px-[16px] h-[56px] hover:bg-white/10 hover:rounded-[4px] group",
    leftCol: "flex justify-center items-center",
    equalizerIcon: `${isPlaying ? "block group-hover:hidden" : "hidden"}`,
    playbackWrapper: "hidden group-hover:flex",
    centerCol: "flex items-center",
    trackImageWrapper: "relative w-[40px] h-auto aspect-square mr-[12px] shrink-0",
    trackImage: "absolute h-full w-full top-0 left-0 object-cover rounded-[4px]",
    trackDescriptionWrapper: "flex flex-col justify-center overflow-hidden",
    rightCol: "flex justify-end items-center",
    trackTitle: `text-base font-normal truncate ${isPlaying ? "text-green-100" : "text-white"}`,
    trackNumberText: `text-base font-normal ${isPlaying ? "hidden" : "text-grey-100"} ${
      !disabled ? "group-hover:hidden" : ""
    } `,
    favoriteIconWrapper: "flex items-center mr-[32px] opacity-0 group-hover:opacity-100",
    disabled: "opacity-40",
  };

  return (
    id &&
    artists && (
      <div className={classes.row}>
        <div className={`${classes.leftCol}${disabled ? ` ${classes.disabled}` : ""}`}>
          <PlaybackWithEqualizer
            isPlaying={isPlaying}
            equalizer={{
              id: SvgGeneratorId.Equalizer,
              colorFill: "fill-green-100",
              size: "16px",
            }}
            playback={{
              isPlaying,
              variant: PlaybackVariant.Default,
              colorFill: "fill-white",
              size: "20px",
              onClick: onPlaybackClick,
            }}
            playbackVisibility={!disabled}
          />
          <span className={classes.trackNumberText}>{trackNumber}</span>
        </div>
        <div className={classes.centerCol}>
          {image && (
            <div className={classes.trackImageWrapper}>
              <img
                src={image}
                className={classes.trackImage}
              />
            </div>
          )}
          <div className={`${classes.trackDescriptionWrapper}${disabled ? ` ${classes.disabled}` : ""}`}>
            <span className={classes.trackTitle}>{name || "-"}</span>
            <ArtistsList artists={artists} />
          </div>
        </div>
        <div className={`${classes.rightCol}${disabled ? ` ${classes.disabled}` : ""}`}>
          <div className={classes.favoriteIconWrapper}>
            <FavoriteAction
              onFavoriteClick={handleFavoriteClick}
              isFavorite={isFavorite}
              tooltip={{
                text: isFavorite ? "Удалить из медиатеки" : "Добавить в медиатеку",
                position: TooltipPosition.Top,
              }}
              iconSize={FavoriteButtonSize.Sm}
            />
          </div>
          <TrackTime trackDurationMs={trackDurationMs} />
        </div>
      </div>
    )
  );
};

export default TracklistItem;
