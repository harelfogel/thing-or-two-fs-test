import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDarkMode } from "./hooks/useDarkMode";
import AppLayout from "./ui/AppLayout";
import MainContent from "./components/MainContent";
import { SongsProvider } from "./contexts/SongsContext";

const App: React.FC = () => {
  const { theme, toggleDarkMode, darkMode } = useDarkMode();

  return (
    <SongsProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout toggleDarkMode={toggleDarkMode} isDarkMode={darkMode}>
          <MainContent />
        </AppLayout>
      </ThemeProvider>
    </SongsProvider>
  );
};

export default App;
