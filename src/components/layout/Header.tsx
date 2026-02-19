import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Skeleton,
  Chip,
  Stack,
  IconButton,
  Drawer,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import type { FC } from "react";
import { useState } from "react";

const LOGO_URL =
  "https://uzgnfwbztoizcctyfdiv.supabase.co/storage/v1/object/public/Imagenes/AZuAXHqalTLlz8th7NMdBA-AZuAXHqaHD92HliWBxJzdA.jpg";

interface HeaderProps {
  municipio: string | null;
  loading: boolean;
}

const Header: FC<HeaderProps> = ({ municipio, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const registroUrl =
    import.meta.env.MODE === "production"
      ? "https://ad-local-gamma.vercel.app/registro"
      : "http://localhost:5173/registro";

  const busquedaAvanzadaUrl =
    import.meta.env.MODE === "production"
      ? "https://www.adlocal.store/comercios/busqueda-avanzada"
      : "/comercios/busqueda-avanzada";

  const navButtonSx = {
    textTransform: "none",
    fontWeight: 500,
    fontSize: "0.875rem",
    borderRadius: 999,
    px: 2,
    color: "#1c1c1e",
    transition: "all .2s ease",
    "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
  };

  const drawerContent = (
    <Box
      sx={{
        width: "100vw",
        maxWidth: 360,
        height: "100%",
        bgcolor: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 1,
      }}
    >
      {/* Header drawer */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <Box
            component="img"
            src={LOGO_URL}
            alt="ADLocal"
            sx={{ height: 32, width: 32, borderRadius: "50%", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
          />
          <Typography fontWeight={700} fontSize={16}>ADLocal</Typography>
        </Stack>
        <IconButton size="small" onClick={() => setDrawerOpen(false)}>
          <CloseRoundedIcon sx={{ fontSize: 20, color: "text.secondary" }} />
        </IconButton>
      </Stack>

      {municipio && (
        <Chip
          icon={<LocationOnIcon fontSize="small" />}
          label={municipio}
          size="small"
          sx={{
            alignSelf: "flex-start",
            borderRadius: 999,
            fontWeight: 500,
            fontSize: "0.75rem",
            px: 1,
            mb: 1,
            backgroundColor: "rgba(0,0,0,0.06)",
          }}
        />
      )}

      {/* Nav items */}
      <Button
        fullWidth
        startIcon={<HomeRoundedIcon />}
        onClick={() => { location.assign("/"); setDrawerOpen(false); }}
        sx={{
          ...navButtonSx,
          justifyContent: "flex-start",
          px: 2,
          py: 1.2,
          color: "#1c1c1e",
        }}
      >
        Inicio
      </Button>

      <Button
        fullWidth
        startIcon={<SearchRoundedIcon />}
        onClick={() => { location.assign(busquedaAvanzadaUrl); setDrawerOpen(false); }}
        sx={{
          ...navButtonSx,
          justifyContent: "flex-start",
          px: 2,
          py: 1.2,
          color: "#1c1c1e",
        }}
      >
        Búsqueda avanzada
      </Button>

      <Box mt="auto">
        <Button
          fullWidth
          variant="contained"
          href={registroUrl}
          startIcon={<StorefrontRoundedIcon />}
          sx={{
            textTransform: "none",
            borderRadius: 999,
            fontWeight: 700,
            py: 1.4,
            fontSize: "0.9rem",
            background: "linear-gradient(135deg, #007AFF, #005FCC)",
            boxShadow: "0 8px 22px rgba(0,122,255,0.35)",
            "&:hover": { boxShadow: "0 12px 28px rgba(0,122,255,0.45)" },
          }}
        >
          Unirme como negocio
        </Button>
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        backgroundColor: "rgba(255,255,255,0.75)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        color: "#111",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          mx: "auto",
          width: "100%",
          px: { xs: 2, sm: 3 },
          minHeight: { xs: 60, md: 70 },
        }}
      >
        {/* Logo + nombre + municipio */}
        <Stack direction="row" alignItems="center" spacing={1.4} flexGrow={1}>
          <Box
            component="img"
            src={LOGO_URL}
            alt="ADLocal"
            sx={{
              height: 36,
              width: 36,
              borderRadius: "50%",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
            onClick={() => location.assign("/")}
          />

          <Typography
            fontWeight={700}
            fontSize={17}
            letterSpacing="-0.01em"
            sx={{ color: "#1c1c1e" }}
          >
            ADLocal
          </Typography>

          {loading ? (
            <Skeleton variant="rounded" width={110} height={26} sx={{ borderRadius: 999 }} />
          ) : (
            municipio && (
              <Chip
                icon={<LocationOnIcon sx={{ fontSize: "14px !important" }} />}
                label={municipio}
                size="small"
                sx={{
                  borderRadius: 999,
                  fontWeight: 500,
                  fontSize: "0.73rem",
                  px: 0.8,
                  backgroundColor: "rgba(0,0,0,0.06)",
                  backdropFilter: "blur(6px)",
                  display: { xs: "none", sm: "flex" },
                }}
              />
            )
          )}
        </Stack>

        {/* Desktop nav */}
        {!isMobile && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Button
              sx={navButtonSx}
              onClick={() => location.assign("/")}
              startIcon={<HomeRoundedIcon sx={{ fontSize: 18 }} />}
            >
              Inicio
            </Button>

            <Button
              sx={navButtonSx}
              onClick={() => location.assign(busquedaAvanzadaUrl)}
              startIcon={<SearchRoundedIcon sx={{ fontSize: 18 }} />}
            >
              Búsqueda avanzada
            </Button>

            <Button
              variant="contained"
              href={registroUrl}
              startIcon={<StorefrontRoundedIcon sx={{ fontSize: 18 }} />}
              sx={{
                ml: 1,
                textTransform: "none",
                borderRadius: 999,
                px: 2.5,
                fontWeight: 700,
                fontSize: "0.875rem",
                background: "linear-gradient(135deg, #007AFF, #005FCC)",
                boxShadow: "0 8px 20px rgba(0,122,255,0.30)",
                transition: "all 0.25s ease",
                "&:hover": {
                  boxShadow: "0 12px 28px rgba(0,122,255,0.42)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              Unirme como negocio
            </Button>
          </Stack>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.10)",
              p: 0.8,
              color: "#1c1c1e",
            }}
          >
            <MenuRoundedIcon sx={{ fontSize: 22 }} />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Header;