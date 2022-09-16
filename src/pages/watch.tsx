import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "static/styles/pages/watch.module.css";

// context
import { PlayerProvider } from "context/PlayerContext";

// components
import WatchPreloader from "components/pages/watch/WatchPreloader";
import WatchError from "components/pages/watch/WatchError";
import Player from "components/pages/watch/Player";

// types
import { IEpisode } from "types/episode";

// config
import { Episodes } from "utils/config/series.config";

// assets
import { Splash } from "utils/config/images.config";

type EpisodeInitalState = {
  data: IEpisode | null;
  loading: boolean;
  error: boolean;
};

const Watch = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState<EpisodeInitalState>({
    data: null,
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
        data: null,
        loading: false,
        error: true
      });

      return;
    }

    const data = Episodes.find(ep => ep.id === id);

    if (!data) {
      setTimeout(() => {
        setEpisode({
          data: null,
          loading: false,
          error: true
        });
      }, 1500);

      return;
    }

    setEpisode({
      data,
      loading: false,
      error: false
    });
  }, [id]);

  if (episode.loading) return <WatchPreloader />;
  if (episode.error || !episode.data) return <WatchError />;

  return (
    <PlayerProvider>
      <Player episode={episode.data} />
    </PlayerProvider>
  );
};

export default Watch;
