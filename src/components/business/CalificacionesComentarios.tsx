import { useState } from "react";
import { TextField, Button, Rating, Card, Typography, Box } from "@mui/material";

import Swal from "sweetalert2";
import { useCalificaciones } from "../../hooks/useCalificaciones";

interface Props {
  idComercio: number;
  colorPrimario?: string;
  colorSecundario?: string;
}

const CalificacionesComentarios = ({ idComercio, colorPrimario = "#5B3A29", colorSecundario = "#f3e9de" }: Props) => {
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState<number | null>(0);

  const {
    comentarios,
    loading,
    crearComentario,
    cambiarOrden,
    orderBy,
  } = useCalificaciones(idComercio);

  const handleEnviar = async () => {
    if (!nombre || !comentario || !calificacion) {
      Swal.fire("Atención", "Por favor completa todos los campos y selecciona una calificación", "warning");
      return;
    }

    if (comentario.length > 250) {
      Swal.fire("Atención", "El comentario no puede exceder 250 caracteres", "warning");
      return;
    }

    await crearComentario({
      calificacion,
      comentario,
      idComercio,
      nombrePersona: nombre,
    });

    setNombre("");
    setComentario("");
    setCalificacion(0);
  };

  return (
    <div className="container py-4">
      <Card
        className="p-3 mb-4 shadow-sm"
        sx={{
          borderRadius: 3,
          background: "linear-gradient(145deg, #fff, #f8f8f8)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: colorPrimario }}>
          ¡Deja tu comentario!
        </Typography>

        <TextField
          fullWidth
          label="Nombre"
          variant="outlined"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mb-3"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />

        <TextField
          fullWidth
          label="Comentario"
          variant="outlined"
          multiline
          rows={3}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="mb-3"
          sx={{
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
          inputProps={{ maxLength: 250 }}
          helperText={`${comentario.length}/250`}
        />

        <Box className="d-flex align-items-center mb-3">
          <Typography sx={{ mr: 2, color: colorPrimario, fontWeight: 500 }}>
            Calificación
          </Typography>
          <Rating
            name="calificacion"
            value={calificacion}
            onChange={(_, newValue) => setCalificacion(newValue)}
            precision={1}
            sx={{
              color: colorPrimario,
            }}
          />
        </Box>

        <Button
          fullWidth
          onClick={handleEnviar}
          sx={{
            borderRadius: 3,
            py: 1.5,
            fontWeight: 600,
            background: `linear-gradient(135deg, ${colorPrimario}, ${colorSecundario})`,
            color: "#fff",
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            transition: "all 0.3s",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 10px 24px rgba(0,0,0,0.16)",
            },
          }}
        >
          Enviar
        </Button>
      </Card>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <Typography variant="h6" sx={{ color: colorPrimario, fontWeight: 600 }}>
          Comentarios
        </Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={() => cambiarOrden(orderBy === "desc" ? "asc" : "desc")}
        >
          {orderBy === "desc" ? "Más antiguos" : "Más recientes"}
        </Button>
      </div>

      {loading ? (
        <Typography>Cargando comentarios...</Typography>
      ) : comentarios.length === 0 ? (
        <Typography sx={{ color: "#888" }}>No hay comentarios aún.</Typography>
      ) : (
        comentarios.map((c) => (
          <Card
            key={c.id}
            className="mb-3 p-3 shadow-sm"
            sx={{
              borderRadius: 3,
              background: "#fff",
              transition: "all 0.2s",
              "&:hover": { transform: "scale(1.01)" },
            }}
          >
            <Box className="d-flex justify-content-between align-items-center mb-1">
              <Typography sx={{ fontWeight: 600, color: colorPrimario }}>
                {c.nombrePersona}
              </Typography>
              <Rating value={c.calificacion} readOnly size="small" sx={{ color: colorPrimario }} />
            </Box>
            <Typography sx={{ color: "#555", fontSize: 14, mb: 1 }}>
              {c.comentario}
            </Typography>
            <Typography sx={{ color: "#aaa", fontSize: 12 }}>
              {new Date(c.fechaCreacion).toLocaleString()}
            </Typography>
          </Card>
        ))
      )}
    </div>
  );
};

export default CalificacionesComentarios;
