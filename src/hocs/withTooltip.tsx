import { ComponentType, useLayoutEffect, useRef, useState, useCallback } from "react";
import { TooltipPosition } from "../utils/constants";

type WithTooltipProps = {
  tooltipText: string;
  position: TooltipPosition;
};

const classes = {
  wrapper: "relative",
  tooltip:
    "absolute py-1 px-2 bg-dark-200 text-white text-sm whitespace-nowrap rounded shadow-[0_16px_24px_rgba(0,0,0,0.3),0_6px_8px_rgba(0,0,0,0.2)]",
  "tooltip-position-top": "bottom-full left-1/2 translate-x-[-50%] mb-2",
  "tooltip-position-bottom": "top-full left-1/2 translate-x-[-50%] mt-2",
  "tooltip-position-left": "right-full top-1/2 translate-y-[-50%] mr-2",
  "tooltip-position-right": "left-full top-1/2 translate-y-[-50%] ml-2",
};

const withTooltip = (WrappedComponent: ComponentType) => {
  return ({ tooltipText, position }: WithTooltipProps) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const ref = useRef<HTMLElement>(null);

    const handleMouseEnter = () => {
      setTooltipVisible(true);
    };

    const handleMouseLeave = () => {
      setTooltipVisible(false);
    };

    const getTooltipPositionStyles = () => {
      switch (position) {
        case TooltipPosition.Top:
          return classes["tooltip-position-top"];
        case TooltipPosition.Bottom:
          return classes["tooltip-position-bottom"];
        case TooltipPosition.Left:
          return classes["tooltip-position-left"];
        case TooltipPosition.Right:
          return classes["tooltip-position-right"];
        default: {
          return "";
        }
      }
    };

    const changeTooltipPosition = useCallback(() => {
      if (!ref.current) return;

      const indent = 8;
      const { left, right } = ref.current.getBoundingClientRect();
      const { innerWidth } = window;

      if (position === TooltipPosition.Top || position === TooltipPosition.Bottom) {
        if (left < indent) {
          const leftBorder = `translate(calc(-50% - ${left - indent}px))`;

          ref.current.style.transform = leftBorder;
        } else if (innerWidth - right < indent) {
          const rightBorder = `translate(calc(-50% - ${right - innerWidth + indent}px))`;

          ref.current.style.transform = rightBorder;
        }
      }
    }, [position]);

    useLayoutEffect(() => {
      changeTooltipPosition();
    }, [changeTooltipPosition, isTooltipVisible]);

    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classes.wrapper}
      >
        {isTooltipVisible && (
          <span
            ref={ref}
            className={`${classes.tooltip} ${getTooltipPositionStyles()}`}
          >
            {tooltipText}
          </span>
        )}
        <WrappedComponent />
      </div>
    );
  };
};

export default withTooltip;
