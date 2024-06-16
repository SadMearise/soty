import { DropdownMenu } from "..";
import ProfileButtonWithTooltip from "./ProfileButtonWithTooltip";
import { useCurrentUser, useLogout } from "../../utils/hooks";
import ProfileList from "./ProfileList";
import { TooltipPosition } from "../../hocs/withTooltip/enums";
import { ProfileMenuItem } from "./types";

const ProfileMenu = () => {
  const { user, isLoading: isLoadingUser } = useCurrentUser();
  const handleLogout = useLogout();
  const menuItems: ProfileMenuItem[] = [
    {
      name: "Выйти",
      onClick: handleLogout,
    },
  ];

  return (
    !isLoadingUser && (
      <DropdownMenu
        buttonElement={
          <ProfileButtonWithTooltip
            position={TooltipPosition.Bottom}
            username={user?.display_name ? user?.display_name[0] : "Hi"}
          />
        }
      >
        <ProfileList menuItems={menuItems} />
      </DropdownMenu>
    )
  );
};

export default ProfileMenu;
