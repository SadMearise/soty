import { FC, PropsWithChildren } from "react";

const classes: Record<string, string> = {
  container: "max-w-[1955px] px-[24px]",
};

const PageContainer: FC<PropsWithChildren> = ({ children }) => <div className={classes.container}>{children}</div>;

export default PageContainer;
