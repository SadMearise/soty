import { FC, PropsWithChildren } from "react";

const classes = {
  list: "grid gap-[8px] auto-rows-[48px] grid-rows-[48px] grid-cols-1 xmd-min:grid-cols-2 lg-min:grid-cols-3 xl-min:gap-[12px] xl-min:auto-rows-[64px] xl-min:grid-rows-[64px] 2xl-min:auto-rows-[80px] 2xl-min:grid-rows-[80px]",
};

const PlaylistList: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.list}>{children}</div>;
};

export default PlaylistList;
