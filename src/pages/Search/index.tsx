import { useLocation } from "react-router-dom";
import { ERRORS, LINKS } from "../../utils/constants";
import { useTitle } from "../../utils/hooks";
import Categories from "./Categories";
import useSearchCategories from "./hooks/useSearchCategories";
import useSearchContext from "../../context/SearchContext/useSearchContext";
import { SearchLayout } from "../../layout";

const Search = () => {
  const location = useLocation();
  const {
    categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useSearchCategories(location.pathname);
  const { isError: isErrorSearchResults } = useSearchContext();
  useTitle(LINKS.search.title);

  if (isErrorCategories) {
    throw Error(ERRORS.nodata);
  }

  return (
    <SearchLayout
      isError={isErrorSearchResults}
      isLoading={isLoadingCategories}
    >
      <Categories categories={categories} />
    </SearchLayout>
  );
};

export default Search;
