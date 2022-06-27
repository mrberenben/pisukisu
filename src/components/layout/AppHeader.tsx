import styles from "static/styles/components/layout/AppHeader.module.css";

// config
import { AppLogo } from "utils/config/images.config";
import Navigation from "utils/config/navigation.config";

// hooks
import isActiveRoute from "utils/helpers/ActiveRoute";

const AppHeader = () => {
  return (
    <header className={styles.app_header}>
      <div className={styles.app_logo}>
        <img src={AppLogo} alt="Pisukisu" />
      </div>

      <ul className={styles.app_navigation}>
        { Navigation.map(nav => (
          <li key={nav.id}>
            <a href={nav.path} className={isActiveRoute(nav.path) ? styles.route_active : undefined}>{nav.name}</a>
          </li>
        )) }
      </ul>

      <div className={styles.app_search}>
        <input type="text" placeholder="Search anime, genre, actor" />
      </div>
    </header>
  );
}

export default AppHeader;