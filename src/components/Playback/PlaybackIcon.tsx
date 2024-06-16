import { FC } from "react";
import { SvgGenerator } from "..";

type PlaybackIconProps = {
  isPlaying: boolean;
  colorFill: string;
  size?: string;
};

const PlaybackIcon: FC<PlaybackIconProps> = ({ isPlaying, colorFill, size }) => {
  return isPlaying ? (
    <SvgGenerator
      id="pause"
      colorFill={colorFill}
      size={size}
    />
  ) : (
    <SvgGenerator
      id="play"
      colorFill={colorFill}
      size={size}
    />
  );
};

export default PlaybackIcon;
