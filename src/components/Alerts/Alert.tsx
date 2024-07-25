import { FC } from "react";
import { Button, SvgGenerator } from "..";
import { Severity } from "../../types/enums";

type AlertProps = {
  message: string;
  severity: Severity;
  onClose: () => void;
};

const colors = {
  success: "bg-green-200",
  warning: "bg-orange",
  error: "bg-red",
  info: "bg-blue",
};

const Alert: FC<AlertProps> = ({ message, severity, onClose }) => {
  const classes = {
    wrapper: `flex min-w-[300px] rounded py-[6px] px-[16px] ${colors[severity]}`,
    severityIcon: "mr-[8px]",
    text: "font-medium text-base text-white pr-[8px] truncate",
    closeButton: "ml-auto",
  };

  return (
    <div className={classes.wrapper}>
      <SvgGenerator
        id={severity}
        size="22px"
        colorFill="fill-white"
        className={classes.severityIcon}
      />
      <span className={classes.text}>{message}</span>
      <Button
        as="button"
        type="button"
        aria-label="close"
        styles={classes.closeButton}
        onClick={onClose}
      >
        <SvgGenerator
          id="close"
          size="22px"
          colorFill="fill-white"
        />
      </Button>
    </div>
  );
};

export default Alert;
