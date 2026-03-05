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
  Avatar,
  InputAdornment,
} from "@mui/material";
import Swal from "sweetalert2";
import { useCalificaciones } from "../../hooks/useCalificaciones";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SortRoundedIcon from "@mui/icons-material/SortRounded";

interface Props {
  idComercio: number;
  colorPrimario?: string;
  colorSecundario?: string;
}

const fieldSx = (color: string) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    bgcolor: "#fff",
    "& fieldset": { borderColor: "#E0E0E0" },
    "&:hover fieldset": { borderColor: "#BDBDBD" },
    "&.Mui-focused fieldset": { borderColor: color },
  },
  "& .MuiInputLabel-root.Mui-focused": { color },
});

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
      Swal.fire("Atención", "Completa todos los campos y selecciona una calificación", "warning");
      return;
    }
    if (comentario.length > 250) {
      Swal.fire("Atención", "El comentario no puede exceder 250 caracteres", "warning");
      return;
    }
    await crearComentario({ calificacion, comentario, idComercio, nombrePersona: nombre });
    setNombre("");
    setComentario("");
    setCalificacion(0);
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          p: { xs: 2.5, sm: 3 },
          mb: 3,
          bgcolor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Typography
          sx={{
            mb: 2.5,
            fontWeight: 700,
            fontSize: "0.95rem",
            color: colorPrimario,
            display: "flex",
            alignItems: "center",
            gap: 0.8,
          }}
        >
          ✍️ Deja tu comentario
        </Typography>

        <Stack spacing={2}>
          <TextField
            fullWidth
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sx={fieldSx(colorPrimario)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon sx={{ color: "#9E9E9E", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            placeholder="Escribe tu comentario..."
            multiline
            rows={3}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            inputProps={{ maxLength: 250 }}
            helperText={
              <Typography component="span" sx={{ fontSize: "0.72rem", color: comentario.length > 220 ? "error.main" : "text.disabled" }}>
                {comentario.length}/250
              </Typography>
            }
            sx={fieldSx(colorPrimario)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
                  <ChatBubbleOutlineIcon sx={{ color: "#9E9E9E", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 1.2,
              borderRadius: "12px",
              border: "1px solid #E0E0E0",
              bgcolor: "#fff",
            }}
          >
            <Typography fontSize="0.875rem" fontWeight={500} color="text.secondary">
              Calificación
            </Typography>
            <Rating
              value={calificacion}
              onChange={(_, v) => setCalificacion(v)}
              sx={{ color: colorPrimario }}
            />
          </Box>

          <Button
            onClick={handleEnviar}
            fullWidth
            sx={{
              py: 1.4,
              borderRadius: 999,
              fontWeight: 700,
              fontSize: "0.9rem",
              textTransform: "none",
              background: `linear-gradient(135deg, ${colorPrimario}, ${colorSecundario})`,
              color: "#fff",
              boxShadow: `0 6px 18px ${colorPrimario}40`,
              "&:hover": {
                boxShadow: `0 8px 24px ${colorPrimario}55`,
              },
            }}
          >
            Enviar comentario
          </Button>
        </Stack>
      </Card>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography fontWeight={700} fontSize="0.95rem" color={colorPrimario}>
          💬 Comentarios
          {totalRecords > 0 && (
            <Typography component="span" sx={{ ml: 0.8, fontSize: "0.78rem", color: "text.disabled", fontWeight: 400 }}>
              ({totalRecords})
            </Typography>
          )}
        </Typography>

        <Button
          size="small"
          onClick={() => cambiarOrden(orderBy === "desc" ? "asc" : "desc")}
          startIcon={<SortRoundedIcon sx={{ fontSize: 16 }} />}
          sx={{
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.78rem",
            color: colorPrimario,
            borderColor: colorPrimario,
            border: "1px solid",
            px: 1.5,
            py: 0.5,
            "&:hover": { bgcolor: `${colorPrimario}10` },
          }}
        >
          {orderBy === "desc" ? "Más antiguos" : "Más recientes"}
        </Button>
      </Stack>

      {loading ? (
        <Box textAlign="center" py={4}>
          <Typography color="text.secondary" fontSize="0.875rem">
            Cargando comentarios…
          </Typography>
        </Box>
      ) : comentarios.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography fontSize="1.8rem">💬</Typography>
          <Typography color="text.secondary" fontSize="0.875rem" mt={0.5}>
            Aún no hay comentarios. ¡Sé el primero!
          </Typography>
        </Box>
      ) : (
        <>
          <Stack spacing={1.5}>
            {comentarios.map((c) => (
              <Card
                key={c.id}
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  borderRadius: 4,
                  bgcolor: "rgba(255,255,255,0.95)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
                  },
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: colorPrimario,
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {c.nombrePersona?.charAt(0).toUpperCase()}
                  </Avatar>

                  <Box flex={1} minWidth={0}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={0.5}>
                      <Typography fontWeight={700} fontSize="0.88rem" color={colorPrimario}>
                        {c.nombrePersona}
                      </Typography>
                      <Rating
                        value={c.calificacion}
                        readOnly
                        size="small"
                        sx={{ color: colorPrimario, fontSize: "0.9rem" }}
                      />
                    </Stack>

                    <Typography fontSize="0.83rem" color="text.secondary" mt={0.5} sx={{ lineHeight: 1.5 }}>
                      {c.comentario}
                    </Typography>

                    <Typography fontSize="0.7rem" color="text.disabled" mt={0.8}>
                      {new Date(c.fechaCreacion).toLocaleString("es-MX", {
                        day: "2-digit", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            ))}
          </Stack>

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => cambiarPagina(value)}
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: 999,
                    fontWeight: 600,
                    "&.Mui-selected": {
                      bgcolor: colorPrimario,
                      color: "#fff",
                      "&:hover": { bgcolor: colorSecundario },
                    },
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default CalificacionesComentarios;