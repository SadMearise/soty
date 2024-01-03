import { FC, PropsWithChildren } from "react";

const classes = {
  list: "flex flex-col [&>*:last-child]:border-t-[1px] [&>*:last-child]:border-white/10",
};

const ProfileList: FC<PropsWithChildren> = ({ children }) => {
  return <ul className={classes.list}>{children}</ul>;
};

export default ProfileList;
