import { FC, ReactNode } from "react";
import { Playback } from ".";
import { RoundedButtonColor, RoundedButtonSize } from "./enums";
import { PlaybackVariant } from "./Playback/enums";

type ActionBarProps = {
  actions?: ReactNode;
  isPlaying: boolean;
  onPlaybackClick: () => void;
};

const classes = {
  wrapper: "flex items-center py-[24px]",
  playback: "mr-[32px] lg-max:mr-[24px]",
};

const ActionBar: FC<ActionBarProps> = ({ actions, isPlaying, onPlaybackClick }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.playback}>
        <Playback
          isPlaying={isPlaying}
          variant={PlaybackVariant.Rounded}
          roundedButtonSize={RoundedButtonSize.LgAdaptive}
          roundedButtonColor={RoundedButtonColor.Green}
          iconColorFill="fill-black"
          onClick={onPlaybackClick}
        />
      </div>
      {actions}
    </div>
  );
};

export default ActionBar;
