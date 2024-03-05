// Navigation.tsx
import React from "react";
import { Box, Link } from "@mui/material";

const Navigation: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 5,
        margin: 5,
      }}
    >
      <Link
        color="inherit"
        href="/songs"
        sx={{ textDecoration: "none", fontWeight: "bold", cursor: "pointer" }}
      >
        Songs
      </Link>

      <Link
        color="inherit"
        href="/albums"
        sx={{
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
          cursor: "pointer",
        }}
      >
        Albums
      </Link>
      <Link
        color="inherit"
        href="/artists"
        sx={{
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
          cursor: "pointer",
        }}
      >
        Artist
      </Link>
      <Link
        color="inherit"
        href="/podcasts"
        sx={{
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
          cursor: "pointer",
        }}
      >
        Podcast
      </Link>
    </Box>
  );
};

export default Navigation;
