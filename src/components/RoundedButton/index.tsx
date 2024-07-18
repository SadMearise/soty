import { FC, PropsWithChildren } from "react";
import { RoundedButtonColor, RoundedButtonSize } from "./enums";
import { Button } from "..";
import { AnchorProps, ButtonProps } from "../types";

type RoundedButtonProps = {
  size: RoundedButtonSize;
  color: RoundedButtonColor;
  styles?: string;
  hover?: boolean;
  shadow?: boolean;
} & (AnchorProps | (ButtonProps & { disabled?: boolean }));

const sizes = {
  sm: {
    round: "w-8 h-8",
    children: "[&>*]:w-4 [&>*]:h-4",
  },
  xsm: {
    round: "w-8 h-8",
    children: "[&>*]:w-6 [&>*]:h-6",
  },
  md: {
    round: "w-10 h-10",
    children: "[&>*]:w-4 [&>*]:h-4",
  },
  xmd: {
    round: "w-12 h-12",
    children: "[&>*]:w-8 [&>*]:h-8",
  },
  mdAdaptive: {
    round: "w-12 h-12 2xl-max:w-9 2xl-max:h-9",
    children: "[&>*]:w-8 [&>*]:h-8 [&>*]:2xl-max:w-6 [&>*]:2xl-max:h-6",
  },
  lgAdaptive: {
    round: "w-14 h-14 lg-max:w-12 lg-max:h-12",
    children: "[&>*]:w-8 [&>*]:h-8",
  },
};

const colors = {
  green: "bg-green-100",
  grey: "bg-grey-300",
  white: "bg-white",
  "black/70": "bg-black/70",
  dark400: "bg-dark-400",
};

const RoundedButton: FC<PropsWithChildren<RoundedButtonProps>> = ({
  children,
  size,
  color,
  styles,
  hover,
  shadow,
  ...props
}) => {
  const classes = {
    button: `flex items-center justify-center relative z-10 rounded-full text-sm cursor-pointer ${colors[color]} ${sizes[size].round}`,
    children: `[&>*]:absolute [&>*]:left-1/2 [&>*]:top-1/2 [&>*]:translate-x-[-50%] [&>*]:translate-y-[-50%] [&>*]:text-transparent ${sizes[size].children}`,
    disabled: "disabled:cursor-not-allowed disabled:opacity-60",
    hover: `${hover ? " hover:scale-default" : ""}`,
    shadow: `${shadow ? " shadow-secondary" : ""}`,
  };

  return (
    <Button
      className={`${classes.button} ${styles || ""} ${classes.children} ${classes.disabled}${classes.hover}${
        classes.shadow
      }`}
      {...(props.as === "link" ? (props as AnchorProps) : (props as ButtonProps))}
    >
      {children}
    </Button>
  );
};

export default RoundedButton;
