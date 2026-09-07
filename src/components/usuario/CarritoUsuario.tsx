import { Alert, Button, Skeleton } from "@mui/material";

import Swal from "sweetalert2";

import type { CarritoDto } from "../../services/carritoApi";

import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";

interface Props {
  carrito: CarritoDto | null;

  subtotal: number;

  totalProductos: number;

  tieneProductos: boolean;

  loading: boolean;

  error: string | null;

  incrementarCantidad: (detalleUuid: string) => Promise<boolean>;

  disminuirCantidad: (detalleUuid: string) => Promise<boolean>;

  eliminarProducto: (detalleUuid: string) => Promise<boolean>;

  vaciarCarrito: () => Promise<boolean>;

  clearError: () => void;
}

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export default function CarritoUsuario({
  carrito,
  subtotal,
  totalProductos,
  tieneProductos,
  loading,
  error,
  incrementarCantidad,
  disminuirCantidad,
  eliminarProducto,
  vaciarCarrito,
  clearError,
}: Props) {
  // ==========================================
  // ELIMINAR PRODUCTO
  // ==========================================

  const handleEliminar = async (uuid: string, nombre: string) => {
    const result = await Swal.fire({
      icon: "question",

      title: "Eliminar producto",

      text: `¿Deseas eliminar ${nombre} de tu carrito?`,

      showCancelButton: true,

      confirmButtonText: "Sí, eliminar",

      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) {
      return;
    }

    await eliminarProducto(uuid);
  };

  // ==========================================
  // VACIAR CARRITO
  // ==========================================

  const handleVaciar = async () => {
    const result = await Swal.fire({
      icon: "warning",

      title: "Vaciar carrito",

      text: "Se eliminarán todos los productos de todos los comercios de tu carrito.",

      showCancelButton: true,

      confirmButtonText: "Vaciar carrito",

      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) {
      return;
    }

    await vaciarCarrito();
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading && !carrito) {
    return (
      <div className="usuarioCarritoPage">
        <div className="container py-4 py-lg-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <Skeleton variant="rounded" height={130} className="mb-4" />

              <Skeleton variant="rounded" height={180} className="mb-3" />

              <Skeleton variant="rounded" height={180} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VISTA
  // ==========================================

  return (
    <div className="usuarioCarritoPage">
      <div className="container py-4 py-lg-5">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            {/* =========================
                HEADER
            ========================== */}

            <div className="usuarioCarritoHeader">
              <div>
                <span className="usuarioCuentaEyebrow">Mi compra</span>

                <h1 className="usuarioCuentaTitle">Mi carrito</h1>

                <p className="usuarioCuentaDescription">
                  Revisa los productos de tus comercios antes de continuar con
                  el pedido.
                </p>
              </div>

              {tieneProductos && (
                <Button
                  type="button"
                  className="btn-adlocal btn-adlocal--danger btn-adlocal--sm"
                  disabled={loading}
                  onClick={handleVaciar}
                >
                  <MaterialSymbol icon="delete_sweep" size="small" />

                  <span className="ms-2">Vaciar</span>
                </Button>
              )}
            </div>

            {/* =========================
                ERROR
            ========================== */}

            {error && (
              <Alert
                severity="error"
                className="usuarioCarritoAlert"
                onClose={clearError}
              >
                {error}
              </Alert>
            )}

            {/* =========================
                CARRITO VACÍO
            ========================== */}

            {!tieneProductos ? (
              <div className="usuarioCarritoEmpty">
                <div className="usuarioCarritoEmptyIcon">
                  <MaterialSymbol icon="shopping_bag" size="large" />
                </div>

                <h2>Tu canasta local está vacía</h2>

                <p>
                  Date una vuelta por los comercios de tu comunidad y apoya a los
                  productores y negocios de tu colonia.
                </p>

                <a
                  href="/"
                  className="btn-adlocal btn-adlocal--solid usuarioCarritoExploreButton text-decoration-none"
                >
                  <MaterialSymbol icon="storefront" size="small" />

                  <span>Explorar comercios vecinos</span>
                </a>
              </div>
            ) : (
              <div className="row g-4 mt-4">
                {/* =========================
                    COMERCIOS / PRODUCTOS
                ========================== */}

                <div className="col-12 col-lg-8">
                  <div className="d-flex flex-column gap-4">
                    {carrito?.comercios.map((comercio) => (
                      <div
                        key={comercio.comercioUuid}
                        className="usuarioCarritoGrupo"
                      >
                        {/* =========================
                              COMERCIO
                          ========================== */}

                        <div className="usuarioCarritoComercio d-flex justify-content-between align-items-center flex-wrap">
                          <div className="d-flex align-items-center gap-3">
                            {comercio.comercioLogoUrl ? (
                              <img
                                src={comercio.comercioLogoUrl}
                                alt={comercio.comercio}
                                className="usuarioCarritoComercioLogo"
                              />
                            ) : (
                              <div className="usuarioCarritoComercioLogoFallback">
                                <MaterialSymbol
                                  icon="storefront"
                                  size="medium"
                                />
                              </div>
                            )}

                            <div>
                              <span className="usuarioCarritoComercioLabel">
                                Comercio
                              </span>

                              <strong className="usuarioCarritoComercioNombre">
                                {comercio.comercio}
                              </strong>

                              <span className="usuarioCarritoComercioProductos">
                                {comercio.totalProductos}{" "}
                                {comercio.totalProductos === 1
                                  ? "producto"
                                  : "productos"}
                              </span>
                            </div>
                          </div>

                          <div className="usuarioCarritoComercioSubtotal">
                            <span>Subtotal</span>

                            <strong>{formatPrice(comercio.subtotal)}</strong>
                          </div>
                        </div>

                        {/* =========================
                              PRODUCTOS
                          ========================== */}

                        <div className="d-flex flex-column gap-3 mt-3">
                          {comercio.productos.map((producto) => {
                            const alcanzoStock =
                              producto.manejaStock &&
                              producto.stock !== null &&
                              producto.stock !== undefined &&
                              producto.cantidad >= producto.stock;

                            return (
                              <div
                                key={producto.uuid}
                                className="usuarioCarritoProducto"
                              >
                                {/* IMAGEN */}

                                <div className="usuarioCarritoProductoImagenContainer">
                                  {producto.logoUrl ? (
                                    <img
                                      src={producto.logoUrl}
                                      alt={producto.nombre}
                                      className="usuarioCarritoProductoImagen"
                                    />
                                  ) : (
                                    <div className="usuarioCarritoProductoImagenFallback">
                                      <MaterialSymbol
                                        icon="inventory_2"
                                        size="medium"
                                      />
                                    </div>
                                  )}
                                </div>

                                {/* INFORMACIÓN */}

                                <div className="usuarioCarritoProductoInfo">
                                  <div className="usuarioCarritoProductoTop">
                                    <div>
                                      <h3 className="usuarioCarritoProductoNombre">
                                        {producto.nombre}
                                      </h3>

                                      {producto.descripcion && (
                                        <p className="usuarioCarritoProductoDescripcion">
                                          {producto.descripcion}
                                        </p>
                                      )}

                                      {!producto.disponible && (
                                        <div className="usuarioCarritoProductoUnavailable">
                                          <MaterialSymbol
                                            icon="warning"
                                            size="small"
                                          />

                                          <span>
                                            Producto no disponible actualmente
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    <button
                                      type="button"
                                      className="usuarioCarritoRemoveButton"
                                      disabled={loading}
                                      onClick={() =>
                                        handleEliminar(
                                          producto.uuid,
                                          producto.nombre,
                                        )
                                      }
                                      aria-label={`Eliminar ${producto.nombre}`}
                                    >
                                      <MaterialSymbol
                                        icon="delete"
                                        size="small"
                                      />
                                    </button>
                                  </div>

                                  {/* CANTIDAD Y PRECIO */}

                                  <div className="usuarioCarritoProductoBottom">
                                    <div className="usuarioCarritoCantidad">
                                      <button
                                        type="button"
                                        disabled={loading}
                                        onClick={() =>
                                          disminuirCantidad(producto.uuid)
                                        }
                                        aria-label="Disminuir cantidad"
                                      >
                                        <MaterialSymbol
                                          icon="remove"
                                          size="small"
                                        />
                                      </button>

                                      <span>{producto.cantidad}</span>

                                      <button
                                        type="button"
                                        disabled={
                                          loading ||
                                          alcanzoStock ||
                                          !producto.disponible
                                        }
                                        onClick={() =>
                                          incrementarCantidad(producto.uuid)
                                        }
                                        aria-label="Aumentar cantidad"
                                      >
                                        <MaterialSymbol
                                          icon="add"
                                          size="small"
                                        />
                                      </button>
                                    </div>

                                    <div className="usuarioCarritoProductoPrecio">
                                      <span>
                                        {formatPrice(producto.precioUnitario)}
                                        {" c/u"}
                                      </span>

                                      <strong>
                                        {formatPrice(producto.subtotal)}
                                      </strong>
                                    </div>
                                  </div>

                                  {/* STOCK */}

                                  {producto.manejaStock &&
                                    producto.stock !== null &&
                                    producto.stock !== undefined && (
                                      <div className="usuarioCarritoStockInfo">
                                        <MaterialSymbol
                                          icon="inventory"
                                          size="small"
                                        />

                                        <span>
                                          {producto.stock} disponibles
                                        </span>
                                      </div>
                                    )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* =========================
                    RESUMEN
                ========================== */}

                <div className="col-12 col-lg-4">
                  <div className="usuarioCarritoResumen">
                    <h2 className="usuarioCarritoResumenTitle">Resumen</h2>

                    <div className="usuarioCarritoResumenRow">
                      <span>Comercios</span>

                      <span>{carrito?.totalComercios ?? 0}</span>
                    </div>

                    <div className="usuarioCarritoResumenRow">
                      <span>Productos</span>

                      <span>{totalProductos}</span>
                    </div>

                    <div className="usuarioCarritoResumenRow">
                      <span>Subtotal</span>

                      <span>{formatPrice(subtotal)}</span>
                    </div>



                    {/* RESUMEN POR COMERCIO */}

                    <div className="usuarioCarritoResumenComercios">
                      {carrito?.comercios.map((comercio) => (
                        <div
                          key={comercio.comercioUuid}
                          className="usuarioCarritoResumenComercio"
                        >
                          <span>{comercio.comercio}</span>

                          <strong>{formatPrice(comercio.subtotal)}</strong>
                        </div>
                      ))}
                    </div>

                    <div className="usuarioCarritoResumenDivider" />

                    <div className="usuarioCarritoResumenTotal">
                      <span>Total</span>

                      <strong>{formatPrice(subtotal)}</strong>
                    </div>

                    <p className="usuarioCarritoResumenNote">
                      Cada comercio generará un pedido independiente. Los costos
                      de entrega, si aplican, se calcularán al continuar.
                    </p>

                    <Button
                      type="button"
                      variant="contained"
                      fullWidth
                      className="btn-adlocal btn-adlocal--solid usuarioCarritoContinuar"
                      disabled={loading}
                         onClick={() => {
                        window.location.href = "/usuario/checkout";
                      }}
                    >
                      Continuar pedido
                    </Button>

                    <a href="/" className="usuarioCarritoContinueShopping">
                      Seguir comprando
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
