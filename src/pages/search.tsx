import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [search] = useSearchParams();

  return <>{search.get("query")}</>;
};

export default Search;
