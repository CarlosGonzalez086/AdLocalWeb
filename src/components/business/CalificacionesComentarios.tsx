import {
  CircularProgress,
  InputAdornment,
  Pagination,
  Rating,
  TextField,
} from "@mui/material";

import { useState, type CSSProperties, type FormEvent } from "react";

import Swal from "sweetalert2";

import { useCalificaciones } from "../../hooks/useCalificaciones";
import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";

interface Props {
  idComercio: number;
  colorPrimario?: string;
  colorSecundario?: string;
}

interface CommentsCSSProperties extends CSSProperties {
  "--comments-primary": string;
  "--comments-secondary": string;
}

const MAX_COMMENT_LENGTH = 250;
const WARNING_COMMENT_LENGTH = 220;

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const CalificacionesComentarios = ({
  idComercio,
  colorPrimario = "#5B3A29",
  colorSecundario = "#3A2419",
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

  const remainingCharacters = MAX_COMMENT_LENGTH - comentario.length;

  const isNearCommentLimit = comentario.length >= WARNING_COMMENT_LENGTH;

  const dynamicStyles: CommentsCSSProperties = {
    "--comments-primary": colorPrimario,
    "--comments-secondary": colorSecundario,
  };

  const handleEnviar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = nombre.trim();
    const cleanComment = comentario.trim();

    if (!cleanName || !cleanComment || !calificacion) {
      await Swal.fire(
        "Atención",
        "Completa todos los campos y selecciona una calificación.",
        "warning",
      );

      return;
    }

    if (cleanComment.length > MAX_COMMENT_LENGTH) {
      await Swal.fire(
        "Atención",
        `El comentario no puede exceder ${MAX_COMMENT_LENGTH} caracteres.`,
        "warning",
      );

      return;
    }

    await crearComentario({
      calificacion,
      comentario: cleanComment,
      idComercio,
      nombrePersona: cleanName,
    });

    setNombre("");
    setComentario("");
    setCalificacion(0);
  };

  const handleChangeOrder = () => {
    cambiarOrden(orderBy === "desc" ? "asc" : "desc");
  };

  return (
    <div className="calificacionesComentarios" style={dynamicStyles}>
      {/* =====================================================
          FORMULARIO
      ===================================================== */}

      <form className="calificacionesFormCard" onSubmit={handleEnviar}>
        <div className="calificacionesFormHeader">
          <span className="calificacionesFormHeaderIcon">
            <MaterialSymbol icon="edit_note" size="medium" />
          </span>

          <div>
            <h2 className="fz-h3 fw-bold mb-1">Deja tu comentario</h2>

            <p className="calificacionesFormDescription fz-h5 fw-regular mb-0">
              Comparte tu experiencia con este comercio.
            </p>
          </div>
        </div>

        <div className="calificacionesFormFields">
          <TextField
            fullWidth
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            placeholder="Tu nombre"
            autoComplete="name"
            className="calificacionesTextField"
            slotProps={{
              htmlInput: {
                maxLength: 100,
                "aria-label": "Tu nombre",
              },

              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <MaterialSymbol
                      icon="person"
                      size="medium"
                      className="calificacionesFieldIcon"
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            value={comentario}
            onChange={(event) => setComentario(event.target.value)}
            placeholder="Escribe tu comentario..."
            className="calificacionesTextField calificacionesCommentField"
            helperText={
              <span
                className={`calificacionesCharacterCounter fz-h6 fw-medium ${
                  isNearCommentLimit
                    ? "calificacionesCharacterCounterWarning"
                    : ""
                }`}
              >
                {remainingCharacters} caracteres disponibles
              </span>
            }
            slotProps={{
              htmlInput: {
                maxLength: MAX_COMMENT_LENGTH,
                "aria-label": "Comentario",
              },

              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    className="calificacionesCommentAdornment"
                  >
                    <MaterialSymbol
                      icon="chat_bubble"
                      size="medium"
                      className="calificacionesFieldIcon"
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* CALIFICACIÓN */}

          <div className="calificacionesRatingField">
            <div className="calificacionesRatingInformation">
              <span className="calificacionesRatingIcon">
                <MaterialSymbol icon="star" size="medium" filled />
              </span>

              <div className="calificacionesRatingTexts">
                <span className="fz-h4 fw-semibold">Calificación</span>

                <span className="calificacionesRatingDescription fz-h5 fw-regular">
                  Selecciona de 1 a 5 estrellas
                </span>
              </div>
            </div>

            <Rating
              value={calificacion}
              onChange={(_, value) => setCalificacion(value)}
              precision={1}
              className="calificacionesRating"
              aria-label="Seleccionar calificación"
              icon={<MaterialSymbol icon="star" size="medium" filled />}
              emptyIcon={<MaterialSymbol icon="star" size="medium" filled />}
            />
          </div>

          <button
            type="submit"
            className="btn-adlocal btn-adlocal--solid fz-h4 fw-semibold"
          >
            <div className="d-flex align-items-center justify-content-center gap-2">
              <MaterialSymbol icon="send" size="small" />

              <span>Enviar comentario</span>
            </div>
          </button>
        </div>
      </form>

      {/* =====================================================
          ENCABEZADO COMENTARIOS
      ===================================================== */}

      <div className="calificacionesCommentsHeader">
        <div className="calificacionesCommentsTitleContainer">
          <span className="calificacionesCommentsTitleIcon">
            <MaterialSymbol icon="forum" size="medium" />
          </span>

          <div>
            <h2 className="fz-h3 fw-bold mb-1">Comentarios</h2>

            <p className="calificacionesCommentsSubtitle fz-h5 fw-regular mb-0">
              {totalRecords > 0
                ? `${totalRecords} ${
                    totalRecords === 1
                      ? "opinión publicada"
                      : "opiniones publicadas"
                  }`
                : "Opiniones de los clientes"}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn-adlocal btn-adlocal--ghost btn-adlocal--sm fz-h5 fw-medium"
          onClick={handleChangeOrder}
        >
          <div className="d-flex align-items-center gap-2">
            <MaterialSymbol icon="sort" size="small" />

            <span>{orderBy === "desc" ? "Más antiguos" : "Más recientes"}</span>
          </div>
        </button>
      </div>

      {/* =====================================================
          LOADING / EMPTY / COMENTARIOS
      ===================================================== */}

      {loading ? (
        <div className="calificacionesLoadingState" aria-live="polite">
          <CircularProgress
            size={22}
            thickness={4}
            className="calificacionesLoadingSpinner"
          />

          <span className="fz-h4 fw-medium">Cargando comentarios...</span>
        </div>
      ) : comentarios.length === 0 ? (
        <div className="calificacionesEmptyState">
          <div className="calificacionesEmptyStateIcon">
            <MaterialSymbol icon="chat_bubble" size="large" />
          </div>

          <h3 className="fz-h3 fw-semibold mb-1">Aún no hay comentarios</h3>

          <p className="calificacionesEmptyStateDescription fz-h4 fw-regular mb-0">
            Comparte tu experiencia y sé la primera persona en dejar una
            opinión.
          </p>
        </div>
      ) : (
        <>
          <div className="calificacionesCommentsList">
            {comentarios.map((item) => {
              const initial =
                item.nombrePersona?.trim().charAt(0).toUpperCase() || "A";

              return (
                <article key={item.id} className="calificacionesCommentCard">
                  <div className="calificacionesAvatar fz-h3 fw-bold">
                    {initial}
                  </div>

                  <div className="calificacionesCommentContent">
                    <div className="calificacionesCommentHeader">
                      <div className="calificacionesCommentAuthorInformation">
                        <h3 className="fz-h4 fw-semibold mb-0">
                          {item.nombrePersona}
                        </h3>

                        <time
                          className="calificacionesCommentDate fz-h6 fw-regular"
                          dateTime={new Date(item.fechaCreacion).toISOString()}
                        >
                          {formatDate(item.fechaCreacion)}
                        </time>
                      </div>

                      <Rating
                        value={item.calificacion}
                        readOnly
                        size="small"
                        className="calificacionesCommentRating"
                        aria-label={`Calificación ${item.calificacion} de 5`}
                        icon={
                          <MaterialSymbol icon="star" size="small" filled />
                        }
                        emptyIcon={
                          <MaterialSymbol icon="star" size="small" filled />
                        }
                      />
                    </div>

                    <p className="calificacionesCommentText fz-h4 fw-regular mb-0">
                      {item.comentario}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="calificacionesPaginationContainer">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => cambiarPagina(value)}
                shape="rounded"
                siblingCount={0}
                boundaryCount={1}
                className="calificacionesPagination"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CalificacionesComentarios;
