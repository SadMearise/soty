import { LINKS } from "../utils/constants";
import { useTitle } from "../utils/hooks";

const Search = () => {
  useTitle(LINKS.search.title);

  return <div>Search</div>;
};

export default Search;
