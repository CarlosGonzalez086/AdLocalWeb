import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  FormControl,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import {
  Menu,
  TuneRounded,
  CloseRounded,
  SortRounded,
} from "@mui/icons-material";

import { SelectEstadoAutocomplete } from "../Locations/SelectEstadoAutocomplete";
import { SelectMunicipioAutocomplete } from "../Locations/SelectMunicipioAutocomplete";
import { useComercioPublico } from "../../hooks/useComercioPublico";
import ComercioCard from "../business/ComercioCard";
import { SelectTipoComercioAutocomplete } from "../business/SelectTipoComercioAutocomplete";

const coffee = {
  main: "#5B3A29",
  dark: "#3A2419",
  light: "#f3e9de",
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    bgcolor: "#fff",
    "& fieldset": { borderColor: "#E0E0E0" },
    "&:hover fieldset": { borderColor: "#BDBDBD" },
    "&.Mui-focused fieldset": { borderColor: "#5B3A29" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#5B3A29" },
};

type OrdenType = "alfabetico" | "recientes" | "antiguos" | "populares";

const BusquedaAvanzada: React.FC = () => {
  const [idState, setIdState] = useState(0);
  const [idMunicipality, setIdMunicipality] = useState(0);
  const [idTipoComercio, setIdTipoComercio] = useState(0);
  const [orden, setOrden] = useState<OrdenType>("alfabetico");
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { comercios, loading, hasMore, cargarPorFiltros } =
    useComercioPublico();

  const handleLimpiar = () => {
    setIdState(0);
    setIdMunicipality(0);
    setIdTipoComercio(0);
    setOrden("alfabetico");
    cargarPorFiltros(0, 0, 0, "alfabetico", true);
  };

  const handleAplicar = () => {
    cargarPorFiltros(idState, idMunicipality, idTipoComercio, orden, true);
    if (isMobile) setMobileOpen(false);
  };

  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        px: { xs: 2.5, sm: 3 },
        py: 3,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(18px)",
        borderRight: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={1}>
          <TuneRounded sx={{ color: coffee.main, fontSize: 20 }} />
          <Typography
            fontWeight={700}
            fontSize="1rem"
            sx={{ color: coffee.main }}
          >
            Filtros
          </Typography>
        </Box>
        {isMobile && (
          <IconButton size="small" onClick={() => setMobileOpen(false)}>
            <CloseRounded sx={{ fontSize: 20, color: "text.secondary" }} />
          </IconButton>
        )}
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        <SelectEstadoAutocomplete
          value={idState}
          onChange={(estadoId) => setIdState(estadoId)}
        />

        <SelectMunicipioAutocomplete
          estadoId={idState}
          value={idMunicipality}
          onChange={(id) => setIdMunicipality(id)}
        />

        <SelectTipoComercioAutocomplete
          value={idTipoComercio}
          onChange={(id) => setIdTipoComercio(id)}
        />

        <FormControl fullWidth sx={fieldSx}>
          <Select
            value={orden}
            onChange={(e) => setOrden(e.target.value as OrdenType)}
            displayEmpty
            startAdornment={
              <InputAdornment position="start">
                <SortRounded sx={{ color: "#9E9E9E", fontSize: 20 }} />
              </InputAdornment>
            }
          >
            <MenuItem value="alfabetico">Alfabético A–Z</MenuItem>
            <MenuItem value="recientes">Más recientes</MenuItem>
            <MenuItem value="antiguos">Más antiguos</MenuItem>
            <MenuItem value="populares">Más populares</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mt="auto" display="flex" flexDirection="column" gap={1.5}>
        <Button
          fullWidth
          onClick={handleAplicar}
          sx={{
            py: 1.4,
            borderRadius: 999,
            fontWeight: 700,
            fontSize: "0.9rem",
            textTransform: "none",
            background: `linear-gradient(135deg, ${coffee.main}, ${coffee.dark})`,
            color: "#fff",
            boxShadow: "0 6px 18px rgba(91,58,41,0.30)",
            "&:hover": {
              boxShadow: "0 8px 24px rgba(91,58,41,0.40)",
            },
          }}
        >
          Aplicar filtros
        </Button>

        <Button
          fullWidth
          variant="outlined"
          onClick={handleLimpiar}
          sx={{
            borderRadius: 999,
            fontWeight: 600,
            fontSize: "0.9rem",
            textTransform: "none",
            color: coffee.main,
            borderColor: coffee.main,
            "&:hover": {
              bgcolor: coffee.light,
              borderColor: coffee.dark,
            },
          }}
        >
          Limpiar filtros
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box display="flex" minHeight="100%">
      {!isMobile && (
        <Box
          sx={{
            width: { md: 270, lg: 290 },
            flexShrink: 0,
            height: { md: 480, lg: 620 },
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
            mr: 3,
          }}
        >
          {sidebarContent}
        </Box>
      )}

      {isMobile && (
        <>
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
              boxShadow: "0 10px 28px rgba(91,58,41,0.40)",
              "&:hover": { bgcolor: coffee.dark },
            }}
          >
            <Menu />
          </IconButton>

          <Drawer
            anchor="bottom"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            PaperProps={{
              sx: {
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                maxHeight: "88vh",
                bgcolor: "transparent",
              },
            }}
          >
            {sidebarContent}
          </Drawer>
        </>
      )}

      <Box sx={{ width: "100%", minWidth: 0 }}>
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1.5}
            py={6}
          >
            <CircularProgress
              size={20}
              thickness={4}
              sx={{ color: coffee.main }}
            />
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              Cargando comercios...
            </Typography>
          </Box>
        ) : comercios.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={8}
            gap={1}
          >
            <Typography fontSize="2rem">🔍</Typography>
            <Typography fontWeight={600} color="text.secondary">
              No se encontraron comercios
            </Typography>
            <Typography fontSize="0.85rem" color="text.disabled">
              Intenta ajustar los filtros
            </Typography>
          </Box>
        ) : (
          <div className="container-fluid px-0">
            <div className="row g-3 align-items-stretch">
              {comercios.map((c) => (
                <div
                  key={c.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
                >
                  <ComercioCard comercio={c} />
                </div>
              ))}
            </div>
          </div>
        )}

        {hasMore && !loading && (
          <Box textAlign="center" mt={4}>
            <Button
              onClick={() =>
                cargarPorFiltros(idState, idMunicipality, idTipoComercio, orden)
              }
              sx={{
                px: 5,
                py: 1.4,
                borderRadius: 999,
                fontWeight: 700,
                fontSize: "0.9rem",
                textTransform: "none",
                background: `linear-gradient(135deg, ${coffee.main}, ${coffee.dark})`,
                color: "#fff",
                boxShadow: "0 6px 18px rgba(91,58,41,0.28)",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(91,58,41,0.38)",
                },
              }}
            >
              Cargar más comercios
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BusquedaAvanzada;
