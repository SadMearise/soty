import { FC, ButtonHTMLAttributes, PropsWithChildren } from "react";

type BaseButtonProps = {
  label: string;
  styles?: string;
  action?: () => void;
};

const BaseButton: FC<PropsWithChildren<BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>>> = ({
  children,
  label,
  action,
  styles,
  ...props
}) => {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={action}
      className={styles}
      {...props}
    >
      {children}
    </button>
  );
};

export default BaseButton;
