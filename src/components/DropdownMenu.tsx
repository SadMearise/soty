import { FC, ReactNode, useState, useRef } from "react";
import ProfileList from "./ProfileList";
import ProfileItem from "./ProfileItem";
import { ProfileMenuItem } from "../models";
import useClickOutside from "../utils/hooks/useClickOutside";

type DropdownMenuProps = {
  buttonElement: ReactNode;
  menuItems: ProfileMenuItem[];
};

const classes = {
  wrapper: "relative",
  navigation:
    "absolute right-0 mt-3 max-w-[350px] min-w-[160px] p-1 shadow-default bg-dark-200 whitespace-nowrap rounded overflow-auto",
};

const DropdownMenu: FC<DropdownMenuProps> = ({ buttonElement, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useClickOutside(buttonRef, () => {
    return setIsOpen(false);
  });

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
