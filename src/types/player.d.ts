type PlayerContextType = {
  mounted: boolean;
  playing: boolean;
  duration: number;
  progress: number;
  muted: boolean;
  volume: number;
  captions: boolean;
  fullscreen: boolean;
  player_view: boolean;
};

type PlayerDispatchContextType<State, Action> = ({ type: State, payload: Action }) => State;

export { PlayerContextType, PlayerDispatchContextType };
