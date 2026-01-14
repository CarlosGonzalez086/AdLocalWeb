
import { useEffect, useState } from "react";
import {
  comercioPublicApi,
  type ComercioDto,
} from "../../services/comercioPublicApi";
import ComercioDetalle from "./ComercioDetalle";
import { Box, CircularProgress, Typography } from "@mui/material";

interface ComercioProps {
  id: number;
}

const Comercio: React.FC<ComercioProps> = ({ id }) => {
  const [comercio, setComercio] = useState<ComercioDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComercio = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await comercioPublicApi.getById(id);
      setComercio(response.data.respuesta ?? null);
    } catch (err) {
      console.error(err);
      setError("Error al cargar el comercio");
      setComercio(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComercio();
  }, [id]);

  if (loading)
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          background: "transparent",
          borderRadius: 3,
          p: 3,
        }}
      >
        <CircularProgress size={60} thickness={4.5} sx={{ color: "#6F4E37" }} />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "1.1rem",
            color: "text.secondary",
            letterSpacing: "0.3px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        >
          Cargando comercio...
        </Typography>
        <style>{`
            @keyframes pulse {
              0% { opacity: 0.4; }
              50% { opacity: 1; }
              100% { opacity: 0.4; }
            }
          `}</style>
      </Box>
    );
  if (error) return <div>Error: {error}</div>;
  if (!comercio) return <div>Comercio no encontrado</div>;

  return (
    <ComercioDetalle comercio={comercio} productos={comercio.productos ?? []} />
  );
};

export default Comercio;
