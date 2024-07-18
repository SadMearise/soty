import { FC } from "react";
import { Playback, SvgGenerator } from ".";
import { PlaybackProps, SvgGeneratorProps } from "./types";

type PlaybackWithEqualizerProps = {
  isPlaying: boolean;
  equalizer: SvgGeneratorProps;
  playback: PlaybackProps;
  playbackVisibility?: boolean;
};

const PlaybackWithEqualizer: FC<PlaybackWithEqualizerProps> = ({
  isPlaying,
  equalizer,
  playback,
  playbackVisibility,
}) => {
  const classes = {
    wrapper: "flex justify-center items-center h-full",
    equalizerIcon: `${isPlaying ? "block group-hover:hidden" : "hidden"}`,
    playbackWrapper: `hidden${playbackVisibility ? " group-hover:flex" : ""}`,
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.equalizerIcon}>
        <SvgGenerator {...equalizer} />
      </div>
      <div className={classes.playbackWrapper}>
        <Playback {...playback} />
      </div>
    </div>
  );
};

export default PlaybackWithEqualizer;
