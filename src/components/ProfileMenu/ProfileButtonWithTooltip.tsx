import { FC } from "react";
import { withTooltip } from "../../hocs";
import { RoundedButton, Tooltip } from "..";
import { TooltipPosition } from "../../hocs/withTooltip/enums";
import { RoundedButtonColor, RoundedButtonSize } from "../RoundedButton/enums";

type ProfileButtonWithTooltipProps = {
  position: TooltipPosition;
  username: string;
};

const ProfileButtonWithTooltip: FC<ProfileButtonWithTooltipProps> = ({ position, username }) => {
  const profileButton = () => (
    <RoundedButton
      as="button"
      type="button"
      aria-label="profile"
      size={RoundedButtonSize.Sm}
      color={RoundedButtonColor.Black70}
      hover
    >
      {username}
    </RoundedButton>
  );

  const ProfileWithTooltip = withTooltip(profileButton, Tooltip);

  return username ? (
    <ProfileWithTooltip
      position={position}
      tooltipText={username}
    />
  ) : (
    profileButton()
  );
};

export default ProfileButtonWithTooltip;
