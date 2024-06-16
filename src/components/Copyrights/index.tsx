import { FC } from "react";
import Copyright from "./Copyright";
import { Copyright as CopyrightModel } from "../../models";

type CopyrightsProps = {
  releaseDate: string;
  copyrights: Partial<CopyrightModel>[];
};

const classes = {
  wrapper: "flex flex-col mb-[48px]",
  releaseDate: "text-sm text-grey-400 font-normal",
  copyright: "text-[0.688rem] text-grey-400 font-normal",
};

const Copyrights: FC<CopyrightsProps> = ({ releaseDate, copyrights }) => (
  <div className={classes.wrapper}>
    <span className={classes.releaseDate}>{releaseDate}</span>

    {copyrights.map((copyright, index) => (
      <Copyright
        text={copyright.text || ""}
        key={index}
      />
    ))}
  </div>
);

export default Copyrights;
