import { FC, MouseEvent, useState } from "react";
import { Tooltip, Button } from "..";
import { withTooltip } from "../../hocs";
import { FavoriteButtonSize } from "./enums";
import { TooltipPosition } from "../../hocs/enums";

type TooltipInfo = {
  text: string;
  position: TooltipPosition;
};

type FavoriteProps = {
  isFavorite: boolean;
  onClick: (event: MouseEvent<HTMLElement>) => void | Promise<void> | (() => void);
  tooltip: TooltipInfo;
  iconSize: FavoriteButtonSize;
};

const sizes = {
  sm: "w-4 h-4",
  mdAdaptive: "w-8 h-8 lg-max:w-6 lg-max:h-6",
};

const FavoriteButton: FC<FavoriteProps> = ({ isFavorite, onClick, tooltip, iconSize }) => {
  const [animation, setAnimation] = useState(false);

  const classes = {
    button: `hover:scale-default ${!isFavorite && "group/icon"} ${!isFavorite && animation && "animate-shake"}`,
    iconStroke: `transition-colors duration-300 ${
      isFavorite ? "stroke-green-100" : "stroke-grey-100 group-hover/icon:stroke-white"
    }`,
    iconFill: `${isFavorite ? "fill-green-100" : "fill-none"}`,
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    onClick(event);

    setAnimation(true);

    setTimeout(() => setAnimation(false), 600);
  };

  const FavoriteIconWithTooltip = withTooltip(
    () => (
      <Button
        as="button"
        aria-label="favorite"
        type="button"
        className={classes.button}
        onClick={handleClick}
      >
        <svg
          id="heartIcon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`${sizes[iconSize]}`}
        >
          <path
            id="heartOutline"
            fill="none"
            strokeWidth="2"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            className={classes.iconStroke}
          />
          <path
            id="heartFill"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            className={classes.iconFill}
          />
        </svg>
      </Button>
    ),
    Tooltip
  );

  return (
    <FavoriteIconWithTooltip
      tooltipText={tooltip.text}
      position={tooltip.position}
    />
  );
};

export default FavoriteButton;
