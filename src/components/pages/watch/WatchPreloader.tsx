import styles from "static/styles/components/pages/watch/WatchPreloader.module.css";

// config
import { AppLogo } from "utils/config/images.config";

const WatchPreloader = () => {
  return (
    <div className={styles.preloader}>
      <img src={AppLogo} alt="Loading..." />
      <span className={styles.loader} />
    </div>
  );
};

export default WatchPreloader;
