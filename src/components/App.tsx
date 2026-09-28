import { ThemeProvider, CssBaseline } from "@mui/material";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Body from "./layout/Body";
import PwaInstallPrompt from "./common/PwaInstallPrompt";
import muiTheme from "../theme/muiTheme";
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

      <div className="d-flex flex-column min-vh-100 w-100 overflow-hidden">
        <Header municipio={municipioActual} loading={loadingMunicipios} />
        <Body>{children}</Body>
        <Footer />
        <PwaInstallPrompt />
      </div>
    </ThemeProvider>
  );
};

export default App;
