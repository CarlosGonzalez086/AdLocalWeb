import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const LOGO_URL =
  "https://uzgnfwbztoizcctyfdiv.supabase.co/storage/v1/object/public/Imagenes/AZuAXHqalTLlz8th7NMdBA-AZuAXHqaHD92HliWBxJzdA.jpg";

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const registroUrl =
    import.meta.env.MODE === "production"
      ? "https://ad-local-gamma.vercel.app/registro"
      : "http://localhost:5173/registro";

  const busquedaAvanzadaUrl =
    import.meta.env.MODE === "production"
      ? "https://ad-local-web.vercel.app/comercios/busqueda-avanzada"
      : "http://localhost:3000/comercios/busqueda-avanzada";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{

        backdropFilter: "blur(14px)",
        background: "rgba(243, 233, 222, 0.75)",
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
        }}
      >
        {/* Logo */}
        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
          flexGrow={1}
          sx={{ cursor: "pointer" }}
          onClick={() => location.assign("/")}
        >
          <Box
            component="img"
            src={LOGO_URL}
            alt="ADLocal"
            sx={{
              height: 36,
              width: 36,
              borderRadius: "50%",
            }}
          />
          <Typography fontWeight={700} fontSize={18}>
            ADLocal
          </Typography>
        </Box>

        {/* Desktop */}
        {!isMobile && (
          <Box display="flex" gap={1.5}>
            <Button
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
              onClick={() => location.assign("/")}
            >
              Inicio
            </Button>

            {/* NUEVO: Botón búsqueda avanzada */}
            <Button
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
              onClick={() => location.assign(busquedaAvanzadaUrl)}
            >
              Búsqueda Avanzada
            </Button>

            <Button
              variant="contained"
              color="primary"
              href={registroUrl}
              sx={{
                textTransform: "none",
                borderRadius: 999,
                px: 3,
                fontWeight: 600,
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
              }}
            >
              Unirme como negocio
            </Button>
          </Box>
        )}
      </Toolbar>

      {/* Mobile */}
      {isMobile && (
        <Box px={2} pb={2} display="flex" gap={1.5} flexDirection="column">
          <Box display="flex" gap={1.5}>
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

            {/* NUEVO: Botón búsqueda avanzada */}
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
              Búsqueda Avanzada
            </Button>
          </Box>

          <Button
            fullWidth
            variant="contained"
            href={registroUrl}
            sx={{
              textTransform: "none",
              borderRadius: 999,
              fontWeight: 600,
            }}
          >
            Unirme
          </Button>
        </Box>
      )}
    </AppBar>
  );
};

export default Header;
