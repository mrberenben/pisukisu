import React, { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "static/styles/components/pages/watch/Player.module.css";

// components
import ControlButton from "components/pages/watch/ControlButton";

// types
import { IEpisode } from "types/episode";

// context
import { AppActions } from "context/AppActions";
import { usePlayerDispatch, usePlayerState } from "context/PlayerContext";

// utils
import { formatDuration } from "utils";
import {
  ArrowLeftIcon,
  BookActiveIcon,
  BookIcon,
  FastForwardIcon,
  MaximizeIcon,
  MinimizeIcon,
  PauseIcon,
  PlayIcon,
  RotateCCWIcon,
  RotateCWIcon,
  Volume1Icon,
  Volume2Icon,
  VolumeXIcon
} from "utils/config/icons.config";

// hooks
import useEventListener from "utils/hooks/useEventListener";

type PlayerProps = {
  episode: IEpisode;
};

const Player = ({ episode }: PlayerProps) => {
  const navigate = useNavigate();
  const player = usePlayerState();
  const dispatch = usePlayerDispatch();
  const Video = useRef<HTMLVideoElement>(null);
  const PlayerContainer = useRef<HTMLDivElement>(null);
  const Timeline = useRef<HTMLDivElement>(null);
  const Document = useRef<Document>(document);
  let scrubbing = false,
    paused: boolean | null = null;

  // initiliaze player, TODO: unmount player
  useEffect(() => {
    if (Video.current && !player.mounted) {
      dispatch({ type: AppActions.TOGGLE_MOUNT_PLAYER, payload: true });
    }
  }, [player.mounted, Video.current]);

  // debug player context
  useEffect(() => {
    console.log(`\x1b[45mplayer updated: `, player);
  }, [player]);

  // event listener functions (video)
  const onMetadataLoaded = () =>
    dispatch({ type: AppActions.SET_DURATION, payload: Video.current?.duration });
  const onPlaying = () => dispatch({ type: AppActions.TOGGLE_PLAY_VIDEO, payload: true });
  const onPaused = () => dispatch({ type: AppActions.TOGGLE_PLAY_VIDEO, payload: false });
  const onTimeUpdate = () =>
    dispatch({ type: AppActions.SET_PROGRESS, payload: Video.current?.currentTime });

  // event listener functions (timeline)
  const handleTimelineUpdate = (e: MouseEvent) => {
    if (Timeline.current) {
      const rect = Timeline.current.getBoundingClientRect();
      const progress = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

      Timeline.current.style.setProperty("--preview-position", `${progress}`);

      if (scrubbing) {
        // e.preventDefault();
        Timeline.current.style.setProperty("--progress-position", `${progress}`);
      }
    }
  };

  const toggleScrubbing = (e: MouseEvent) => {
    if (Timeline.current && Video.current) {
      const rect = Timeline.current.getBoundingClientRect();
      const progress = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

      scrubbing = (e.buttons & 1) === 1;

      if (scrubbing) {
        paused = Video.current.paused;
        Video.current.pause();
        // Video.current.currentTime = progress * Video.current.duration;
      } else {
        Video.current.currentTime = progress * Video.current.duration;
        if (!paused) Video.current.play();
      }

      handleTimelineUpdate(e);
    }
  };

  const onVolumeChange = () => {
    if (Video.current) {
      dispatch({ type: AppActions.SET_VOLUME, payload: Video.current.volume });
      dispatch({
        type: AppActions.TOGGLE_MUTE,
        payload: Video.current.muted || Video.current.volume === 0
      });
    }
  };

  const handleVolumeScrubber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Video.current) {
      Video.current.volume = +e.target.value;
      Video.current.muted = +e.target.value === 0;

      const min: number = +e.target.min;
      const max: number = +e.target.max;
      const val: number = +e.target.value;

      e.target.style.backgroundSize = `${((val - min) * 100) / (max - min)}% 100%`;
    }
  };

  // setup listeners (video)
  useEventListener("loadeddata", onMetadataLoaded, Video);
  useEventListener("playing", onPlaying, Video);
  useEventListener("pause", onPaused, Video);
  useEventListener("ended", onPaused, Video);
  useEventListener("timeupdate", onTimeUpdate, Video);
  useEventListener("volumechange", onVolumeChange, Video);

  // setup listeners (timeline)
  useEventListener("mousemove", handleTimelineUpdate, Timeline);
  useEventListener("mousedown", toggleScrubbing, Timeline);
  useEventListener("mouseup", e => scrubbing && toggleScrubbing(e), Document);
  useEventListener("mousemove", e => scrubbing && handleTimelineUpdate(e), Document);

  // handle timeupdate
  useEffect(() => {
    if (Timeline.current) {
      const percent = player.progress / player.duration || 0;
      Timeline.current.style.setProperty("--progress-position", `${percent}`);
    }
  }, [player.progress]);

  // play/pause video
  const handlePlayPause = useCallback(() => {
    if (Video.current) {
      if (player.playing) {
        Video.current.pause();
        dispatch({ type: AppActions.TOGGLE_PLAY_VIDEO, payload: false });
      } else {
        Video.current.play();
        dispatch({ type: AppActions.TOGGLE_PLAY_VIDEO, payload: true });
      }
    }
  }, [player.playing]);

  // toggle fullscreen
  const handleToggleFullscreen = useCallback(() => {
    if (PlayerContainer.current) {
      if (document.fullscreenElement == null) {
        PlayerContainer.current.requestFullscreen();
        dispatch({ type: AppActions.TOGGLE_FULLSCREEN, payload: true });
      } else {
        document.exitFullscreen();
        dispatch({ type: AppActions.TOGGLE_FULLSCREEN, payload: false });
      }
    }
  }, [player.fullscreen]);

  // rewind/forward for 10 seconds
  const handleSkip = useCallback((direction: string) => {
    if (Video.current) {
      const skipTime = direction === "forward" ? 10 : -10;
      Video.current.currentTime += skipTime;
    }
  }, []);

  // toggle mute
  const toggleMute = useCallback(() => {
    if (Video.current) {
      Video.current.muted = !Video.current.muted;
    }
  }, [Video.current?.muted]);

  return (
    <div ref={PlayerContainer} className={styles.watch}>
      <video ref={Video} className={styles.video} autoPlay={true} muted={player.muted}>
        <source src={episode.source} type="video/mp4" />
      </video>

      <div className={styles.player_view}>
        <div className={styles.player}>
          <div className={styles.player_main} onClick={handlePlayPause}>
            <ControlButton title="Go back" onClick={() => navigate(-1)}>
              <ArrowLeftIcon />
            </ControlButton>
          </div>
          <div className={styles.player_controls}>
            <div className={styles.progress}>
              <div className={styles.timeline_container} ref={Timeline}>
                <div className={styles.timeline}>
                  <div className={styles.thumb_indicator} />
                </div>
              </div>

              <div className={styles.remaining}>
                {Video.current ? `-${formatDuration(player.duration - player.progress)}` : "-0:00"}
              </div>
            </div>
            <div className={styles.controls}>
              <div className={styles.controls_left}>
                {/* toggle play/pause */}
                <ControlButton onClick={handlePlayPause} title="Toggle play/pause">
                  {player.playing ? <PauseIcon /> : <PlayIcon />}
                </ControlButton>

                {/* rewind 10 seconds */}
                <ControlButton title="Rewind 10 seconds" onClick={() => handleSkip("rewind")}>
                  <RotateCCWIcon />
                  <span className={styles.tip} style={{ marginLeft: 4 }}>
                    10
                  </span>
                </ControlButton>

                {/* fast-forward 10 seconds */}
                <ControlButton
                  title="Fast forward 10 seconds"
                  onClick={() => handleSkip("forward")}
                >
                  <RotateCWIcon />
                  <span className={styles.tip} style={{ marginLeft: -4 }}>
                    10
                  </span>
                </ControlButton>

                {/* volume */}
                <div className={styles.adjust_volume}>
                  <button type="button" title="Adjust volume level" onClick={toggleMute}>
                    {player.muted || player.volume === 0 ? (
                      <VolumeXIcon />
                    ) : player.volume < 0.5 ? (
                      <Volume1Icon />
                    ) : (
                      <Volume2Icon />
                    )}
                  </button>

                  <div className={styles.volume_scrubber}>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      defaultValue={player.volume}
                      onChange={handleVolumeScrubber}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.controls_right}>
                {/* next episode */}
                <ControlButton title="Next episode">
                  <FastForwardIcon />
                </ControlButton>

                {/* toggle captions */}
                <ControlButton title="Toggle captions">
                  {player.captions ? <BookActiveIcon /> : <BookIcon />}
                </ControlButton>

                {/* toggle fullscreen */}
                <ControlButton title="Toggle fullscreen" onClick={handleToggleFullscreen}>
                  {player.fullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
                </ControlButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
