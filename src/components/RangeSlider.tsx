import { FC, ChangeEvent } from "react";

type RangeSliderProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const RangeSlider: FC<RangeSliderProps> = ({ min, max, step, value, onChange }) => {
  const classes = {
    slider: "relative h-[4px] w-full group",
    remainingTrack: "absolute h-[4px] w-full rounded-full bg-white/30",
    progressBar: "absolute h-[4px] bg-white rounded-full top-0 group-hover:bg-green-200",
    input: "absolute w-full appearance-none bg-transparent h-[4px] rounded-full",
    thumb:
      "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:h-[12px] [&::-webkit-slider-thumb]:w-[12px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:opacity-0 group-hover:[&::-webkit-slider-thumb]:opacity-100",
    track:
      "[&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:border-0 [&::-webkit-slider-runnable-track]:bg-transparent",
  };

  return (
    <div className={classes.slider}>
      <div className={classes.remainingTrack} />
      <div
        style={{ width: `${(value * 100) / max}%` }}
        className={classes.progressBar}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        value={value}
        className={`${classes.input} ${classes.thumb} ${classes.track}`}
      />
    </div>
  );
};

export default RangeSlider;
