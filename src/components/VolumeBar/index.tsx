import React, { useEffect, useState, ChangeEvent, FC, RefObject } from "react";
import { Button, RangeSlider, Tooltip } from "..";
import { getLocalStorage, setLocalStorage } from "../../utils/helpers";
import { LOCAL_STORAGE_KEYS } from "../../utils/constants";
import { DEFAULT_VOLUME } from "./constants";
import { withTooltip } from "../../hocs";
import { TooltipPosition } from "../../hocs/enums";

type VolumeBarProps = {
  audioplayer: RefObject<HTMLAudioElement>;
};

const classes = {
  wrapper: "flex items-center w-[125px] group",
  volumeButton: "flex items-center justify-center w-[32px] h-[32px] flex-[1_0_32px]",
  volumeImage: "fill-grey-100 w-[20px] h-[20px] group-hover:fill-white",
};

const VolumeBar: FC<VolumeBarProps> = ({ audioplayer }) => {
  const [volume, setVolume] = useState(Number(getLocalStorage(LOCAL_STORAGE_KEYS.volume)) || DEFAULT_VOLUME);

  const setMuted = () => {
    setVolume((prev) => (prev ? 0 : Number(getLocalStorage(LOCAL_STORAGE_KEYS.volume)) || DEFAULT_VOLUME));
  };

  const changeVolume = (event: ChangeEvent<HTMLInputElement>) => {
    const newVolume = +event.target.value;

    setLocalStorage(LOCAL_STORAGE_KEYS.volume, `${newVolume}`);
    setVolume(newVolume);
  };

  const onVolumeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 -960 960 960"
      width="20"
      className={classes.volumeImage}
    >
      <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
    </svg>
  );

  const offVolumeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 -960 960 960"
      width="20"
      className={classes.volumeImage}
    >
      <path d="m616-320-56-56 104-104-104-104 56-56 104 104 104-104 56 56-104 104 104 104-56 56-104-104-104 104Zm-496-40v-240h160l200-200v640L280-360H120Zm280-246-86 86H200v80h114l86 86v-252ZM300-480Z" />
    </svg>
  );

  const OnVolumeIconWithTooltip = withTooltip(onVolumeIcon, Tooltip);
  const OffVolumeIconWithTooltip = withTooltip(offVolumeIcon, Tooltip);

  useEffect(() => {
    if (audioplayer.current) {
      audioplayer.current.volume = volume;
    }
  }, [audioplayer, volume]);

  return (
    <div className={classes.wrapper}>
      <Button
        as="button"
        type="button"
        aria-label="mute"
        styles={classes.volumeButton}
        onClick={setMuted}
      >
        {volume ? (
          <OnVolumeIconWithTooltip
            tooltipText="Выключить звук"
            position={TooltipPosition.Top}
          />
        ) : (
          <OffVolumeIconWithTooltip
            tooltipText="Включить звук"
            position={TooltipPosition.Top}
          />
        )}
      </Button>
      <RangeSlider
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={changeVolume}
      />
    </div>
  );
};

export default React.memo(VolumeBar);
