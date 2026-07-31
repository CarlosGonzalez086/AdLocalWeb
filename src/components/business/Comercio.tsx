import { useCallback, useEffect, useState, type FC } from "react";

import {
  comercioPublicApi,
  type ComercioDto,
} from "../../services/comercioPublicApi";

import { useRegistrarVisita } from "../../hooks/useRegistrarVisita";

import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";
import ComercioDetalle from "./ComercioDetalle";

import styles from "../../styles/Comercio.module.css";

interface ComercioProps {
  id: number;
}

const Comercio: FC<ComercioProps> = ({ id }) => {
  const [comercio, setComercio] = useState<ComercioDto | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useRegistrarVisita(id);

  const fetchComercio = useCallback(async () => {
    if (!id || id <= 0) {
      setComercio(null);
      setError("El identificador del comercio no es válido.");
      setLoading(false);

      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await comercioPublicApi.getById(id);

      const comercioEncontrado = response.data.respuesta ?? null;

      setComercio(comercioEncontrado);
    } catch (error) {
      console.error("Error al consultar el comercio:", error);

      setError("No fue posible cargar la información del comercio.");

      setComercio(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void fetchComercio();
  }, [fetchComercio]);

  if (loading) {
    return (
      <section
        className={styles.loadingState}
        aria-busy="true"
        aria-live="polite"
      >
        <div className={styles.loadingIconContainer}>
          <MaterialSymbol
            icon="progress_activity"
            size="large"
            className={styles.loadingIcon}
          />
        </div>

        <div className={styles.loadingContent}>
          <h1 className={styles.loadingTitle}>Cargando comercio</h1>

          <p className={styles.loadingDescription}>
            Estamos preparando la información del negocio.
          </p>
        </div>

        <div className={styles.loadingProgress} aria-hidden="true">
          <span />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.stateContainer} role="alert">
        <div className={[styles.stateIcon, styles.errorIcon].join(" ")}>
          <MaterialSymbol icon="cloud_off" size="large" />
        </div>

        <h1 className={styles.stateTitle}>No pudimos cargar el comercio</h1>

        <p className={styles.stateDescription}>{error}</p>

        <button
          type="button"
          className={styles.retryButton}
          onClick={() => void fetchComercio()}
        >
          <MaterialSymbol icon="refresh" size="small" />

          <span>Intentar nuevamente</span>
        </button>

        <a href="/" className={styles.secondaryButton}>
          <MaterialSymbol icon="arrow_back" size="small" />

          <span>Regresar al inicio</span>
        </a>
      </section>
    );
  }

  if (!comercio) {
    return (
      <section className={styles.stateContainer} aria-live="polite">
        <div className={styles.stateIcon}>
          <MaterialSymbol icon="storefront" size="large" />
        </div>

        <h1 className={styles.stateTitle}>Comercio no encontrado</h1>

        <p className={styles.stateDescription}>
          El comercio solicitado no existe, fue eliminado o ya no se encuentra
          disponible.
        </p>

        <a href="/" className={styles.primaryLink}>
          <MaterialSymbol icon="storefront" size="small" />

          <span>Explorar comercios</span>
        </a>
      </section>
    );
  }

  return (
    <div className={styles.detailContainer}>
      <ComercioDetalle
        comercio={comercio}
        productos={comercio.productos ?? []}
      />
    </div>
  );
};

export default Comercio;
