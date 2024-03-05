import React, { useMemo } from "react";
import { Box, CircularProgress, Typography, Paper } from "@mui/material";
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
  const filteredSongs = useMemo(() => {
    return songs.filter(
      (song) =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.band.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [songs, searchTerm]);

  if (!isLoading && !searchTerm) {
    return null;
  }

  return (
    <Box sx={{ marginY: 2 }}>
      <Paper sx={paperStyle}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song) => (
                <Typography
                  key={song.id}
                >{`${song.name} by ${song.band}`}</Typography>
              ))
            ) : (
              <Typography>No songs or bands found...</Typography>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

const paperStyle = {
  padding: 1,
};

export default SearchContainer;
