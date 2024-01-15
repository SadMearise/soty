import { FC, PropsWithChildren } from "react";
import Button from "./Button";

type IconButtonProps = {
  label: string;
  action?: () => void;
  disabled?: boolean;
};

const classes: Record<string, string> = {
  button: "relative w-8 h-8 bg-black/70 rounded-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60",
  icon: "absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-4 h-auto fill-white text-sm",
};

const IconButton: FC<PropsWithChildren<IconButtonProps>> = ({ children, action, label, disabled }) => {
  return (
    <Button
      as="button"
      type="button"
      aria-label={label}
      onClick={action}
      className={classes.button}
      disabled={disabled}
    >
      <span className={classes.icon}>{children}</span>
    </Button>
  );
};

export default IconButton;
