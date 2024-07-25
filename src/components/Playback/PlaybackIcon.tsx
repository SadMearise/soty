import React, { FC } from "react";
import { SvgGenerator, Tooltip } from "..";
import { withTooltip } from "../../hocs";
import { TooltipPosition } from "../../hocs/enums";

type PlaybackIconProps = {
  isPlaying: boolean;
  colorFill: string;
  size?: string;
};

const PlaybackIcon: FC<PlaybackIconProps> = ({ isPlaying, colorFill, size }) => {
  const pauseIcon = () => (
    <SvgGenerator
      id="pause"
      colorFill={colorFill}
      size={size}
    />
  );

  const playIcon = () => (
    <SvgGenerator
      id="play"
      colorFill={colorFill}
      size={size}
    />
  );

  const PauseIconWithTooltip = withTooltip(pauseIcon, Tooltip);
  const PlayIconWithTooltip = withTooltip(playIcon, Tooltip);

  return isPlaying ? (
    <PauseIconWithTooltip
      tooltipText="Пауза"
      position={TooltipPosition.Top}
    />
  ) : (
    <PlayIconWithTooltip
      tooltipText="Слушать"
      position={TooltipPosition.Top}
    />
  );
};

export default React.memo(PlaybackIcon);
