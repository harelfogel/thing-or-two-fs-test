export const sortSongs = (songs: any[], sortBy: string) => {
  switch (sortBy) {
    case "name":
      return songs.sort((a, b) => a.name.localeCompare(b.name));
    case "band":
      return songs.sort((a, b) => a.band.localeCompare(b.band));
    case "year":
      return songs.sort((a, b) => a.year - b.year);
    default:
      return songs;
  }
};
