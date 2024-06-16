import { FC } from "react";
import { NavLink } from "react-router-dom";
import { NavigationItem } from "./types";

type NavigationProps = {
  navigationItems: NavigationItem[];
};

const classes = {
  navItem: "mb-2 last:mb-0",
  navLink: "flex items-center gap-5 py-2 font-bold text-base text-grey-100 hover:text-white [&>svg]:hover:fill-white",
  navActiveLink: "[&>svg]:fill-white text-white",
};

const Navigation: FC<NavigationProps> = ({ navigationItems }) => {
  return (
    <nav>
      <ul>
        {navigationItems.map((item) => (
          <li
            key={item.name}
            className={classes.navItem}
          >
            <NavLink
              to={item.route}
              className={({ isActive }) => (isActive ? `${classes.navLink} ${classes.navActiveLink}` : classes.navLink)}
            >
              {item.icon}
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
