import { FC, PropsWithChildren, cloneElement, ReactElement } from "react";

type CircleIconProps = {
  size: "sm" | "md" | "mdAdaptive";
  color: "green" | "grey";
};

const classes = {
  circle: "block relative z-10 rounded-full hover:scale-[1.04] shadow-secondary",
  icon: "absolute left-1/2 top-1/2 translate-x-[-45%] translate-y-[-50%] text-transparent",
  triangle:
    "after:absolute after:left-1/2 after:top-1/2 after:translate-x-[-40%] after:translate-y-[-50%] after:text-transparent after:border-solid after:border-l-black after:border-l-[15px] after:border-y-transparent after:border-y-[9px] after:border-r-0",
};

const sizes = {
  sm: {
    circle: "w-9 h-9",
    icon: "",
  },
  md: {
    circle: "w-12 h-12",
    icon: "w-8 h-8",
  },
  mdAdaptive: {
    circle: "w-12 h-12 2xl-max:w-9 2xl-max:h-9",
    icon: "w-8 h-8 2xl-max:w-6 2xl-max:h-6",
  },
};

const colors = {
  green: "bg-green",
  grey: "bg-grey-300",
};

const CircleIcon: FC<PropsWithChildren<CircleIconProps>> = ({ children, size, color }) => {
  const circleStyles = `${classes.circle} ${colors[color]} ${sizes[size].circle}`;
  const iconStyles = `${classes.icon} ${sizes[size].icon}`;

  return <span className={circleStyles}>{cloneElement(children as ReactElement, { className: iconStyles })}</span>;
};

export default CircleIcon;
