import { useCallback, useEffect, useState, type FC } from "react";

import Swal from "sweetalert2";

import {
  comercioPublicApi,
  type ComercioDto,
  type ProductoServicioDto,
} from "../../services/comercioPublicApi";

import { useRegistrarVisita } from "../../hooks/useRegistrarVisita";

import { useCarrito } from "../../hooks/useCarrito";

import { getUsuarioSesion } from "../../utils/usuarioSesion";

import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";

import ComercioDetalle from "./ComercioDetalle";
import ReservarCitaModal from "./ReservarCitaModal";

interface ComercioProps {
  id: number;
}

const Comercio: FC<ComercioProps> = ({ id }) => {
  const [comercio, setComercio] = useState<ComercioDto | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [productoCita, setProductoCita] = useState<ProductoServicioDto | null>(null);

  useRegistrarVisita(id);

  const {
    productos: productosCarrito,

    loading: loadingCarrito,

    agregarProducto,

    incrementarCantidad,

    disminuirCantidad,

    eliminarProducto,
  } = useCarrito();

  // ==========================================
  // CARGAR COMERCIO
  // ==========================================

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

  // ==========================================
  // VALIDAR SESIÓN
  // ==========================================

  const validarSesion = useCallback(() => {
    const usuario = getUsuarioSesion();

    if (usuario) {
      return true;
    }

    const returnUrl = `${window.location.pathname}${window.location.search}`;

    window.location.href = `/usuario/login?returnUrl=${encodeURIComponent(
      returnUrl,
    )}`;

    return false;
  }, []);

  // ==========================================
  // AGREGAR
  // ==========================================

  const handleAgregarCarrito = useCallback(
    async (producto: ProductoServicioDto) => {
      if (!validarSesion()) {
        return;
      }

      const success = await agregarProducto({
        productoUuid: producto.uuid,

        cantidad: 1,
      });

      if (!success) {
        return;
      }

      await Swal.fire({
        icon: "success",

        title: "Agregado al carrito",

        text: `${producto.nombre} fue agregado correctamente.`,

        timer: 1000,

        timerProgressBar: true,

        showConfirmButton: false,
      });
    },
    [agregarProducto, validarSesion],
  );

  // ==========================================
  // INCREMENTAR
  // ==========================================

  const handleIncrementarCantidad = useCallback(
    async (detalleUuid: string) => {
      if (!validarSesion()) {
        return false;
      }

      return await incrementarCantidad(detalleUuid);
    },
    [incrementarCantidad, validarSesion],
  );

  // ==========================================
  // DISMINUIR
  // ==========================================

  const handleDisminuirCantidad = useCallback(
    async (detalleUuid: string) => {
      if (!validarSesion()) {
        return false;
      }

      return await disminuirCantidad(detalleUuid);
    },
    [disminuirCantidad, validarSesion],
  );

  // ==========================================
  // ELIMINAR
  // ==========================================

  const handleEliminarProducto = useCallback(
    async (detalleUuid: string) => {
      if (!validarSesion()) {
        return false;
      }

      return await eliminarProducto(detalleUuid);
    },
    [eliminarProducto, validarSesion],
  );

  // ==========================================
  // RESERVACIÓN
  // ==========================================

  const handleReservar = useCallback(
    (producto: ProductoServicioDto) => {
      if (!validarSesion()) {
        return;
      }

      setProductoCita(producto);
    },
    [validarSesion],
  );

  // ==========================================
  // COTIZACIÓN
  // ==========================================

  const handleCotizar = useCallback(
    (producto: ProductoServicioDto) => {
      if (!validarSesion()) {
        return;
      }

      window.location.href = `/usuario/cotizacion/${producto.uuid}`;
    },
    [validarSesion],
  );

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="comercioLoadingState" aria-busy="true" aria-live="polite">
        <div className="comercioLoadingIconContainer">
          <MaterialSymbol
            icon="progress_activity"
            size="large"
            className="comercioLoadingIcon"
          />
        </div>

        <div className="comercioLoadingContent">
          <h1 className="fz-h2 fw-bold mb-1">Cargando comercio</h1>

          <p className="comercioLoadingDescription fz-h4 fw-regular mb-0">
            Estamos preparando la información del negocio.
          </p>
        </div>

        <div className="comercioLoadingProgress" aria-hidden="true">
          <span />
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="comercioStateContainer" role="alert">
        <div className="comercioStateIcon comercioStateIconError">
          <MaterialSymbol icon="cloud_off" size="large" />
        </div>

        <h1 className="fz-h2 fw-bold mb-0">No pudimos cargar el comercio</h1>

        <p className="comercioStateDescription fz-h4 fw-regular">{error}</p>

        <div className="comercioStateActions">
          <button
            type="button"
            className="btn-adlocal btn-adlocal--solid fz-h4 fw-semibold"
            onClick={() => void fetchComercio()}
          >
            <div className="d-flex align-items-center justify-content-center gap-2">
              <MaterialSymbol icon="refresh" size="small" />

              <span>Intentar nuevamente</span>
            </div>
          </button>

          <a
            href="/"
            className="btn-adlocal btn-adlocal--ghost fz-h4 fw-medium text-decoration-none"
          >
            <div className="d-flex align-items-center justify-content-center gap-2">
              <MaterialSymbol icon="arrow_back" size="small" />

              <span>Regresar al inicio</span>
            </div>
          </a>
        </div>
      </div>
    );
  }

  // ==========================================
  // NO ENCONTRADO
  // ==========================================

  if (!comercio) {
    return (
      <div className="comercioStateContainer" aria-live="polite">
        <div className="comercioStateIcon">
          <MaterialSymbol icon="storefront" size="large" />
        </div>

        <h1 className="fz-h2 fw-bold mb-0">Comercio no encontrado</h1>

        <p className="comercioStateDescription fz-h4 fw-regular">
          El comercio solicitado no existe, fue eliminado o ya no se encuentra
          disponible.
        </p>

        <a
          href="/"
          className="btn-adlocal btn-adlocal--solid fz-h4 fw-semibold text-decoration-none"
        >
          <div className="d-flex align-items-center justify-content-center gap-2">
            <MaterialSymbol icon="storefront" size="small" />

            <span>Explorar comercios</span>
          </div>
        </a>
      </div>
    );
  }

  // ==========================================
  // DETALLE
  // ==========================================

  return (
    <div className="comercioDetailContainer">
      <ComercioDetalle
        comercio={comercio}
        productos={comercio.productos ?? []}
        productosCarrito={productosCarrito}
        loadingCarrito={loadingCarrito}
        onAgregarCarrito={handleAgregarCarrito}
        onIncrementarCantidad={handleIncrementarCantidad}
        onDisminuirCantidad={handleDisminuirCantidad}
        onEliminarProducto={handleEliminarProducto}
        onReservar={handleReservar}
        onCotizar={handleCotizar}
      />
      <ReservarCitaModal producto={productoCita} onClose={() => setProductoCita(null)} />
    </div>
  );
};

export default Comercio;
