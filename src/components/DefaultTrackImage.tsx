import { FC } from "react";
import { SvgGenerator } from ".";
import { SvgGeneratorId } from "../types/enums";

type DefaultTrackImageProps = {
  iconSize: string;
};

const classes = {
  imageWrapper: "absolute h-full w-full top-0 left-0 bg-dark-200",
  icon: "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]",
};

const DefaultTrackImage: FC<DefaultTrackImageProps> = ({ iconSize }) => {
  return (
    <div className={classes.imageWrapper}>
      <SvgGenerator
        id={SvgGeneratorId.MusicNote}
        colorFill="fill-grey-400"
        size={iconSize}
        className={classes.icon}
      />
    </div>
  );
};

export default DefaultTrackImage;
