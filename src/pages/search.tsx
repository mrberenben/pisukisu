import { useSearchParams } from "react-router-dom";
import styles from "static/styles/pages/search.module.css";

// components
import Container from "components/layout/Container";
import { Series } from "utils/config/series.config";
import SerieThumbnail from "components/serie/SerieThumbnail";

const Search = () => {
  const [search] = useSearchParams();

  return (
    <Container>
      <div className={styles.search_wrapper}>
        <h4>
          Search results for <span>{search.get("query")}</span>.
        </h4>

        <div className={styles.search_grid}>
          {Series.filter(serie =>
            serie.name.toLowerCase().includes(search.get("query")?.toLowerCase() || "")
          ).map(serie => (
            <SerieThumbnail key={serie.id} serie={serie} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Search;
