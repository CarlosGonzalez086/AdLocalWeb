import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

import { SelectEstadoAutocomplete } from "../Locations/SelectEstadoAutocomplete";
import { SelectMunicipioAutocomplete } from "../Locations/SelectMunicipioAutocomplete";
import { useComercioPublico } from "../../hooks/useComercioPublico";
import ComercioCard from "../business/ComercioCard";

const coffee = {
  main: "#5B3A29",
  dark: "#3A2419",
  light: "#f3e9de",
};

const BusquedaAvanzada: React.FC = () => {
  const [idState, setIdState] = useState<number>(0);
  const [idMunicipality, setIdMunicipality] = useState<number>(0);
  const [orden, setOrden] = useState<"alfabetico" | "recientes" | "antiguos">(
    "alfabetico",
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { comercios, loading, cargarPorFiltros } = useComercioPublico();

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const sidebarContent = (
    <Box
      sx={{
        bgcolor: coffee.light,
        height: "100%",
        width: "100%",
        minWidth: 250,
        padding: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        "@media (max-width: 600px)": { minHeight: "60vh" },
        "@media (min-width: 601px) and (max-width: 960px)": {
          minHeight: "75vh",
        },
        "@media (min-width: 961px)": { minHeight: "75vh" },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <SelectEstadoAutocomplete
          value={idState}
          onChange={(estadoId) => setIdState(estadoId)}
        />
        <SelectMunicipioAutocomplete
          estadoId={idState}
          value={idMunicipality}
          onChange={(id) => setIdMunicipality(id)}
        />
        <FormControl fullWidth>
          <InputLabel id="orden-label">Orden</InputLabel>
          <Select
            labelId="orden-label"
            value={orden}
            label="Orden"
            onChange={(e) => {
              const nuevoOrden = e.target.value as
                | "alfabetico"
                | "recientes"
                | "antiguos";
              setOrden(nuevoOrden);
            }}
          >
            <MenuItem value="alfabetico">Alfabético A-Z</MenuItem>
            <MenuItem value="recientes">Más recientes</MenuItem>
            <MenuItem value="antiguos">Más antiguos</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        sx={{ bgcolor: coffee.main, "&:hover": { bgcolor: coffee.dark } }}
        onClick={() => cargarPorFiltros(idState, idMunicipality, orden)}
      >
        Aplicar Filtros
      </Button>
    </Box>
  );

  return (
    <div className="w-100 h-100">
      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "100%",
        }}
      >
        {!isMobile && (
          <Box
            sx={{
              flexBasis: { xs: "100%", sm: "25%", md: "25%", xl: "15%" },
              height: "100%",
            }}
          >
            {sidebarContent}
          </Box>
        )}
        {isMobile && (
          <>
            <IconButton
              onClick={toggleDrawer}
              sx={{
                position: "fixed",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: coffee.main,
                color: "#fff",
                zIndex: 1200,
                borderRadius: 4,
                width: 40,
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": { bgcolor: coffee.dark },
              }}
            >
              <Menu />
            </IconButton>

            <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
              {sidebarContent}
            </Drawer>
          </>
        )}
        <Box
          sx={{
            padding: 1,
            flexGrow: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {loading ? (
            <p>Cargando comercios...</p>
          ) : (
            comercios.map((c) => (
              <Box key={c.id} px={1}>
                <ComercioCard comercio={c} />
              </Box>
            ))
          )}
        </Box>
      </Box>
    </div>
  );
};

export default BusquedaAvanzada;
