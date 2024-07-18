import { FC } from "react";
import { getTrackTime } from "../utils/helpers";

type TrackDurationProps = {
  trackDurationMs: number | undefined;
};

const classes = {
  text: "min-w-[27.25px] text-[0.875rem] leading-[0.875rem] line- font-normal text-grey-100 whitespace-nowrap",
};

const TrackTime: FC<TrackDurationProps> = ({ trackDurationMs }) => (
  <span className={classes.text}>{typeof trackDurationMs === "number" ? getTrackTime(trackDurationMs) : "-:--"}</span>
);

export default TrackTime;
