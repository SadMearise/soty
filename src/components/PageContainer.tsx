import { FC, PropsWithChildren } from "react";

const classes: Record<string, string> = {
  page: "flex flex-col h-screen",
};

const PageContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.page}>{children}</div>;
};

export default PageContainer;
