import React from "react";

// ts types
import { PlayerContextType, PlayerDispatchContextType } from "types/player";

// actions
import { AppActions } from "context/AppActions";

const PlayerState = {
  mounted: false,
  playing: false,
  duration: 0,
  progress: 0,
  muted: false,
  volume: 1,
  captions: false,
  fullscreen: false
};

const PlayerContext = React.createContext<PlayerContextType>(PlayerState);
const PlayerDispatchContext = React.createContext<PlayerDispatchContextType<any, any> | undefined>(
  undefined
);

const PlayerReducer = (state: any, action: { type: string; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case AppActions.TOGGLE_MOUNT_PLAYER: {
      return {
        ...state,
        mounted: payload
      };
    }

    case AppActions.SET_DURATION: {
      return {
        ...state,
        duration: payload
      };
    }

    case AppActions.SET_PROGRESS: {
      return {
        ...state,
        progress: payload
      };
    }

    case AppActions.SET_VOLUME: {
      return {
        ...state,
        volume: payload
      };
    }

    case AppActions.TOGGLE_MUTE: {
      return {
        ...state,
        muted: payload
      };
    }

    case AppActions.TOGGLE_PLAY_VIDEO: {
      return {
        ...state,
        playing: payload
      };
    }

    case AppActions.TOGGLE_FULLSCREEN: {
      return {
        ...state,
        fullscreen: payload
      };
    }

    default:
      return state;
  }
};

const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(PlayerReducer, PlayerState);

  return (
    <PlayerContext.Provider value={state}>
      <PlayerDispatchContext.Provider value={dispatch}>{children}</PlayerDispatchContext.Provider>
    </PlayerContext.Provider>
  );
};

const usePlayerState = () => {
  const context = React.useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayerState must be used within a PlayerProvider");
  }

  return context;
};

const usePlayerDispatch = () => {
  const context = React.useContext(PlayerDispatchContext);
  if (context === undefined) {
    throw new Error("usePlayerDispatch must be used within a PlayerProvider");
  }

  return context;
};

export { PlayerProvider, usePlayerState, usePlayerDispatch };
