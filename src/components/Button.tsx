/* eslint-disable react/button-has-type */
import React, { FC, PropsWithChildren } from "react";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "link";
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as: "button";
  type: "submit" | "reset" | "button";
  "aria-label": string;
};

type ButtonOrLinkProps = {
  onClick?: () => void;
  styles?: string;
} & (AnchorProps | ButtonProps);

const Button: FC<PropsWithChildren<ButtonOrLinkProps>> = ({ children, onClick, styles, ...props }) => {
  if (props.as === "link") {
    return (
      <a
        className={styles}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      className={styles}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
