import React, { FC } from "react";
import { Link } from "react-router-dom";
import DefaultTrackImage from "./DefaultTrackImage";

type MediaLibraryItemProps = {
  subtitle: string;
  link: string;
  imageSrc?: string;
  title?: string;
};

const classes = {
  item: "relative flex items-center gap-[12px] p-[8px] rounded-[4px] bg-transparent transition-colors hover:bg-dark-600 active:bg-black",
  itemLink: "absolute w-full h-full top-0 left-0",
  leftSide: "relative w-[48px] h-full aspect-square shrink-0",
  leftSideImage: "block absolute h-full w-full top-0 left-0 object-cover rounded-[4px]",
  rightSide: "flex flex-col overflow-hidden",
  rightSideTitle: "text-white text-base font-normal truncate",
  rightSideSubitle: "text-sm text-grey-100 font-normal truncate",
};

const MediaLibraryItem: FC<MediaLibraryItemProps> = ({ imageSrc, title, subtitle, link }) => {
  return (
    <article className={classes.item}>
      <div className={classes.leftSide}>
        {imageSrc ? (
          <img
            src={imageSrc}
            className={classes.leftSideImage}
          />
        ) : (
          <DefaultTrackImage iconSize="48px" />
        )}
      </div>
      <div className={classes.rightSide}>
        <span className={classes.rightSideTitle}>{title || "unknown"}</span>
        <span className={classes.rightSideSubitle}>{subtitle}</span>
      </div>
      <Link
        to={link}
        className={classes.itemLink}
      />
    </article>
  );
};

export default React.memo(MediaLibraryItem);
