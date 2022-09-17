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
  const [nextEpisodeId, setNextEpisodeId] = useState<string | null>(null);

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

    setTimeout(() => {
      setEpisode({
        data,
        loading: false,
        error: false
      });
    }, 1500);
  }, [id]);

  useEffect(() => {
    if (episode.data) {
      const episode_id = +episode.data.index;
      const next_episode = Episodes.find(ep => ep.index === episode_id + 1);

      if (next_episode) {
        console.log(next_episode);
        setNextEpisodeId(next_episode.id);
      }
    }
  }, [episode.data]);

  if (episode.loading) return <WatchPreloader />;
  if (episode.error || !episode.data) return <WatchError />;

  return (
    <PlayerProvider>
      <Player episode={episode.data} nextEpisode={nextEpisodeId} />
    </PlayerProvider>
  );
};

export default Watch;
