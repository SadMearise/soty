import { FC } from "react";
import { Button, SvgGenerator, Playback } from "..";
import { RoundedButtonColor, RoundedButtonSize } from "../RoundedButton/enums";

type AudioControlsProps = {
  isPlaying: boolean;
  onSkipForwardClick: () => void;
  onSkipBackwardClick: () => void;
  onPlaybackClick: () => void;
};

const classes = {
  wrapper: "flex justify-center items-center gap-[16px]",
  button: "group",
  hover: "fill-white/70 group-hover:fill-white group-active:fill-white/70",
};

const AudioControls: FC<AudioControlsProps> = ({
  isPlaying,
  onSkipForwardClick,
  onSkipBackwardClick,
  onPlaybackClick,
}) => {
  return (
    <div className={classes.wrapper}>
      <Button
        as="button"
        type="button"
        aria-label="previous track"
        className={classes.button}
        onClick={onSkipBackwardClick}
      >
        <SvgGenerator
          id="skipPrev"
          size="28px"
          colorFill="fill-white/70"
          className={classes.hover}
        />
      </Button>
      <Playback
        variant="rounded"
        isPlaying={isPlaying}
        roundedButtonColor={RoundedButtonColor.White}
        roundedButtonSize={RoundedButtonSize.Xsm}
        iconColorFill="fill-black"
        onClick={onPlaybackClick}
      />
      <Button
        as="button"
        type="button"
        aria-label="next track"
        className={classes.button}
        onClick={onSkipForwardClick}
      >
        <SvgGenerator
          id="skipNext"
          size="28px"
          colorFill="fill-white/70"
          className={classes.hover}
        />
      </Button>
    </div>
  );
};

export default AudioControls;
