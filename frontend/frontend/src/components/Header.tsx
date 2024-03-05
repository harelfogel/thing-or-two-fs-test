import React from "react";
import { Typography, Box } from "@mui/material";

const Header: React.FC = () => {
  return (
    <Box sx={{ textAlign: "center", width: "100%" }}>
      <Typography variant="h2" component="h1" sx={{ fontWeight: "bold" }}>
        Your Favorite Songs
      </Typography>
    </Box>
  );
};

export default Header;
