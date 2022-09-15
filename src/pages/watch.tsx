import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "static/styles/pages/watch.module.css";

// components
import WatchPreloader from "components/pages/watch/WatchPreloader";
import WatchError from "components/pages/watch/WatchError";

// types
import { IEpisode } from "types/episode";

// config
import { Episodes } from "utils/config/series.config";

type EpisodeInitalState = {
  episode: IEpisode | null;
  loading: boolean;
  error: boolean;
};

const Watch = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState<EpisodeInitalState>({
    episode: null,
    loading: false,
    error: false
  });

  useEffect(() => {
    setEpisode(state => ({
      ...state,
      loading: true
    }));

    if (!id) {
      setEpisode({
        episode: null,
        loading: false,
        error: true
      });

      return;
    }

    const data = Episodes.find(ep => ep.id === id);

    if (!data) {
      setTimeout(() => {
        setEpisode({
          episode: null,
          loading: false,
          error: true
        });
      }, 1500);

      return;
    }

    setEpisode({
      episode: data,
      loading: false,
      error: false
    });
  }, [id]);

  if (episode.loading) return <WatchPreloader />;
  if (episode.error) return <WatchError />;

  return <div className={styles.watch}></div>;
};

export default Watch;
