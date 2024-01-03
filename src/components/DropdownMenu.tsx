import { FC, ReactNode, RefObject } from "react";
import ProfileList from "./ProfileList";
import ProfileItem from "./ProfileItem";
import { ProfileMenuItem } from "../models";

type DropdownMenuProps = {
  buttonElement: ReactNode;
  menuItems: ProfileMenuItem[];
  isOpen: boolean;
  toggleMenu: () => void;
  buttonRef: RefObject<HTMLDivElement>;
};

const classes = {
  wrapper: "relative",
  navigation:
    "absolute right-0 mt-3 max-w-[350px] min-w-[160px] p-1 shadow-default bg-dark-200 whitespace-nowrap rounded overflow-auto",
};

const DropdownMenu: FC<DropdownMenuProps> = ({ buttonElement, menuItems, isOpen, toggleMenu, buttonRef }) => {
  return (
    <div className={classes.wrapper}>
      <div
        onClick={toggleMenu}
        ref={buttonRef}
      >
        {buttonElement}
      </div>
      {isOpen && (
        <nav className={classes.navigation}>
          <ProfileList>
            {menuItems.map(({ href, name, onClick }) => {
              return (
                <ProfileItem
                  href={href}
                  name={name}
                  onClick={onClick}
                  key={name}
                />
              );
            })}
          </ProfileList>
        </nav>
      )}
    </div>
  );
};

export default DropdownMenu;
