import { FC } from "react";
import { RoundedButton, SvgGenerator } from "..";
import { RoundedButtonColor, RoundedButtonSize } from "../RoundedButton/enums";

type TransitionButtonProps = {
  onClick: () => void;
  isDisabled: boolean;
  label: string;
  svgId: string;
};

const TransitionButton: FC<TransitionButtonProps> = ({ onClick, isDisabled, label, svgId }) => (
  <RoundedButton
    as="button"
    type="button"
    aria-label={label}
    onClick={onClick}
    disabled={isDisabled}
    size={RoundedButtonSize.Sm}
    color={RoundedButtonColor.Black70}
  >
    <SvgGenerator
      id={svgId}
      size="16px"
    />
  </RoundedButton>
);

export default TransitionButton;
