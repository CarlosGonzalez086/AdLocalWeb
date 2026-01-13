import type { FC } from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer: FC = () => {
  const year = new Date().getFullYear();
  const handleClick = () => {
    window.location.href =
      import.meta.env.NODE_ENV === "production"
        ? "https://ad-local-gamma.vercel.app/registro"
        : "http://localhost:5173/registro";
  };
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
    >
      <div className="container-lg py-4">
        <div className="row gy-3 align-items-center text-center text-lg-start">
          <div className="col-12 col-lg-6">
            <Typography variant="body1">
              ¿Quieres unirte como negocio?
              <Link
                onClick={handleClick}
                underline="hover"
                sx={{ ml: 1, color: "white", fontWeight: 500, cursor: "pointer" }}
              >
                Da clic aquí
              </Link>
            </Typography>
          </div>

          <div className="col-12 col-lg-3 d-flex justify-content-center justify-content-lg-start gap-2">
            <IconButton sx={{ color: "primary.contrastText" }}>
              <FacebookIcon />
            </IconButton>
            <IconButton sx={{ color: "primary.contrastText" }}>
              <InstagramIcon />
            </IconButton>
          </div>

          <div className="col-12 col-lg-3 text-center text-lg-end">
            <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
              © {year} Da VinciX Code Labs. <br /> Todos los derechos reservados.
            </Typography>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Footer;
