import { useState } from "react";
import {
  TextField,
  Button,
  Rating,
  Card,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import Swal from "sweetalert2";
import { useCalificaciones } from "../../hooks/useCalificaciones";

interface Props {
  idComercio: number;
  colorPrimario?: string;
  colorSecundario?: string;
}

const CalificacionesComentarios = ({
  idComercio,
  colorPrimario = "#5B3A29",
  colorSecundario = "#f3e9de",
}: Props) => {
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState<number | null>(0);

  const { comentarios, loading, crearComentario, cambiarOrden, orderBy } =
    useCalificaciones(idComercio);

  const handleEnviar = async () => {
    if (!nombre || !comentario || !calificacion) {
      Swal.fire(
        "Atención",
        "Completa todos los campos y selecciona una calificación",
        "warning",
      );
      return;
    }

    if (comentario.length > 250) {
      Swal.fire(
        "Atención",
        "El comentario no puede exceder 250 caracteres",
        "warning",
      );
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
    <>
      {/* FORM */}
      <Card
        sx={{
          borderRadius: { xs: 3, sm: 4 },
          p: { xs: 2, sm: 3 },
          mb: 3,

          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",

          boxShadow: {
            xs: "0 6px 18px rgba(0,0,0,0.08)",
            sm: "0 14px 32px rgba(0,0,0,0.14)",
          },

          border: "1px solid rgba(255,255,255,0.6)",
        }}
      >
        <Typography
          sx={{
            mb: 2,
            fontWeight: 600,
            textAlign: "center",
            color: colorPrimario,
            fontSize: { xs: "1rem", sm: "1.1rem" },
          }}
        >
          ✍️ Deja tu comentario
        </Typography>

        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          <TextField
            fullWidth
            label="Comentario"
            multiline
            rows={3}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            inputProps={{ maxLength: 250 }}
            helperText={`${comentario.length}/250`}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* RATING */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Typography
              sx={{ fontWeight: 500, color: colorPrimario }}
            >
              Calificación
            </Typography>

            <Rating
              value={calificacion}
              onChange={(_, v) => setCalificacion(v)}
              sx={{ color: colorPrimario }}
            />
          </Stack>

          {/* BUTTON */}
          <Button
            onClick={handleEnviar}
            fullWidth
            sx={{
              mt: 1,
              py: 1.4,
              borderRadius: 999,
              fontWeight: 600,
              fontSize: "0.95rem",

              background: `linear-gradient(135deg, ${colorPrimario}, ${colorSecundario})`,
              color: "#fff",

              boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
              transition: "all 0.3s cubic-bezier(.4,0,.2,1)",

              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 28px rgba(0,0,0,0.24)",
              },
            }}
          >
            Enviar comentario
          </Button>
        </Stack>
      </Card>

      {/* HEADER */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={1}
        mb={2}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.05rem" },
            color: colorPrimario,
          }}
        >
          💬 Comentarios
        </Typography>

        <Button
          size="small"
          variant="outlined"
          onClick={() => cambiarOrden(orderBy === "desc" ? "asc" : "desc")}
          sx={{
            borderRadius: 999,
            fontSize: "0.75rem",
          }}
        >
          {orderBy === "desc" ? "Más antiguos" : "Más recientes"}
        </Button>
      </Stack>

      {/* LIST */}
      {loading ? (
        <Typography color="text.secondary">
          Cargando comentarios…
        </Typography>
      ) : comentarios.length === 0 ? (
        <Typography color="text.secondary">
          Aún no hay comentarios.
        </Typography>
      ) : (
        comentarios.map((c) => (
          <Card
            key={c.id}
            sx={{
              mb: 2,
              p: { xs: 2, sm: 2.5 },
              borderRadius: 3,

              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",

              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              transition: "all .25s ease",

              "&:hover": {
                transform: "scale(1.01)",
                boxShadow: "0 8px 22px rgba(0,0,0,0.16)",
              },
            }}
          >
            <Stack spacing={0.6}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  fontWeight={600}
                  color={colorPrimario}
                >
                  {c.nombrePersona}
                </Typography>

                <Rating
                  value={c.calificacion}
                  readOnly
                  size="small"
                  sx={{ color: colorPrimario }}
                />
              </Stack>

              <Typography
                sx={{
                  fontSize: "0.85rem",
                  lineHeight: 1.45,
                  color: "#555",
                }}
              >
                {c.comentario}
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: "text.secondary",
                }}
              >
                {new Date(c.fechaCreacion).toLocaleString()}
              </Typography>
            </Stack>
          </Card>
        ))
      )}
    </>
  );
};

export default CalificacionesComentarios;
