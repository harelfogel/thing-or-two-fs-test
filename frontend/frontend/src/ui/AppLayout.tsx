// src/ui/AppLayout.tsx
import React from "react";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // This ensures children are centered
        justifyContent: "flex-start",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: 8,
      }}
    >
      <Header />
      <Navigation />
      {children}
    </Box>
  );
};

export default AppLayout;
