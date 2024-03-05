import { createTheme } from "@mui/material/styles";

const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#221a36",
            },
            text: {
              primary: "#fff",
            },
          }
        : {}),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
    ...(mode === "dark"
      ? {
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
        }
      : {}),
  });

export default getTheme;
