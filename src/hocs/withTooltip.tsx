import { ComponentType, useLayoutEffect, useRef, useState, useCallback, FC } from "react";
import { TooltipPosition } from "../utils/constants";

type WithTooltipProps = {
  position: TooltipPosition;
};

const classes = {
  wrapper: "relative text-[0px]",
  body: "absolute z-50",
  "tooltip-position-top": "bottom-full left-1/2 translate-x-[-50%] mb-2",
  "tooltip-position-bottom": "top-full left-1/2 translate-x-[-50%] mt-2",
  "tooltip-position-left": "right-full top-1/2 translate-y-[-50%] mr-2",
  "tooltip-position-right": "left-full top-1/2 translate-y-[-50%] ml-2",
};

const withTooltip = <P extends object, U extends object>(
  WrappedComponent: ComponentType<P>,
  TooltipComponent: ComponentType<U>
): FC<P & U & WithTooltipProps> => {
  return ({ position, ...props }) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

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
        <div
          className={`${classes.body} ${getTooltipPositionStyles()}`}
          ref={ref}
        >
          {isTooltipVisible && <TooltipComponent {...(props as U)} />}
        </div>
        <WrappedComponent {...(props as P)} />
      </div>
    );
  };
};

export default withTooltip;
