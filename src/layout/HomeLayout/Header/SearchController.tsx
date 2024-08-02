import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SearchBar } from "../../../components";
import { LINKS } from "../../../utils/constants";
import useSearchContext from "../../../context/SearchContext/useSearchContext";
import { fetchSearchItem } from "../../../services";
import { useDebounce } from "../../../utils/hooks";

const SearchController = () => {
  const { query } = useParams();
  const [value, setValue] = useState(decodeURIComponent(query || ""));
  const debouncedValue = useDebounce(value, 400);
  const navigate = useNavigate();
  const { setSearchResults, setIsLoading, setIsError } = useSearchContext();

  const fetchSearchData = useCallback(
    async (q: string) => {
      try {
        setIsLoading(true);
        const response = await fetchSearchItem({ q, type: ["album", "playlist"] });

        setSearchResults(response);
      } catch (err) {
        if (err instanceof Error) {
          setIsError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setIsError, setIsLoading, setSearchResults]
  );

  const handleSearch = useCallback(
    (searchValue: string) => {
      setIsError(null);

      if (searchValue.length > 0) {
        fetchSearchData(searchValue);
      } else {
        setSearchResults(null);
      }
      if (searchValue.trim()) {
        navigate(`${LINKS.search.route}/${encodeURIComponent(searchValue)}`);
      } else {
        navigate(`${LINKS.search.route}`);
      }
    },
    [fetchSearchData, navigate, setIsError, setSearchResults]
  );

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    handleSearch(debouncedValue);
  }, [debouncedValue, handleSearch]);

  return (
    <SearchBar
      value={value}
      onChangeInput={handleChangeInput}
      onClickResetButton={() => setValue("")}
      placeholder="Что хочешь включить?"
    />
  );
};

export default SearchController;
