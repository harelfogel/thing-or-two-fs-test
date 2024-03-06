import React, { createContext, useContext, useReducer } from "react";
import { Song } from "../types/songTypes";
import { sortSongs } from "../utils/util";

interface SongsState {
  songs: Song[];
  isLoading: boolean;
}

type SongsAction =
  | { type: "SET_SONGS"; payload: Song[] }
  | { type: "REMOVE_ALL_SONGS" }
  | { type: "ADD_SONG"; payload: Song }
  | { type: "REMOVE_SONG"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SORT_SONGS"; payload: string };

const songsReducer = (state: SongsState, action: SongsAction): SongsState => {
  switch (action.type) {
    case "SET_SONGS":
      return { ...state, songs: action.payload };
    case "ADD_SONG":
      return { ...state, songs: [...state.songs, action.payload] };
    case "REMOVE_SONG":
      return {
        ...state,
        songs: state.songs.filter((song) => song.id !== action.payload),
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SORT_SONGS":
      return { ...state, songs: sortSongs(state.songs, action.payload) };
    case "REMOVE_ALL_SONGS":
      return { ...state, songs: [] };

    case "REMOVE_SONG":
      return {
        ...state,
        songs: state.songs.filter((song) => song.id !== action.payload),
      };
    default:
      return state;
  }
};

const SongsContext = createContext<{
  state: SongsState;
  dispatch: React.Dispatch<SongsAction>;
}>({
  state: { songs: [], isLoading: false },
  dispatch: () => undefined,
});

export const useSongsContext = () => useContext(SongsContext);

export const SongsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(songsReducer, {
    songs: [],
    isLoading: false,
  });

  return (
    <SongsContext.Provider value={{ state, dispatch }}>
      {children}
    </SongsContext.Provider>
  );
};
