/* eslint-disable react/button-has-type */
import React, { FC, MouseEvent, PropsWithChildren } from "react";

export type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "link";
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as: "button";
  type: "submit" | "reset" | "button";
  "aria-label": string;
  onClick?: (event: MouseEvent<HTMLElement>) => void | Promise<void> | (() => void);
};

type ButtonOrLinkProps = {
  styles?: string;
} & (AnchorProps | ButtonProps);

const Button: FC<PropsWithChildren<ButtonOrLinkProps>> = ({ children, styles, ...props }) => {
  if (props.as === "link") {
    return (
      <a
        className={styles}
        {...(props as AnchorProps)}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      className={styles}
      {...(props as ButtonProps)}
    >
      {children}
    </button>
  );
};

export default Button;
