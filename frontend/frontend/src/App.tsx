import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from "./theme/theme";
import AppLayout from "./ui/AppLayout";
import MainContent from "./components/MainContent";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = getTheme(darkMode ? "light" : "dark");

  const toggleDarkMode = () => setDarkMode(!darkMode);

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
