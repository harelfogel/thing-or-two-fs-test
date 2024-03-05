// SearchSuggestions.tsx
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Song } from "../types/songTypes";

interface SearchContainerProps {
  searchTerm: string;
  isLoading: boolean;
  songs: Song[];
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  searchTerm,
  isLoading,
  songs,
}) => {
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (searchTerm) {
    const filteredSongs = songs.filter(
      (song) =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.band.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredSongs.length === 0) {
      return <Typography>No songs or bands found...</Typography>;
    }

    return (
      <Box>
        {filteredSongs.map((song) => (
          <Typography
            key={song.id}
          >{`${song.name} by ${song.band}`}</Typography>
        ))}
      </Box>
    );
  }

  return null;
};

export default SearchContainer;
