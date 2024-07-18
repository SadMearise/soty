import { FC } from "react";

type TooltipProps = {
  tooltipText: string;
};

const classes = {
  tooltip: "py-1 px-2 bg-dark-200 text-white text-sm whitespace-nowrap rounded-[4px] shadow-primary",
};

const Tooltip: FC<TooltipProps> = ({ tooltipText }) => <span className={`${classes.tooltip}`}>{tooltipText}</span>;

export default Tooltip;
