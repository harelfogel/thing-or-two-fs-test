import React from "react";
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
  if (isLoading || searchTerm) {
    return (
      <Box sx={{ marginY: 2 }}>
        <Paper sx={{ padding: 1 }}>
          {" "}
          {/* Set background color to white */}
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              {songs.filter(
                (song) =>
                  song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  song.band.toLowerCase().includes(searchTerm.toLowerCase())
              ).length > 0 ? (
                songs
                  .filter(
                    (song) =>
                      song.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      song.band.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((song) => (
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
  }

  return null;
};

export default SearchContainer;
