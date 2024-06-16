import { FC } from "react";
import ProfileItem from "./ProfileItem";
import { ProfileMenuItem } from "./types";

type ProfileListProps = {
  menuItems: ProfileMenuItem[];
};

const classes = {
  navigation:
    "absolute right-0 mt-3 max-w-[350px] min-w-[160px] p-1 shadow-primary bg-dark-200 whitespace-nowrap rounded overflow-auto z-20",
  list: "flex flex-col [&>*:last-child]:border-t-[1px] [&>*:last-child]:border-white/10",
};

const ProfileList: FC<ProfileListProps> = ({ menuItems }) => (
  <nav className={classes.navigation}>
    <ul className={classes.list}>
      {menuItems.map(({ href, name, onClick }) => (
        <ProfileItem
          href={href}
          name={name}
          onClick={onClick}
          key={name}
        />
      ))}
    </ul>
  </nav>
);

export default ProfileList;
