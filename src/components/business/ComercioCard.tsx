import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Chip,
  Box,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import type { ComercioDtoListItem } from "../../services/comercioPublicApi";
import { slugifyConId } from "../../utils/generals";

interface Props {
  comercio: ComercioDtoListItem;
}

export default function ComercioCard({ comercio }: Props) {
  const slug = slugifyConId(comercio.id, comercio.nombre);

  return (
    <a href={`/comercios/${slug}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          cursor: "pointer",
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          transition: "transform 0.35s ease, box-shadow 0.35s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 14px 32px rgba(0,0,0,0.16)",
          },
          width: "100%",
          maxWidth: { xs: "100%", sm: 360 },
          height: 300, 
          display: "flex",
          flexDirection: "column",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            height: 110,
            background: `linear-gradient(135deg, ${comercio.colorPrimario}, ${comercio.colorSecundario})`,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            position: "relative",
            pb: 1.5,
          }}
        >
          <Avatar
            src={comercio.logoUrl}
            alt={comercio.nombre}
            sx={{
              width: 84,
              height: 84,
              border: "3px solid #fff",
              backgroundColor: "#fff",
              boxShadow: "0 6px 16px rgba(0,0,0,0.22)",
              position: "absolute",
              bottom: -42,
            }}
          />
        </Box>

        <CardContent sx={{ pt: 6, pb: 3 }}>
          <Stack spacing={1.1} alignItems="center">
            <Typography
              fontWeight={700}
              textAlign="center"
              sx={{
                color: comercio.colorPrimario,
                lineHeight: 1.25,
                fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
              }}
            >
              {comercio.nombre}
            </Typography>

            <Typography
              color="text.secondary"
              textAlign="center"
              sx={{
                px: 1,
                lineHeight: 1.45,
                fontSize: "0.78rem",
              }}
            >
              {comercio.direccion}
            </Typography>

            <Chip
              label="Ver detalles"
              icon={<ArrowForwardIosIcon fontSize="inherit" />}
              sx={{
                mt: 1.5,
                height: 34,
                px: 2,
                fontWeight: 600,
                fontSize: "0.75rem",
                borderRadius: 999,
                backgroundColor: comercio.colorPrimario,
                color: "#fff",
                boxShadow: "0 3px 10px rgba(0,0,0,0.18)",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "scale(1.06)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
                },
              }}
            />
          </Stack>
        </CardContent>
      </Card>
    </a>
  );
}
