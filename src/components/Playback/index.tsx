import { FC } from "react";
import { Button, RoundedButton } from "..";
import PlaybackIcon from "./PlaybackIcon";
import { RoundedButtonColor, RoundedButtonSize } from "../enums";

type DefaultProps = {
  variant: "default";
  colorFill: string;
  size: string;
};

type RoundedProps = {
  variant: "rounded";
  roundedButtonColor: RoundedButtonColor;
  roundedButtonSize: RoundedButtonSize;
  iconColorFill: string;
  shadow?: boolean;
};

export type PlaybackProps = {
  isPlaying: boolean;
  onClick?: () => void;
} & (DefaultProps | RoundedProps);

const Playback: FC<PlaybackProps> = ({ isPlaying, onClick, ...props }) => {
  if (props.variant === "rounded") {
    return (
      <RoundedButton
        as="button"
        type="button"
        aria-label="playback"
        size={props.roundedButtonSize}
        color={props.roundedButtonColor}
        onClick={onClick}
        shadow
        hover
      >
        <PlaybackIcon
          isPlaying={isPlaying}
          colorFill={props.iconColorFill}
        />
      </RoundedButton>
    );
  }

  return (
    <Button
      as="button"
      aria-label="playback"
      type="button"
      onClick={onClick}
    >
      <PlaybackIcon
        isPlaying={isPlaying}
        colorFill={props.colorFill}
        size={props.size}
      />
    </Button>
  );
};

export default Playback;
