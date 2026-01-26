import React, { useState } from "react";
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
  Typography,
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
  const [idState, setIdState] = useState(0);
  const [idMunicipality, setIdMunicipality] = useState(0);
  const [orden, setOrden] = useState<
    "alfabetico" | "recientes" | "antiguos" | "populares"
  >("alfabetico");
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { comercios, loading, cargarPorFiltros } = useComercioPublico();

  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        px: { xs: 2, sm: 3 },
        py: 3,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(18px)",
        borderRight: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography
        fontWeight={700}
        fontSize="1.05rem"
        sx={{ color: coffee.main }}
      >
        Filtros
      </Typography>

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
        <InputLabel>Orden</InputLabel>
        <Select
          value={orden}
          label="Orden"
          onChange={(e) =>
            setOrden(
              e.target.value as
                | "alfabetico"
                | "recientes"
                | "antiguos"
                | "populares",
            )
          }
        >
          <MenuItem value="alfabetico">Alfabético A–Z</MenuItem>
          <MenuItem value="recientes">Más recientes</MenuItem>
          <MenuItem value="antiguos">Más antiguos</MenuItem>
          <MenuItem value="populares">Más populares</MenuItem>
        </Select>
      </FormControl>

      <Box mt="auto" display="flex" flexDirection="column" gap={1.5}>
        <Button
          fullWidth
          onClick={() => cargarPorFiltros(idState, idMunicipality, orden)}
          sx={{
            py: 1.4,
            borderRadius: 3,
            fontWeight: 600,
            background: `linear-gradient(135deg, ${coffee.main}, ${coffee.dark})`,
            color: "#fff",
            boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
          }}
        >
          Aplicar filtros
        </Button>

        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            setIdState(0);
            setIdMunicipality(0);
            setOrden("alfabetico");
            cargarPorFiltros(0, 0, "alfabetico");
          }}
          sx={{
            borderRadius: 3,
            fontWeight: 600,
            color: coffee.main,
            borderColor: coffee.main,
          }}
        >
          Limpiar
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box display="flex" minHeight="100%">
      {!isMobile && (
        <Box
          sx={{
            width: { md: 280, lg: 300 },
            flexShrink: 0,
            height: { md: 450, lg: 650 },
          }}
        >
          {sidebarContent}
        </Box>
      )}

      {isMobile && (
        <>
          {isMobile && !mobileOpen && (
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                bgcolor: coffee.main,
                color: "#fff",
                width: 56,
                height: 56,
                borderRadius: "50%",
                zIndex: 1300,
                boxShadow: "0 10px 28px rgba(0,0,0,0.3)",
                "&:hover": { bgcolor: coffee.dark },
              }}
            >
              <Menu />
            </IconButton>
          )}
          <Drawer
            anchor="bottom"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            PaperProps={{
              sx: {
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                maxHeight: "85vh",
              },
            }}
          >
            {sidebarContent}
          </Drawer>
        </>
      )}

      <Box
        sx={{
          width: "100%",
        }}
      >
        {loading ? (
          <Typography>Cargando comercios…</Typography>
        ) : (
          <div className="container-fluid">
            <div className="row g-4 align-items-stretch">
              {comercios.map((c) => (
                <div
                  key={c.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
                >
                  <ComercioCard comercio={c}  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default BusquedaAvanzada;
