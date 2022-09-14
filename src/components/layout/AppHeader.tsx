import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "static/styles/components/layout/AppHeader.module.css";

// config
import { AppLogo } from "utils/config/images.config";
import Navigation from "utils/config/navigation.config";
import { SearchIcon } from "utils/config/icons.config";

// hooks
import isActiveRoute from "utils/helpers/ActiveRoute";
import useDebounce from "utils/hooks/useDebounce";
import useIsFirstRender from "utils/hooks/useIsFirstRender";
import Container from "components/layout/Container";

const AppHeader = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDebounced = useDebounce(searchQuery);
  const isFirstRender = useIsFirstRender();
  const [search] = useSearchParams();

  useEffect(() => {
    if (!isFirstRender) {
      if (searchQueryDebounced) {
        navigate(`/search?query=${searchQueryDebounced}`);
      } else {
        navigate(`/`);
      }
    }
  }, [searchQueryDebounced]);

  return (
    <header className={styles.app_header}>
      <Container>
        <div className={styles.header_wrapper}>
          <div className={styles.app_logo}>
            <img src={AppLogo} alt="Pisukisu" />
          </div>

          <ul className={styles.app_navigation}>
            {Navigation.map(nav => (
              <li key={nav.id}>
                <a
                  href={nav.path}
                  className={isActiveRoute(nav.path) ? styles.route_active : undefined}
                >
                  {nav.name}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.app_search}>
            <input
              type="text"
              placeholder="Search anime, genre, actor"
              defaultValue={searchQuery || search.get("query") || ""}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <SearchIcon />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default AppHeader;
