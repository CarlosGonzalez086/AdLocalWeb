import { Box, Typography, Stack } from "@mui/material";
import type { ProductoServicioDto } from "../../services/comercioPublicApi";

interface Props {
  producto: ProductoServicioDto;
}

export default function ProductoCard({ producto }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.15)",
        },
      }}
    >
      {producto.logoUrl && (
        <Box
          component="img"
          src={producto.logoUrl}
          alt={producto.nombre}
          sx={{
            width: { xs: 100, sm: 120 },
            height: { xs: 100, sm: 120 },
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      )}

      <Stack spacing={0.5} sx={{ p: 2, flex: 1 }}>
        <Typography
          fontWeight={700}
          variant="subtitle1"
          sx={{ lineHeight: 1.2 }}
        >
          {producto.nombre}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {producto.descripcion}
        </Typography>

        {producto.precio != null && (
          <Typography fontWeight={700} color="primary">
            ${producto.precio.toFixed(2)}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
