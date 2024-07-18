import { FC, ChangeEvent } from "react";
import { RangeSlider, TrackTime } from "..";

type TrackDurationBarProps = {
  trackDuration: number;
  currentTrackTime: number;
  changeSeek: (event: ChangeEvent<HTMLInputElement>) => void;
};

const classes = {
  wrapper: "flex items-center gap-[8px]",
};

const TrackDurationBar: FC<TrackDurationBarProps> = ({ trackDuration, currentTrackTime, changeSeek }) => {
  return (
    <div className={classes.wrapper}>
      <TrackTime trackDurationMs={currentTrackTime} />
      <RangeSlider
        min={0}
        max={trackDuration}
        step={1}
        value={currentTrackTime}
        onChange={changeSeek}
      />
      <TrackTime trackDurationMs={trackDuration} />
    </div>
  );
};

export default TrackDurationBar;
