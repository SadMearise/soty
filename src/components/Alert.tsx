import { FC, useEffect } from "react";
import { Button, SvgGenerator } from ".";
import { Severity } from "../types/enums";

type AlertProps = {
  message: string;
  showError: boolean;
  severity: Severity;
  setShowError: (newState: boolean) => void;
};

const colors = {
  success: "bg-green-100",
  warning: "bg-orange",
  error: "bg-red",
  info: "bg-blue",
};

const Alert: FC<AlertProps> = ({ message, showError, severity, setShowError }) => {
  const classes = {
    wrapper: `flex min-w-[300px] rounded py-[6px] px-[16px] ${colors[severity]}`,
    severityIcon: "mr-[8px]",
    text: "font-medium text-base text-white pr-[8px] truncate",
    closeButton: "ml-auto",
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [setShowError, showError]);

  return (
    showError && (
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
          onClick={() => setShowError(false)}
        >
          <SvgGenerator
            id="close"
            size="22px"
            colorFill="fill-white"
          />
        </Button>
      </div>
    )
  );
};

export default Alert;
