import React from "react";
import { Box, Link } from "@mui/material";

const linkStyles = {
  textDecoration: "none",
  fontWeight: "bold",
  cursor: "pointer",
  "&:hover": { textDecoration: "underline" },
};

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
      <Link href="/songs" sx={linkStyles}>
        Songs
      </Link>
      <Link href="/albums" sx={linkStyles}>
        Albums
      </Link>
      <Link href="/artists" sx={linkStyles}>
        Artists
      </Link>
      <Link href="/podcasts" sx={linkStyles}>
        Podcasts
      </Link>
    </Box>
  );
};

export default Navigation;
