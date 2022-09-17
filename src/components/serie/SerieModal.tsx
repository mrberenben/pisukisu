import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "static/styles/components/serie/SerieModal.module.css";

// third party libraries
import { CSSTransition } from "react-transition-group";

// utils
import { SerieModalClassNames } from "utils/config/styles.config";

// context
import { useAppState, useAppDispatch } from "context/AppContext";
import { AppActions } from "context/AppActions";

// icons
import { CloseIcon, PlayIcon } from "utils/config/icons.config";

const SerieModal = () => {
  const { serieModal, activeSerie } = useAppState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (serieModal) {
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 350);
    }
  }, [serieModal]);

  const handleClose = useCallback(() => {
    dispatch({ type: AppActions.SET_SERIE_MODAL, payload: false });

    setTimeout(() => {
      dispatch({ type: AppActions.SET_ACTIVE_SERIE, payload: null });
    }, 700);
  }, [activeSerie]);

  const handlePlay = useCallback(() => {
    if (activeSerie?.episodes !== undefined && activeSerie?.episodes.length > 0) {
      navigate(`/watch/${activeSerie?.episodes[0].id}`);
    }
  }, [activeSerie]);

  return (
    <CSSTransition
      in={serieModal}
      timeout={700}
      unmountOnExit
      classNames={SerieModalClassNames(styles)}
    >
      <div className={styles.serie_modal_wrapper}>
        <span className={styles.serie_modal_backdrop} onClick={handleClose} />
        <div role="dialog" className={styles.serie_modal} tabIndex={1}>
          <header className={styles.serie_modal_header}>
            <div className={styles.serie_modal_storyart} onClick={handlePlay}>
              <img src={activeSerie?.sources.image} alt={activeSerie?.name} />
              <span className={styles.serie_modal_storyart_backdrop} />
            </div>
            <button type="button" className={styles.serie_modal_close} onClick={handleClose}>
              <CloseIcon />
            </button>
          </header>
          <main className={styles.serie_modal_body}>
            <div className={styles.serie_modal_metadata}>
              <h6>{activeSerie?.name}</h6>
              <p>{activeSerie?.description}</p>
              <div className={styles.serie_modal_metadata_rest}>
                <ul className={styles.serie_modal_genres}>
                  {activeSerie?.genres.slice(0, 3).map((genre, i) => (
                    <li key={i}>{genre}</li>
                  ))}
                </ul>
                <span>~{activeSerie?.duration_avg}min.</span>
              </div>
            </div>
            <div className={styles.serie_modal_play}>
              {activeSerie?.episodes.length ? (
                <a
                  role="button"
                  href={`/watch/${activeSerie?.episodes[0].id}`}
                  className={styles.serie_modal_play_button}
                >
                  <span>
                    <PlayIcon />
                  </span>
                  Play
                </a>
              ) : null}
            </div>

            <div className={styles.serie_modal_episodes}>
              <h6>Episodes</h6>

              <ul>
                {activeSerie?.episodes.length ? (
                  activeSerie?.episodes.map((episode, i) => (
                    <li key={i} title={episode.description}>
                      <a href={`/watch/${episode.id}`} className={styles.serie_modal_episode}>
                        <div className={styles.serie_modal_episode_thumbnail}>
                          <img src={episode.image} alt={episode.name} />
                          <span className={styles.serie_modal_episode_shadow} />
                        </div>

                        <div className={styles.serie_modal_episode_info}>
                          <div className={styles.episode_title}>
                            <h6>{episode.name}</h6>
                            <span>{(episode.duration / 60).toFixed(0)}min.</span>
                          </div>
                          <p>{episode.description}</p>
                        </div>
                      </a>
                    </li>
                  ))
                ) : (
                  <span className={styles.serie_modal_no_episodes}>No episodes yet.</span>
                )}
              </ul>
            </div>
          </main>
        </div>
      </div>
    </CSSTransition>
  );
};

export default SerieModal;
