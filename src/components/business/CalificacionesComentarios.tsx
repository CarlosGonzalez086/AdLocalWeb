import { useState } from "react";
import {
  TextField,
  Button,
  Rating,
  Card,
  Typography,
  Box,
  Stack,
  Pagination,
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

  const {
    comentarios,
    loading,
    crearComentario,
    cambiarOrden,
    orderBy,
    page,
    pageSize,
    totalRecords,
    cambiarPagina,
  } = useCalificaciones(idComercio);

  const totalPages = Math.ceil(totalRecords / pageSize);

  const handleEnviar = async () => {
    if (!nombre || !comentario || !calificacion) {
      Swal.fire(
        "Atención",
        "Completa todos los campos y selecciona una calificación",
        "warning"
      );
      return;
    }

    if (comentario.length > 250) {
      Swal.fire(
        "Atención",
        "El comentario no puede exceder 250 caracteres",
        "warning"
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
      {/* FORMULARIO */}
      <Card
        sx={{
          borderRadius: { xs: 3, sm: 4 },
          p: { xs: 2, sm: 3 },
          mb: 3,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(16px) saturate(180%)",
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
          />

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography fontWeight={500} color={colorPrimario}>
              Calificación
            </Typography>
            <Rating
              value={calificacion}
              onChange={(_, v) => setCalificacion(v)}
              sx={{ color: colorPrimario }}
            />
          </Stack>

          <Button
            onClick={handleEnviar}
            fullWidth
            sx={{
              mt: 1,
              py: 1.4,
              borderRadius: 999,
              fontWeight: 600,
              background: `linear-gradient(135deg, ${colorPrimario}, ${colorSecundario})`,
              color: "#fff",
            }}
          >
            Enviar comentario
          </Button>
        </Stack>
      </Card>

      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontWeight={600} color={colorPrimario}>
          💬 Comentarios
        </Typography>

        <Button
          size="small"
          variant="outlined"
          onClick={() => cambiarOrden(orderBy === "desc" ? "asc" : "desc")}
          sx={{ borderRadius: 999 }}
        >
          {orderBy === "desc" ? "Más antiguos" : "Más recientes"}
        </Button>
      </Stack>

      {/* LISTA */}
      {loading ? (
        <Typography color="text.secondary">
          Cargando comentarios…
        </Typography>
      ) : comentarios.length === 0 ? (
        <Typography color="text.secondary">
          Aún no hay comentarios.
        </Typography>
      ) : (
        <>
          {comentarios.map((c) => (
            <Card
              key={c.id}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 3,
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              }}
            >
              <Stack spacing={0.6}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight={600} color={colorPrimario}>
                    {c.nombrePersona}
                  </Typography>

                  <Rating
                    value={c.calificacion}
                    readOnly
                    size="small"
                    sx={{ color: colorPrimario }}
                  />
                </Stack>

                <Typography fontSize="0.85rem" color="#555">
                  {c.comentario}
                </Typography>

                <Typography fontSize="0.7rem" color="text.secondary">
                  {new Date(c.fechaCreacion).toLocaleString()}
                </Typography>
              </Stack>
            </Card>
          ))}

          {/* PAGINACIÓN */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => cambiarPagina(value)}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default CalificacionesComentarios;
