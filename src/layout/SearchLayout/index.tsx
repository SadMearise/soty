import { FC, PropsWithChildren } from "react";
import { Container } from "../../containers";
import { Loader } from "../../components";
import NoResultsMessage from "./NoResultsMessage";

type SearchLayoutProps = {
  isError: string | null;
  isLoading: boolean;
};

const classes = {
  wrapper: "mb-[40px]",
};

const SearchLayout: FC<PropsWithChildren<SearchLayoutProps>> = ({ children, isError, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }

  return <Container>{isError ? <NoResultsMessage /> : <div className={classes.wrapper}>{children}</div>}</Container>;
};

export default SearchLayout;
