import { FC, PropsWithChildren } from "react";

const classes: Record<string, string> = {
  container: "w-full h-full p-2",
};

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default Container;
