import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const LOGO_URL =
  "https://uzgnfwbztoizcctyfdiv.supabase.co/storage/v1/object/public/Imagenes/AZuAXHqalTLlz8th7NMdBA-AZuAXHqaHD92HliWBxJzdA.jpg";

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar className="container-lg px-3">
        <Box className="d-flex align-items-center gap-2 flex-grow-1">
          <Box
            component="img"
            src={LOGO_URL}
            alt="ADLocal"
            sx={{ height: 36 }}
          />
          <Typography variant="h6" fontWeight={600}>
            ADLocal
          </Typography>
        </Box>

        <Box className="d-none d-lg-flex gap-2">
          <Button color="inherit" onClick={() => location.assign("/")}>
            Inicio
          </Button>
          <a
            href={
              import.meta.env.MODE === "production"
                ? "https://ad-local-gamma.vercel.app/registro"
                : "http://localhost:5173/registro"
            }
          >
            <Button variant="contained" color="secondary">
              Unirme como negocio
            </Button>
          </a>
        </Box>
      </Toolbar>

      <Box className="d-flex d-lg-none px-3 pb-2 gap-2">
        <Button
          fullWidth
          color="inherit"
          variant="outlined"
          onClick={() => location.assign("/")}
        >
          Inicio
        </Button>
        <a
          href={
            import.meta.env.MODE === "production"
              ? "https://ad-local-gamma.vercel.app/registro"
              : "http://localhost:5173/registro"
          }
        >
          <Button fullWidth variant="contained" color="secondary">
            Unirme como negocio
          </Button>
        </a>
      </Box>
    </AppBar>
  );
};

export default Header;
