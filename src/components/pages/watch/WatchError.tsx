import styles from "static/styles/components/pages/watch/WatchError.module.css";

// config
import { AppLogo } from "utils/config/images.config";

const WatchError = () => {
  return (
    <div className={styles.error}>
      <a href="/" className={styles.logo}>
        <img src={AppLogo} alt="logo" />
      </a>
      <span className={styles.background} />
      <h1 className={styles.glitch} data-text="Not Found">
        Not Found
      </h1>
      <p>This content may have been deleted, modified or even never existed.</p>
      <a href="/" role="button" className={styles.return}>
        Return Home
      </a>
    </div>
  );
};

export default WatchError;
