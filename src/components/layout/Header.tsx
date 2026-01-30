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
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import type { FC } from "react";

const LOGO_URL =
  "https://uzgnfwbztoizcctyfdiv.supabase.co/storage/v1/object/public/Imagenes/AZuAXHqalTLlz8th7NMdBA-AZuAXHqaHD92HliWBxJzdA.jpg";

interface HeaderProps {
  municipio: string | null;
  loading: boolean;
}

const Header: FC<HeaderProps> = ({ municipio, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const registroUrl =
    import.meta.env.MODE === "production"
      ? "https://ad-local-gamma.vercel.app/registro"
      : "http://localhost:5173/registro";

  const busquedaAvanzadaUrl =
    import.meta.env.MODE === "production"
      ? "https://www.adlocal.store/comercios/busqueda-avanzada"
      : "/comercios/busqueda-avanzada";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        backgroundColor: "rgba(255,255,255,0.72)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        color: "#111",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          mx: "auto",
          width: "100%",
          px: 2,
          minHeight: isMobile ? 64 : 72,
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
            }}
            onClick={() => location.assign("/")}
          />

          <Typography
            fontWeight={600}
            fontSize={17}
            letterSpacing="-0.01em"
          >
            ADLocal
          </Typography>

          {loading ? (
            <Skeleton
              variant="rounded"
              width={110}
              height={26}
              sx={{ borderRadius: 999 }}
            />
          ) : (
            municipio && (
              <Chip
                icon={<LocationOnIcon fontSize="small" />}
                label={municipio}
                size="small"
                sx={{
                  borderRadius: 999,
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  px: 1,
                  backgroundColor: "rgba(0,0,0,0.06)",
                  backdropFilter: "blur(6px)",
                }}
              />
            )
          )}
        </Stack>

        {/* Desktop actions */}
        {!isMobile && (
          <Stack direction="row" spacing={1}>
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: 500,
                borderRadius: 999,
                px: 2,
                transition: "all .25s ease",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
              }}
              onClick={() => location.assign("/")}
            >
              Inicio
            </Button>

            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: 500,
                borderRadius: 999,
                px: 2,
                transition: "all .25s ease",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
              }}
              onClick={() => location.assign(busquedaAvanzadaUrl)}
            >
              Búsqueda avanzada
            </Button>

            <Button
              variant="contained"
              href={registroUrl}
              sx={{
                textTransform: "none",
                borderRadius: 999,
                px: 3,
                fontWeight: 600,
                background:
                  "linear-gradient(135deg, #007AFF, #005FCC)",
                boxShadow: "0 10px 24px rgba(0,122,255,0.35)",
                "&:hover": {
                  boxShadow:
                    "0 12px 28px rgba(0,122,255,0.45)",
                },
              }}
            >
              Unirme como negocio
            </Button>
          </Stack>
        )}
      </Toolbar>

      {/* Mobile actions */}
      {isMobile && (
        <Box px={2} pb={2}>
          <Stack spacing={1.4}>
            <Stack direction="row" spacing={1}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  fontWeight: 500,
                  borderColor: "rgba(0,0,0,0.15)",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.04)",
                  },
                }}
                onClick={() => location.assign("/")}
              >
                Inicio
              </Button>

              <Button
                fullWidth
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  fontWeight: 500,
                  borderColor: "rgba(0,0,0,0.15)",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.04)",
                  },
                }}
                onClick={() => location.assign(busquedaAvanzadaUrl)}
              >
                Buscar
              </Button>
            </Stack>

            <Button
              fullWidth
              variant="contained"
              href={registroUrl}
              sx={{
                textTransform: "none",
                borderRadius: 999,
                fontWeight: 600,
                py: 1.2,
                background:
                  "linear-gradient(135deg, #007AFF, #005FCC)",
                boxShadow: "0 10px 24px rgba(0,122,255,0.35)",
              }}
            >
              Unirme como negocio
            </Button>
          </Stack>
        </Box>
      )}
    </AppBar>
  );
};

export default Header;
