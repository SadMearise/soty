import { MouseEvent, FC } from "react";
import { FavoriteButton } from "..";
import { FavoriteButtonSize } from "../enums";
import { TooltipPosition } from "../../hocs/enums";

type TooltipInfo = {
  text: string;
  position: TooltipPosition;
};

type FavoriteActionProps = {
  isFavorite: boolean;
  onFavoriteClick: (isFavorite: boolean) => void;
  tooltip: TooltipInfo;
  iconSize: FavoriteButtonSize;
};

const FavoriteAction: FC<FavoriteActionProps> = ({ isFavorite, onFavoriteClick, tooltip, iconSize }) => {
  const handleFavoriteClick = async (event: MouseEvent<HTMLElement>, isFavorite: boolean) => {
    onFavoriteClick(!isFavorite);

    (event.target as HTMLButtonElement).blur();
  };

  return (
    <FavoriteButton
      tooltip={{ text: tooltip.text, position: tooltip.position }}
      isFavorite={isFavorite}
      onClick={(event) => handleFavoriteClick(event, isFavorite)}
      iconSize={iconSize}
    />
  );
};

export default FavoriteAction;
