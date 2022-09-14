import styles from "static/styles/components/serie/SerieThumnail.module.css";

// interface
import { ISerie } from "types/serie";

// context
import { useAppDispatch } from "context/AppContext";
import { AppActions } from "context/AppActions";

type Props = {
  serie: ISerie;
};

const SerieThumbnail = ({ serie }: Props) => {
  const dispatch = useAppDispatch();

  const handleSelectSerie = () => {
    dispatch({
      type: AppActions.SET_ACTIVE_SERIE,
      payload: serie
    });
    dispatch({ type: AppActions.SET_SERIE_MODAL, payload: true });
  };

  return (
    <article className={styles.serie} onClick={() => handleSelectSerie()}>
      <img src={serie.sources.thumbnail} alt={serie.name} className={styles.serie_image} />
      <p className={styles.serie_name}>{serie.name}</p>
    </article>
  );
};

export default SerieThumbnail;
