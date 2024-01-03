import { FC } from "react";
import withTooltip from "../hocs/withTooltip";
import { TooltipPosition } from "../utils/constants";
import IconButton from "./IconButton";
import Tooltip from "./Tooltip";
import { User } from "../models";

type ProfileButtonWithTooltipProps = {
  position: TooltipPosition;
  username: User["display_name"];
};

const ProfileButtonWithTooltip: FC<ProfileButtonWithTooltipProps> = ({ position, username }) => {
  const profileIcon = () => {
    return (
      <IconButton
        label="profile"
        action={() => {
          console.log("profile open");
        }}
      >
        {username[0]}
      </IconButton>
    );
  };

  const ProfileWithTooltip = withTooltip(profileIcon, Tooltip);

  return (
    <ProfileWithTooltip
      position={position}
      tooltipText={username}
    />
  );
};

export default ProfileButtonWithTooltip;
