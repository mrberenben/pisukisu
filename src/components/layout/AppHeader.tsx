import styles from "static/styles/components/layout/AppHeader.module.css";

// images
import { AppLogo } from "utils/config/images.config";
import Navigation from "utils/config/navigation.config";
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
    </header>
  );
}

export default AppHeader;