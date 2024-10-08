import { FC } from "react";
import { getAlbumDuration, getDeclension } from "../utils/helpers";
import { DefaultTrackImage } from ".";

type ReleaseInfo = {
  imageUrl?: string;
  name: string;
  releaseDate?: string;
  totalTracks: number;
};

type OwnerInfo = {
  imageUrl?: string;
  name?: string;
};

type ReleaseCoverProps = {
  typeText: string;
  tracksDurationMs: number;
  release: ReleaseInfo;
  owner: OwnerInfo;
};

const classes = {
  wrapper: "flex gap-[24px] mb-[24px] xmd-max:flex-col",
  cover:
    "relative max-w-[232px] min-w-[64px] w-full h-full mt-auto aspect-square shadow-quaternary duration-100 ease-in hover:scale-default",
  coverImg: "block absolute h-full w-full top-0 left-0 object-cover rounded-[4px]",
  rightSide: "flex flex-col justify-end space-y-[8px] > * + *",
  text: "text-sm font-normal truncate",
  releaseDuration: "text-white/70",
  title: "text-[2rem] font-black xmd-min:text-[3rem] lg-min:text-[3.75rem]",
  releaseInfoBlock: "flex items-center",
  ownerInfoBlock: "flex items-center gap-[4px]",
  separator: "before:content-['•'] before:font-normal before:text-sm before:mx-[4px]",
  ownerImageWrapper: "relative h-[24px] w-[24px]",
  ownerImage: "block absolute h-full w-full top-0 left-0 object-cover rounded-full",
  ownerName: "text-sm font-bold",
};

const ReleaseCover: FC<ReleaseCoverProps> = ({ typeText, tracksDurationMs, release, owner }) => (
  <div className={classes.wrapper}>
    <div className={classes.cover}>
      {release.imageUrl ? (
        <img
          src={release.imageUrl}
          alt="release cover"
          className={classes.coverImg}
        />
      ) : (
        <DefaultTrackImage iconSize="32px" />
      )}
    </div>
    <div className={classes.rightSide}>
      <span className={classes.text}>{typeText}</span>
      <h1 className={classes.title}>{release.name}</h1>
      <div className={classes.releaseInfoBlock}>
        <div className={classes.ownerInfoBlock}>
          <div className={classes.ownerImageWrapper}>
            {owner.imageUrl && (
              <img
                src={owner.imageUrl}
                alt={owner.name}
                className={classes.ownerImage}
              />
            )}
          </div>
          <span className={classes.ownerName}>{owner.name || "Unknown owner"}</span>
        </div>
        {release.releaseDate && (
          <span className={`${classes.text} ${classes.separator}`}>{release.releaseDate.slice(0, 4)}</span>
        )}
        <span className={`${classes.text} ${classes.separator}`}>
          {getDeclension(release.totalTracks, ["трек", "трека", "треков"])},&nbsp;
        </span>
        <span className={`${classes.text} ${classes.releaseDuration}`}>{getAlbumDuration(tracksDurationMs)}</span>
      </div>
    </div>
  </div>
);

export default ReleaseCover;
