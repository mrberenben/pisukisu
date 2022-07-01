import { useEffect } from "react";
import styles from "static/styles/components/serie/SerieModal.module.css";

// third party libraries
import { CSSTransition } from "react-transition-group";

// ts types
import { ISerie } from "types/serie";

// utils
import { SerieModalClassNames } from "utils/config/styles.config";

// context
import { useAppState, useAppDispatch } from "context/AppContext";
import { AppActions } from "context/AppActions";

const SerieModal = () => {
  const { activeSerie } = useAppState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeSerie) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeSerie]);

  const handleClose = () => {
    dispatch({ type: AppActions.SET_ACTIVE_SERIE, payload: null });
  };

  return (
    <CSSTransition
      in={activeSerie !== null}
      timeout={700}
      unmountOnExit
      classNames={SerieModalClassNames(styles)}
    >
      <div className={styles.serie_modal_wrapper}>
        <span className={styles.serie_modal_backdrop} onClick={() => handleClose()} />
        <div role="dialog" className={styles.serie_modal} tabIndex={1}></div>
      </div>
    </CSSTransition>
  );
};

export default SerieModal;
