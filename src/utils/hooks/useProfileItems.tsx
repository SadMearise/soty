import { useRef, useState } from "react";
import { LINKS } from "../constants";
import { ProfileMenuItem } from "../../models";
import useLogout from "./useLogout";

const useProfileItems = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const handleLogout = useLogout();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems: ProfileMenuItem[] = [
    { name: "Профиль", href: LINKS.profile.route },
    {
      name: "Выйти",
      onClick: handleLogout,
    },
  ];

  // useClickOutside(buttonRef, () => {
  //   return setIsOpen(false);
  // });

  return { menuItems, isOpen, toggleMenu, buttonRef };
};

export default useProfileItems;
