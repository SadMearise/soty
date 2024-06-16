import { FC, ReactNode, useState, useRef, PropsWithChildren } from "react";
import { useClickOutside } from "../utils/hooks";

type DropdownMenuProps = {
  buttonElement: ReactNode;
};

const classes = {
  wrapper: "relative",
};

const DropdownMenu: FC<PropsWithChildren<DropdownMenuProps>> = ({ children, buttonElement }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useClickOutside(buttonRef, () => setIsOpen(false));

  return (
    <div className={classes.wrapper}>
      <div
        onClick={toggleMenu}
        ref={buttonRef}
      >
        {buttonElement}
      </div>
      {isOpen && children}
    </div>
  );
};

export default DropdownMenu;
