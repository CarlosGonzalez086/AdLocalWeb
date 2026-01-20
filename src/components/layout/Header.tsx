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

const LOGO_URL =
  "https://uzgnfwbztoizcctyfdiv.supabase.co/storage/v1/object/public/Imagenes/AZuAXHqalTLlz8th7NMdBA-AZuAXHqaHD92HliWBxJzdA.jpg";

interface HeaderProps {
  municipio: string | null;
  loading: boolean;
}

const Header: React.FC<HeaderProps> = ({ municipio, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const registroUrl =
    import.meta.env.MODE === "production"
      ? "https://ad-local-gamma.vercel.app/registro"
      : "http://localhost:5173/registro";

  const busquedaAvanzadaUrl =
    import.meta.env.MODE === "production"
      ? "https://ad-local-web.vercel.app/comercios/busqueda-avanzada"
      : "/comercios/busqueda-avanzada";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(255,255,255,0.85)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
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
        <Stack direction="row" alignItems="center" spacing={1.5} flexGrow={1}>
          <Box
            component="img"
            src={LOGO_URL}
            alt="ADLocal"
            sx={{
              height: 38,
              width: 38,
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => location.assign("/")}
          />

          <Typography fontWeight={700} fontSize={18}>
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
                  backgroundColor: "rgba(0,0,0,0.06)",
                }}
              />
            )
          )}
        </Stack>

        {!isMobile && (
          <Stack direction="row" spacing={1}>
            <Button
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
              onClick={() => location.assign("/")}
            >
              Inicio
            </Button>

            <Button
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
              onClick={() => location.assign(busquedaAvanzadaUrl)}
            >
              Búsqueda Avanzada
            </Button>

            <Button
              variant="contained"
              href={registroUrl}
              sx={{
                textTransform: "none",
                borderRadius: 999,
                px: 3,
                fontWeight: 600,
                boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
              }}
            >
              Unirme como negocio
            </Button>
          </Stack>
        )}
      </Toolbar>

      {isMobile && (
        <Box px={2} pb={2}>
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  fontWeight: 500,
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
