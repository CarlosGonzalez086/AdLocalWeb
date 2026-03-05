import {
  Box,
  Typography,
  Link,
  IconButton,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import type { FC } from "react";

const LOGO_URL =
  "https://uzgnfwbztoizcctyfdiv.supabase.co/storage/v1/object/public/Imagenes/AZuAXHqalTLlz8th7NMdBA-AZuAXHqaHD92HliWBxJzdA.jpg";

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
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        backgroundColor: "rgba(18,18,18,0.92)",
        color: "#fff",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 3, sm: 4 }, py: { xs: 4, md: 5 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 0 }}
          alignItems={{ xs: "center", md: "flex-start" }}
          justifyContent="space-between"
        >
          <Stack spacing={1.5} alignItems={{ xs: "center", md: "flex-start" }}>
            <Stack direction="row" alignItems="center" spacing={1.2}>
              <Box
                component="img"
                src={LOGO_URL}
                alt="ADLocal"
                sx={{
                  height: 32,
                  width: 32,
                  borderRadius: "50%",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                }}
              />
              <Typography fontWeight={700} fontSize={16} letterSpacing="-0.01em">
                ADLocal
              </Typography>
            </Stack>

            <Typography
              fontSize={13}
              sx={{ opacity: 0.5, maxWidth: 200, lineHeight: 1.5, textAlign: { xs: "center", md: "left" } }}
            >
              Conectando negocios locales con su comunidad.
            </Typography>
            <Stack direction="row" spacing={0.8} mt={0.5}>
              <IconButton
                aria-label="Facebook"
                size="small"
                sx={{
                  color: "#fff",
                  bgcolor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 999,
                  width: 34,
                  height: 34,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#1877F2",
                    borderColor: "#1877F2",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <FacebookIcon sx={{ fontSize: 18 }} />
              </IconButton>

              <IconButton
                aria-label="Instagram"
                size="small"
                sx={{
                  color: "#fff",
                  bgcolor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 999,
                  width: 34,
                  height: 34,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#E1306C",
                    borderColor: "#E1306C",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <InstagramIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>
          </Stack>
          <Stack
            spacing={1.5}
            alignItems="center"
            sx={{
              px: { xs: 3, sm: 5 },
              py: { xs: 2.5, sm: 3 },
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              textAlign: "center",
            }}
          >
            <Typography fontWeight={700} fontSize="0.95rem">
              ¿Tienes un negocio?
            </Typography>
            <Typography fontSize={13} sx={{ opacity: 0.55, maxWidth: 220, lineHeight: 1.5 }}>
              Únete a ADLocal y llega a más clientes en tu comunidad
            </Typography>
            <Button
              variant="contained"
              href={registroUrl}
              startIcon={<StorefrontRoundedIcon sx={{ fontSize: 17 }} />}
              sx={{
                textTransform: "none",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: "0.85rem",
                px: 2.5,
                py: 1,
                background: "linear-gradient(135deg, #007AFF, #005FCC)",
                boxShadow: "0 6px 18px rgba(0,122,255,0.35)",
                transition: "all 0.25s ease",
                "&:hover": {
                  boxShadow: "0 10px 24px rgba(0,122,255,0.48)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              Registrarme
            </Button>
          </Stack>

          <Stack spacing={1} alignItems={{ xs: "center", md: "flex-end" }}>
            <Link
              href="https://carlosgonzalez086.github.io/DaVincixCode/"
              underline="none"
              sx={{
                transition: "opacity 0.2s",
                "&:hover": { opacity: 0.8 },
              }}
            >
              <Typography
                fontSize={13}
                fontWeight={600}
                sx={{ color: "rgba(255,255,255,0.55)", textAlign: { xs: "center", md: "right" } }}
              >
                Da VinciX Code Labs
              </Typography>
            </Link>
            <Typography
              fontSize={12}
              sx={{ opacity: 0.35, textAlign: { xs: "center", md: "right" } }}
            >
              © {year} Todos los derechos reservados.
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ mt: { xs: 4, md: 4 }, borderColor: "rgba(255,255,255,0.07)" }} />

        <Typography
          fontSize={11}
          textAlign="center"
          sx={{ opacity: 0.25, mt: 2 }}
        >
          ADLocal · Hecho con ❤️ en México
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;