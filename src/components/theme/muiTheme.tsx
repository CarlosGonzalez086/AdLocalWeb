import { createTheme } from "@mui/material/styles";
import { coffee } from "./colors";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: coffee.main,
      dark: coffee.dark,
      light: coffee.light,
      contrastText: "#ffffff",
    },
    secondary: {
      main: coffee.dark,
    },
    background: {
      default: coffee.light,
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),


    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },

    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },

    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },

    button: {
      fontWeight: 600,
      textTransform: "none", 
    },
  },
});

export default muiTheme;
