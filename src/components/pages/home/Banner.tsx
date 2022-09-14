import styles from "static/styles/components/pages/home/Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={`${styles.anime_poster} ${styles.anime_poster_first}`}></div>
      <div className={`${styles.anime_poster} ${styles.anime_poster_second}`}></div>
      <div className={`${styles.anime_poster} ${styles.anime_poster_third}`}></div>
      <div className={`${styles.anime_poster} ${styles.anime_poster_fourth}`}></div>
      <div className={`${styles.anime_poster} ${styles.anime_poster_fifth}`}></div>
      <div className={`${styles.anime_poster} ${styles.anime_poster_sixth}`}></div>
      <div className={`${styles.anime_poster} ${styles.anime_poster_seventh}`}></div>
      <div className={`${styles.anime_poster} ${styles.anime_poster_eighth}`}></div>
    </div>
  );
};

export default Banner;
