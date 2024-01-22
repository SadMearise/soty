import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import CircleIcon from "../CircleIcon";
import SvgGenerator from "../SvgGenerator";
import { Image, PlaylistItem } from "../../models";

type FrontPlaylistItemProps = Pick<PlaylistItem, "name"> & Pick<Image, "url">;

const classes = {
  item: "relative flex rounded bg-white/[.07] overflow-hidden transition-colors hover:bg-white/[.2] group",
  itemLink: "absolute w-full h-full top-0 left-0",
  leftSide: "relative h-full aspect-square",
  leftSideImage: "block absolute h-full w-full top-0 left-0 object-cover",
  rightSide: "flex flex-auto justify-between items-center mx-[16px] overflow-hidden",
  rightSidePlaybackButton: "hidden group-hover:inline-block",
  rightSideText: "text-white text-sm font-bold truncate xl-min:text-base",
};

const PlaylistCard: FC<FrontPlaylistItemProps> = ({ name, url }) => {
  return (
    <div className={classes.item}>
      <div className={classes.leftSide}>
        <img
          src={url}
          className={classes.leftSideImage}
        />
      </div>
      <div className={classes.rightSide}>
        <span className={classes.rightSideText}>{name}</span>
        <Button
          as="button"
          aria-label="play"
          type="button"
          className={classes.rightSidePlaybackButton}
        >
          <CircleIcon
            size="mdAdaptive"
            color="green"
          >
            <SvgGenerator id="play" />
          </CircleIcon>
        </Button>
      </div>
      <Link
        to="/"
        className={classes.itemLink}
      />
    </div>
  );
};

export default PlaylistCard;
