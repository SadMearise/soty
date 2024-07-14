import { KeyboardEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SearchBar } from "../../../components";
import { LINKS } from "../../../utils/constants";
import useSearchContext from "../../../context/SearchContext/useSearchContext";
import { fetchSearchItem } from "../../../services";

const SearchController = () => {
  const { query } = useParams();
  const [value, setValue] = useState(decodeURIComponent(query || ""));
  const navigate = useNavigate();
  const { setSearchResults, setIsLoading, setIsError } = useSearchContext();

  const fetchSearchData = async (q: string) => {
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
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, value: string) => {
    if (event.key === "Enter") {
      setIsError(null);
      event.preventDefault();

      if (value.length > 0) {
        fetchSearchData(value);
      } else {
        setSearchResults(null);
      }
      if (value.trim()) {
        navigate(`${LINKS.search.route}/${encodeURIComponent(value)}`);
      } else {
        navigate(`${LINKS.search.route}`);
      }
    }
  };

  useEffect(() => {
    if (value.length > 0) {
      fetchSearchData(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SearchBar
      value={value}
      setValue={setValue}
      placeholder="Что хочешь включить?"
      onKeyDown={(event) => handleKeyDown(event, value)}
    />
  );
};

export default SearchController;
