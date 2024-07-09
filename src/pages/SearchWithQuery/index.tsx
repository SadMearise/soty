import { useState, FC } from "react";
import { useParams } from "react-router-dom";
import useSearchContext from "../../context/SearchContext/useSearchContext";
import Filters from "./Filters";
import { SearchLayout } from "../../layout";
import { FilterNames } from "./enums";
import SearchContent from "./SearchContent";
import { CATEGORY_FILTERS } from "./constants";

type SearchWithQueryProps = {
  categoryName?: FilterNames;
};

const SearchWithQuery: FC<SearchWithQueryProps> = ({ categoryName }) => {
  const { query } = useParams();
  const [activeFilter, setActiveFilter] = useState<FilterNames>(categoryName || FilterNames.All);
  const { searchResults, isLoading: isLoadingSearchResults, isError: isErrorSearchResults } = useSearchContext();

  return (
    <SearchLayout
      isError={isErrorSearchResults}
      isLoading={isLoadingSearchResults}
    >
      <Filters
        filters={CATEGORY_FILTERS}
        query={query}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <SearchContent
        searchResults={searchResults}
        filter={activeFilter}
      />
    </SearchLayout>
  );
};

export default SearchWithQuery;
