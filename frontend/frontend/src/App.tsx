import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import AppLayout from "./ui/AppLayout";
import MainContent from "./components/MainContent";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout>
        <MainContent />
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;
