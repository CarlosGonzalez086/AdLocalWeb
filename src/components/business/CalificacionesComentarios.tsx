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

import styles from "../../styles/CalificacionesComentarios.module.css";

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
    <section className={styles.comments} style={dynamicStyles}>
      <form className={styles.formCard} onSubmit={handleEnviar}>
        <header className={styles.formHeader}>
          <span className={styles.formHeaderIcon}>
            <MaterialSymbol icon="edit_note" size="medium" />
          </span>

          <div>
            <h2 className={styles.formTitle}>Deja tu comentario</h2>

            <p className={styles.formDescription}>
              Comparte tu experiencia con este comercio.
            </p>
          </div>
        </header>

        <div className={styles.formFields}>
          <TextField
            fullWidth
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            placeholder="Tu nombre"
            autoComplete="name"
            className={styles.textField}
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
                      className={styles.fieldIcon}
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
            className={[styles.textField, styles.commentField].join(" ")}
            helperText={
              <span
                className={[
                  styles.characterCounter,
                  isNearCommentLimit ? styles.characterCounterWarning : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
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
                    className={styles.commentAdornment}
                  >
                    <MaterialSymbol
                      icon="chat_bubble"
                      size="medium"
                      className={styles.fieldIcon}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          <div className={styles.ratingField}>
            <div className={styles.ratingInformation}>
              <span className={styles.ratingIcon}>
                <MaterialSymbol icon="star" size="medium" filled />
              </span>

              <div>
                <span className={styles.ratingLabel}>Calificación</span>

                <span className={styles.ratingDescription}>
                  Selecciona de 1 a 5 estrellas
                </span>
              </div>
            </div>

            <Rating
              value={calificacion}
              onChange={(_, value) => setCalificacion(value)}
              precision={1}
              className={styles.rating}
              aria-label="Seleccionar calificación"
              icon={<MaterialSymbol icon="star" size="medium" filled />}
              emptyIcon={<MaterialSymbol icon="star" size="medium" filled />}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            <MaterialSymbol icon="send" size="small" />

            <span>Enviar comentario</span>
          </button>
        </div>
      </form>

      <div className={styles.commentsHeader}>
        <div className={styles.commentsTitleContainer}>
          <span className={styles.commentsTitleIcon}>
            <MaterialSymbol icon="forum" size="medium" />
          </span>

          <div>
            <h2 className={styles.commentsTitle}>Comentarios</h2>

            <p className={styles.commentsSubtitle}>
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
          className={styles.orderButton}
          onClick={handleChangeOrder}
        >
          <MaterialSymbol icon="sort" size="small" />

          <span>{orderBy === "desc" ? "Más antiguos" : "Más recientes"}</span>
        </button>
      </div>

      {loading ? (
        <div className={styles.loadingState} aria-live="polite">
          <CircularProgress
            size={22}
            thickness={4}
            className={styles.loadingSpinner}
          />

          <span>Cargando comentarios...</span>
        </div>
      ) : comentarios.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>
            <MaterialSymbol icon="chat_bubble" size="large" />
          </div>

          <h3 className={styles.emptyStateTitle}>Aún no hay comentarios</h3>

          <p className={styles.emptyStateDescription}>
            Comparte tu experiencia y sé la primera persona en dejar una
            opinión.
          </p>
        </div>
      ) : (
        <>
          <div className={styles.commentsList}>
            {comentarios.map((item) => {
              const initial =
                item.nombrePersona?.trim().charAt(0).toUpperCase() || "A";

              return (
                <article key={item.id} className={styles.commentCard}>
                  <div className={styles.avatar}>{initial}</div>

                  <div className={styles.commentContent}>
                    <header className={styles.commentHeader}>
                      <div>
                        <h3 className={styles.commentAuthor}>
                          {item.nombrePersona}
                        </h3>

                        <time
                          className={styles.commentDate}
                          dateTime={new Date(item.fechaCreacion).toISOString()}
                        >
                          {formatDate(item.fechaCreacion)}
                        </time>
                      </div>

                      <Rating
                        value={item.calificacion}
                        readOnly
                        size="small"
                        className={styles.commentRating}
                        aria-label={`Calificación ${item.calificacion} de 5`}
                        icon={
                          <MaterialSymbol icon="star" size="small" filled />
                        }
                        emptyIcon={
                          <MaterialSymbol icon="star" size="small" filled />
                        }
                      />
                    </header>

                    <p className={styles.commentText}>{item.comentario}</p>
                  </div>
                </article>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className={styles.paginationContainer}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => cambiarPagina(value)}
                shape="rounded"
                siblingCount={0}
                boundaryCount={1}
                className={styles.pagination}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CalificacionesComentarios;
