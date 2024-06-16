import { FC, PropsWithChildren } from "react";

type BlockContainerProps = {
  styles?: string;
};

const classes: Record<string, string> = {
  block: "bg-dark-100 rounded-lg",
};

const BlockContainer: FC<PropsWithChildren<BlockContainerProps>> = ({ styles, children }) => (
  <div className={`${classes.block} ${styles || ""}`}>{children}</div>
);

export default BlockContainer;
