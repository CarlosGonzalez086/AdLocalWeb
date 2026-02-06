import {
  Box,
  Typography,
  Link,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
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
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(20,20,20,0.88)",
        color: "#fff",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: 2,
          py: { xs: 3, md: 4 },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
          textAlign={{ xs: "center", md: "left" }}
        >
          <Typography fontSize={15} sx={{ opacity: 0.95 }}>
            ¿Quieres unirte como negocio?{" "}
            <Link
              href={registroUrl}
              underline="none"
              sx={{
                fontWeight: 600,
                color: "primary.light",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Regístrate aquí
            </Link>
          </Typography>

          <Stack direction="row" spacing={1}>
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
          </Stack>
          <Link
            href="https://carlosgonzalez086.github.io/DaVincixCode/"
            style={{ textDecoration: "none" }}
          >
            <Typography
              fontSize={13}
              sx={{ opacity: 0.65, color: "primary.light" }}
            >
              © {year} Da VinciX Code Labs
              <br />
              Todos los derechos reservados.
            </Typography>
          </Link>
        </Stack>

        <Divider
          sx={{
            mt: 3,
            display: { xs: "block", md: "none" },
            borderColor: "rgba(255,255,255,0.1)",
          }}
        />
      </Box>
    </Box>
  );
};

export default Footer;
