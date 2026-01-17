import { Box, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import type { FC } from "react";

const Footer: FC = () => {
  const year = new Date().getFullYear();

  const registroUrl =
    import.meta.env.MODE === "production"
      ? "https://ad-local-gamma.vercel.app/registro"
      : "http://localhost:5173/registro";

  return (
    <Box
      component="footer"
      sx={{
        backdropFilter: "blur(14px)",
        background: "rgba(20,20,20,0.85)",
        color: "#fff",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: 2,
          py: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          alignItems: { xs: "center", md: "center" },
          justifyContent: "space-between",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {/* CTA */}
        <Typography fontSize={15} sx={{ opacity: 0.95 }}>
          ¿Quieres unirte como negocio?{" "}
          <Link
            href={registroUrl}
            underline="none"
            sx={{
              ml: 0.5,
              fontWeight: 600,
              color: "primary.light",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Da clic aquí
          </Link>
        </Typography>

        {/* Social */}
        <Box display="flex" gap={1}>
          <IconButton
            aria-label="Facebook"
            sx={{
              color: "#fff",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            <FacebookIcon />
          </IconButton>

          <IconButton
            aria-label="Instagram"
            sx={{
              color: "#fff",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            <InstagramIcon />
          </IconButton>
        </Box>

        {/* Copyright */}
        <Typography fontSize={13} sx={{ opacity: 0.7 }}>
          © {year} Da VinciX Code Labs
          <br />
          Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
