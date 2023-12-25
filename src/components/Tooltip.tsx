import { FC } from "react";

type TooltipProps = {
  tooltipText: string;
};

const classes = {
  tooltip:
    "py-1 px-2 bg-dark-200 text-white text-sm whitespace-nowrap rounded shadow-[0_16px_24px_rgba(0,0,0,0.3),0_6px_8px_rgba(0,0,0,0.2)]",
};

const Tooltip: FC<TooltipProps> = ({ tooltipText }) => {
  return <span className={`${classes.tooltip}`}>{tooltipText}</span>;
};

export default Tooltip;
