// src/ui/AppLayout.tsx
import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

interface AppLayoutProps {
  children: React.ReactNode;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  toggleDarkMode,
  isDarkMode,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: 8,
        position: "relative",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
        onClick={toggleDarkMode}
        color="inherit"
      >
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      <Header />
      <Navigation />
      {children}
    </Box>
  );
};

export default AppLayout;
