import styles from "static/styles/components/pages/home/Banner.module.css";

// context
import { AppActions } from "context/AppActions";
import { useAppDispatch } from "context/AppContext";

// types
import { ISerie } from "types/serie";

// config
import { Series } from "utils/config/series.config";

const Banner = () => {
  const dispatch = useAppDispatch();

  const handleSelectSerie = (serie: ISerie) => {
    dispatch({
      type: AppActions.SET_ACTIVE_SERIE,
      payload: serie
    });
    dispatch({ type: AppActions.SET_SERIE_MODAL, payload: true });
  };

  return (
    <div className={styles.banner}>
      <article
        className={`${styles.anime_poster} ${styles.anime_poster_first}`}
        onClick={() => handleSelectSerie(Series[0])}
      >
        <img src={Series[0].sources.poster} alt={Series[0].name} />
      </article>
      <article
        className={`${styles.anime_poster} ${styles.anime_poster_second}`}
        onClick={() => handleSelectSerie(Series[0])}
      >
        <img src={Series[0].sources.poster} alt={Series[0].name} />
      </article>
      <article
        className={`${styles.anime_poster} ${styles.anime_poster_third}`}
        onClick={() => handleSelectSerie(Series[0])}
      >
        <img src={Series[0].sources.poster} alt={Series[0].name} />
      </article>
      <article
        className={`${styles.anime_poster} ${styles.anime_poster_fourth}`}
        onClick={() => handleSelectSerie(Series[0])}
      >
        <img src={Series[0].sources.poster} alt={Series[0].name} />
      </article>
      <article
        className={`${styles.anime_poster} ${styles.anime_poster_fifth}`}
        onClick={() => handleSelectSerie(Series[0])}
      >
        <img src={Series[0].sources.poster} alt={Series[0].name} />
      </article>
    </div>
  );
};

export default Banner;
