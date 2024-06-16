import { FC } from "react";

type CopyrightProps = {
  text: string;
};

const classes = {
  copyright: "text-[0.688rem] text-grey-400 font-normal",
};

const Copyright: FC<CopyrightProps> = ({ text }) => <span className={classes.copyright}>{text}</span>;

export default Copyright;
