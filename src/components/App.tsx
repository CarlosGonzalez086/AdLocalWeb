import type { FC, ReactNode } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Body from "./layout/Body";
import muiTheme from "./theme/muiTheme";

interface AppProps {
  children?: ReactNode;
}

const App: FC<AppProps> = ({ children }) => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />

        <Body>
          {children} 
        </Body>

        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
