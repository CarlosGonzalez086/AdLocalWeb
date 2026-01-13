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
          transition: "all 0.35s ease",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
          },
        }}
      >
        <Box
          sx={{
            height: 120,
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
            sx={{
              width: 90,
              height: 90,
              border: "4px solid #fff",
              backgroundColor: "#fff",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              position: "absolute",
              bottom: -45,
            }}
          />
        </Box>

        <CardContent sx={{ pt: 6 }}>
          <Stack spacing={1} alignItems="center">
            <Typography
              variant="h6"
              fontWeight={700}
              textAlign="center"
              sx={{
                color: comercio.colorPrimario,
                lineHeight: 1.2,
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
              }}
            >
              {comercio.nombre}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{
                px: 1,
                lineHeight: 1.4,
                fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
              }}
            >
              {comercio.direccion}
            </Typography>

            <Chip
              label="Ver más detalles"
              icon={<ArrowForwardIosIcon fontSize="small" />}
              sx={{
                mt: 1.5,
                px: 2,
                py: 1,
                fontWeight: 600,
                fontSize: "0.8rem",
                borderRadius: 50,
                backgroundColor: comercio.colorSecundario,
                color: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 0.95,
                  transform: "scale(1.08)",
                },
              }}
            />
          </Stack>
        </CardContent>
      </Card>
    </a>
  );
}
