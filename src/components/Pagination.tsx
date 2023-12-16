import { FC, ReactNode } from "react";

type PaginationProps = {
  nextButton: ReactNode;
  prevButton: ReactNode;
};

const classes: Record<string, string> = {
  wrapper: "flex gap-2",
};

const Pagination: FC<PaginationProps> = ({ nextButton, prevButton }) => {
  return (
    <div className={classes.wrapper}>
      {prevButton}
      {nextButton}
    </div>
  );
};

export default Pagination;
