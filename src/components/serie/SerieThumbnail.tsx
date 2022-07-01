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
    dispatch({ type: AppActions.SET_ACTIVE_SERIE, payload: serie });
  };

  return (
    <article className={styles.serie} onClick={() => handleSelectSerie()}>
      {serie.name}
    </article>
  );
};

export default SerieThumbnail;
