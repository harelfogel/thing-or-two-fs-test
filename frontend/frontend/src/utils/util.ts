import { Song } from "../types/songTypes";

export const sortSongs = (songs: Song[], sortBy: string): Song[] => {
  switch (sortBy) {
    case "name":
      return [...songs].sort((a, b) => a.name.localeCompare(b.name));
    case "band":
      return [...songs].sort((a, b) => a.band.localeCompare(b.band));
    case "year":
      return [...songs].sort((a, b) => a.year - b.year);
    default:
      return songs;
  }
};
