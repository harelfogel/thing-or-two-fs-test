import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDarkMode } from "./hooks/useDarkMode";
import AppLayout from "./ui/AppLayout";
import MainContent from "./components/MainContent";

const App: React.FC = () => {
  const { theme, toggleDarkMode, darkMode } = useDarkMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout toggleDarkMode={toggleDarkMode} isDarkMode={darkMode}>
        <MainContent />
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;
