import { ThemeProvider, CssBaseline, Box } from "@mui/material";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Body from "./layout/Body";
import muiTheme from "./theme/muiTheme";
import type { ReactNode } from "react";
import { useMunicipio } from "../hooks/useMunicipio";

interface AppProps {
  children?: ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  const { municipioActual, loadingMunicipios } = useMunicipio();

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Header municipio={municipioActual} loading={loadingMunicipios} />
        <Body>{children}</Body>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
