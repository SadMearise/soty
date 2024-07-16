import { FC } from "react";
import { FavoriteAction, ArtistsList, TrackTime, PlaybackWithEqualizer } from "..";
import { PREVIEW_TRACK_DURATION_MS } from "../../utils/constants";
import useFavoriteTrack from "./useFavoriteTrack";
import { BaseArtist } from "../../models";
import { FavoriteButtonSize } from "../enums";
import { TooltipPosition } from "../../hocs/enums";

type TracklistItemProps = {
  id?: string;
  name?: string;
  imageSrc?: string;
  artists?: Partial<Pick<BaseArtist, "name" | "id">>[];
  disabled?: boolean;
  trackNumber: number;
  trackPresence: boolean;
  isPlaying: boolean;
  onPlaybackClick: () => void;
};

const TracklistItem: FC<TracklistItemProps> = ({
  id,
  name,
  imageSrc,
  artists,
  disabled,
  trackNumber,
  trackPresence,
  isPlaying,
  onPlaybackClick,
}) => {
  const { isFavorite, onFavoriteClick } = useFavoriteTrack(trackPresence, id);

  const classes = {
    row: "relative grid grid-cols-[16px_minmax(120px,_4fr)_1fr] gap-[16px] px-[16px] h-[56px] hover:bg-white/10 hover:rounded-[4px] group",
    leftCol: "flex justify-center items-center",
    equalizerIcon: `${isPlaying ? "block group-hover:hidden" : "hidden"}`,
    playbackWrapper: "hidden group-hover:flex",
    centerCol: "flex items-center",
    trackImageWrapper: "relative w-[40px] h-auto aspect-square mr-[12px]",
    trackImage: "absolute h-full w-full top-0 left-0 object-cover rounded-[4px]",
    trackDescriptionWrapper: "flex flex-col justify-center",
    rightCol: "flex justify-end items-center",
    trackTitle: `text-base font-normal ${isPlaying ? "text-green-100" : "text-white"}`,
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
              id: "equalizer",
              colorFill: "fill-green-100",
              size: "16px",
            }}
            playback={{
              isPlaying,
              variant: "default",
              colorFill: "fill-white",
              size: "20px",
              onClick: onPlaybackClick,
            }}
            playbackVisibility={!disabled}
          />
          <span className={classes.trackNumberText}>{trackNumber}</span>
        </div>
        <div className={classes.centerCol}>
          {imageSrc && (
            <div className={classes.trackImageWrapper}>
              <img
                src={imageSrc}
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
              onFavoriteClick={onFavoriteClick}
              isFavorite={isFavorite}
              tooltip={{
                text: isFavorite ? "Удалить из медиатеки" : "Добавить в медиатеку",
                position: TooltipPosition.Top,
              }}
              iconSize={FavoriteButtonSize.Sm}
            />
          </div>
          <TrackTime trackDurationMs={PREVIEW_TRACK_DURATION_MS} />
        </div>
      </div>
    )
  );
};

export default TracklistItem;
