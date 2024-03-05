import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // Enable dark mode
    background: {
      default: "#221a36", // Use the darker shade as the default background
    },
    text: {
      primary: "#fff", // Light text color for contrast
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background: linear-gradient(180deg, #4c2a85 0%, #221a36 100%);
          color: #fff;
        }
      `,
    },
  },
});

export default theme;
