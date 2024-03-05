import { useState } from "react";
import getTheme from "../theme/theme";

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = getTheme(darkMode ? "light" : "dark");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return { theme, darkMode, toggleDarkMode };
};
