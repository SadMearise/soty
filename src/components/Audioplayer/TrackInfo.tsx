import React, { FC } from "react";
import { DefaultTrackImage, FavoriteAction, ArtistsList } from "..";
import { AudioplayerTrackInfo } from "../../types";
import { FavoriteButtonSize } from "../enums";
import { TooltipPosition } from "../../hocs/enums";

type TrackInfoProps = Pick<AudioplayerTrackInfo, "image" | "name" | "artists"> & {
  isFavorite: boolean;
  onFavoriteClick: (isFavorite: boolean) => void;
};

const classes = {
  imageWrapper: "relative h-[52px] aspect-square mr-[8px]",
  image: "block absolute h-full w-full top-0 left-0 object-cover",
  trackInfoWrapper: "flex flex-col mx-[8px] overflow-hidden",
  trackName: "text-sm text-white truncate",
  favoriteIcon: "p-[8px]",
};

const TrackInfo: FC<TrackInfoProps> = ({ image, name, artists, isFavorite, onFavoriteClick }) => {
  return (
    <>
      <div className={classes.imageWrapper}>
        {image ? (
          <img
            src={image}
            alt="album cover"
            className={classes.image}
          />
        ) : (
          <DefaultTrackImage iconSize="20px" />
        )}
      </div>
      <div className={classes.trackInfoWrapper}>
        <span className={classes.trackName}>{name}</span>
        <ArtistsList artists={artists} />
      </div>
      <div className={classes.favoriteIcon}>
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
    </>
  );
};

export default React.memo(TrackInfo);
