import { FC } from "react";
import withTooltip from "../hocs/withTooltip";
import { TooltipPosition } from "../utils/constants";
import useUsername from "../utils/hooks/useUsername";
import IconButton from "./IconButton";
import Tooltip from "./Tooltip";

type ProfileButtonWithTooltipProps = {
  position: TooltipPosition;
};

const ProfileButtonWithTooltip: FC<ProfileButtonWithTooltipProps> = ({ position }) => {
  const username = useUsername();

  const ProfileWithTooltip = withTooltip(() => {
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
  }, Tooltip);

  return (
    <ProfileWithTooltip
      position={position}
      tooltipText={username}
    />
  );
};

export default ProfileButtonWithTooltip;
