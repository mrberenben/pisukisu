import { ISerie } from "types/serie";

type AppContextType = {
  activeSerie: ISerie[] | null;
};

type AppDispatchContextType<State, Action> = ({ type: State, payload: Action }) => State;

export { AppContextType, AppDispatchContextType };
