import styles from "static/styles/components/pages/home/Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={`${styles.anime_poster} ${styles.anime_poster_first}`}>first anime</div>
      <div className={`${styles.anime_poster} ${styles.anime_poster_second}`}>second anime</div>
      <div className={`${styles.anime_poster} ${styles.anime_poster_third}`}>third anime</div>
      <div className={`${styles.anime_poster} ${styles.anime_poster_fourth}`}>fourth anime</div>
      <div className={`${styles.anime_poster} ${styles.anime_poster_fifth}`}>fifth anime</div>
      <div className={`${styles.anime_poster} ${styles.anime_poster_sixth}`}>sixth anime</div>
      <div className={`${styles.anime_poster} ${styles.anime_poster_seventh}`}>seventh anime</div>
      <div className={`${styles.anime_poster} ${styles.anime_poster_eighth}`}>eighth anime</div>
    </div>
  );
};

export default Banner;
