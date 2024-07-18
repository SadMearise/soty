import { useContext } from "react";
import { SearchContext } from ".";

const useSearchContext = () => {
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error("searchContext must be inside a SearchContextProvider");
  }

  return searchContext;
};

export default useSearchContext;
