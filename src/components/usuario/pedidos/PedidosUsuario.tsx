import {
  Alert,
  Button,
  Chip,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
} from "@mui/material";
import {
  EstadoPagoPedido,
  EstadoPedido,
  MetodoPagoPedido,
  TipoEntregaPedido,
  type ComprobanteTransferenciaResponseDto,
  type EstadoPagoPedido as EstadoPagoPedidoType,
} from "../../../types/checkout";
import type {
  PagedResponse,
  PedidoClienteDetalleDto,
  PedidoClienteListadoDto,
} from "../../../types/pedidos";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";
import ComprobanteTransferenciaUploader from "../checkout/ComprobanteTransferenciaUploader";

interface Props {
  pedidos: PagedResponse<PedidoClienteListadoDto>;
  detalle: PedidoClienteDetalleDto | null;
  loading: boolean;
  loadingDetalle: boolean;
  subiendo: boolean;
  error: string | null;
  errorComprobante: string | null;
  pagina: number;
  filtroPago: EstadoPagoPedidoType | null;
  onPagina: (pagina: number) => void;
  onFiltro: (estado: EstadoPagoPedidoType | null) => void;
  onSeleccionar: (pedidoUuid: string) => void;
  onSubirComprobante: (
    pedidoUuid: string,
    archivo: File,
  ) => Promise<ComprobanteTransferenciaResponseDto | null>;
}

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

const fecha = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "medium",
  timeStyle: "short",
});

const estadosPedido: Record<number, string> = {
  [EstadoPedido.PendienteAprobacion]: "Pendiente de aprobación",
  [EstadoPedido.Aprobado]: "Aprobado",
  [EstadoPedido.Rechazado]: "Rechazado",
  [EstadoPedido.Preparando]: "Preparando",
  [EstadoPedido.ListoParaRecoger]: "Listo para recoger",
  [EstadoPedido.ListoParaEnviar]: "Listo para enviar",
  [EstadoPedido.Enviado]: "Enviado",
  [EstadoPedido.Entregado]: "Entregado",
  [EstadoPedido.Completado]: "Completado",
  [EstadoPedido.Cancelado]: "Cancelado",
};

const estadosPago: Record<number, string> = {
  [EstadoPagoPedido.Pendiente]: "Pendiente",
  [EstadoPagoPedido.PendienteVerificacion]: "Verificando pago",
  [EstadoPagoPedido.Pagado]: "Pagado",
  [EstadoPagoPedido.Rechazado]: "Comprobante rechazado",
  [EstadoPagoPedido.Reembolsado]: "Reembolsado",
};

const colorPago = (estado: EstadoPagoPedidoType) => {
  if (estado === EstadoPagoPedido.Pagado) return "success" as const;
  if (estado === EstadoPagoPedido.Rechazado) return "error" as const;
  if (estado === EstadoPagoPedido.PendienteVerificacion) return "info" as const;
  return "warning" as const;
};

export default function PedidosUsuario({
  pedidos,
  detalle,
  loading,
  loadingDetalle,
  subiendo,
  error,
  errorComprobante,
  pagina,
  filtroPago,
  onPagina,
  onFiltro,
  onSeleccionar,
  onSubirComprobante,
}: Props) {
  return (
    <div className="ordersPage">
      <div className="container py-4 py-lg-5">
        <div className="row g-3 align-items-end mb-4">
          <div className="col">
            <span className="checkoutEyebrow fz-h5 fw-bold">Tu actividad</span>
            <h1 className="checkoutTitle fw-bold mb-1">Mis pedidos</h1>
            <p className="checkoutMutedText fz-h4 mb-0">
              Consulta el seguimiento y completa los pagos por transferencia.
            </p>
          </div>

          <div className="col-12 col-sm-auto">
            <Select
              size="small"
              value={filtroPago ?? 0}
              displayEmpty
              onChange={(event) =>
                onFiltro(
                  Number(event.target.value) === 0
                    ? null
                    : (Number(event.target.value) as EstadoPagoPedidoType),
                )
              }
            >
              <MenuItem value={0}>Todos los pagos</MenuItem>
              <MenuItem value={EstadoPagoPedido.Pendiente}>
                Pendientes de comprobante
              </MenuItem>
              <MenuItem value={EstadoPagoPedido.PendienteVerificacion}>
                En verificación
              </MenuItem>
              <MenuItem value={EstadoPagoPedido.Pagado}>Pagados</MenuItem>
              <MenuItem value={EstadoPagoPedido.Rechazado}>Rechazados</MenuItem>
            </Select>
          </div>
        </div>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-5">
            <div className="ordersList d-flex flex-column gap-3">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} variant="rounded" height={150} />
                ))
              ) : pedidos.items.length === 0 ? (
                <div className="ordersEmpty p-4 text-center">
                  <MaterialSymbol icon="receipt_long" size="large" />
                  <h2 className="fz-h3 fw-semibold mt-3">Sin pedidos</h2>
                  <p className="checkoutMutedText mb-3">
                    No hay pedidos que coincidan con el filtro seleccionado.
                  </p>
                  <Button href="/" className="btn-adlocal btn-adlocal--solid">
                    Explorar comercios
                  </Button>
                </div>
              ) : (
                pedidos.items.map((pedido) => (
                  <button
                    key={pedido.uuid}
                    type="button"
                    className={`orderListCard text-start p-3 ${
                      detalle?.uuid === pedido.uuid ? "isSelected" : ""
                    }`}
                    onClick={() => onSeleccionar(pedido.uuid)}
                  >
                    <div className="d-flex gap-3">
                      <div className="orderCommerceLogo flex-shrink-0">
                        {pedido.comercioLogoUrl ? (
                          <img src={pedido.comercioLogoUrl} alt="" />
                        ) : (
                          <MaterialSymbol icon="storefront" size="medium" />
                        )}
                      </div>

                      <div className="flex-grow-1 min-w-0">
                        <div className="d-flex justify-content-between gap-2">
                          <div>
                            <span className="checkoutCommerceLabel fz-h6 fw-semibold d-block">
                              {pedido.numeroPedido}
                            </span>
                            <strong className="fz-h4 d-block mt-1">
                              {pedido.comercio}
                            </strong>
                          </div>
                          <strong className="fz-h4 text-nowrap">
                            {money.format(pedido.total)}
                          </strong>
                        </div>

                        <span className="checkoutMutedText fz-h6 d-block mt-2">
                          {fecha.format(new Date(pedido.fechaCreacion))} ·{" "}
                          {pedido.totalProductos} productos
                        </span>

                        <div className="d-flex gap-2 flex-wrap mt-3">
                          <Chip
                            size="small"
                            label={estadosPedido[pedido.estado]}
                          />
                          <Chip
                            size="small"
                            color={colorPago(pedido.estadoPago)}
                            label={estadosPago[pedido.estadoPago]}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>

            {pedidos.totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <Pagination
                  page={pagina}
                  count={pedidos.totalPages}
                  onChange={(_, value) => onPagina(value)}
                />
              </div>
            )}
          </div>

          <div className="col-12 col-lg-7">
            <div className="orderDetailCard p-3 p-md-4">
              {loadingDetalle ? (
                <>
                  <Skeleton width="45%" height={42} />
                  <Skeleton variant="rounded" height={180} className="mt-3" />
                  <Skeleton variant="rounded" height={220} className="mt-3" />
                </>
              ) : detalle ? (
                <PedidoDetalle
                  pedido={detalle}
                  subiendo={subiendo}
                  errorComprobante={errorComprobante}
                  onSubirComprobante={onSubirComprobante}
                />
              ) : (
                <div className="ordersSelectHint text-center py-5">
                  <MaterialSymbol icon="touch_app" size="large" />
                  <h2 className="fz-h3 fw-semibold mt-3">
                    Selecciona un pedido
                  </h2>
                  <p className="checkoutMutedText mb-0">
                    Aquí verás sus productos, pago y seguimiento.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PedidoDetalle({
  pedido,
  subiendo,
  errorComprobante,
  onSubirComprobante,
}: {
  pedido: PedidoClienteDetalleDto;
  subiendo: boolean;
  errorComprobante: string | null;
  onSubirComprobante: Props["onSubirComprobante"];
}) {
  return (
    <>
      <div className="d-flex justify-content-between gap-3 align-items-start">
        <div>
          <span className="checkoutCommerceLabel fz-h6 fw-semibold">
            {pedido.numeroPedido}
          </span>
          <h2 className="fz-h2 fw-bold mt-1 mb-1">{pedido.comercio}</h2>
          <span className="checkoutMutedText fz-h6">
            {fecha.format(new Date(pedido.fechaCreacion))}
          </span>
        </div>
        <strong className="fz-h3 fw-bold">{money.format(pedido.total)}</strong>
      </div>

      <div className="d-flex gap-2 flex-wrap my-4">
        <Chip label={estadosPedido[pedido.estado]} />
        <Chip
          color={colorPago(pedido.estadoPago)}
          label={estadosPago[pedido.estadoPago]}
        />
        <Chip
          variant="outlined"
          label={
            pedido.tipoEntrega === TipoEntregaPedido.Domicilio
              ? "Domicilio"
              : "Recoger"
          }
        />
      </div>

      {pedido.metodoPago === MetodoPagoPedido.Transferencia && (
        <div className="orderBankInfo p-3 mb-4">
          <strong className="fz-h4 d-block mb-2">Transferencia bancaria</strong>
          <div className="row g-2 fz-h5">
            {pedido.banco && (
              <div className="col-6">
                <span className="checkoutMutedText d-block">Banco</span>
                {pedido.banco}
              </div>
            )}
            {pedido.beneficiario && (
              <div className="col-6">
                <span className="checkoutMutedText d-block">Beneficiario</span>
                {pedido.beneficiario}
              </div>
            )}
            {pedido.clabe && (
              <div className="col-12">
                <span className="checkoutMutedText d-block">CLABE</span>
                {pedido.clabe}
              </div>
            )}
            {pedido.numeroCuenta && (
              <div className="col-6">
                <span className="checkoutMutedText d-block">Cuenta</span>
                {pedido.numeroCuenta}
              </div>
            )}
            {pedido.numeroTarjeta && (
              <div className="col-6">
                <span className="checkoutMutedText d-block">Tarjeta</span>
                {pedido.numeroTarjeta}
              </div>
            )}
          </div>

          {pedido.puedeSubirComprobante && (
            <ComprobanteTransferenciaUploader
              pedidoUuid={pedido.uuid}
              loading={subiendo}
              error={errorComprobante}
              onSubir={onSubirComprobante}
            />
          )}

          {pedido.estadoPago === EstadoPagoPedido.PendienteVerificacion && (
            <Alert severity="info" className="mt-3">
              Tu comprobante está pendiente de verificación por el comercio.
            </Alert>
          )}
        </div>
      )}

      {pedido.direccion && (
        <div className="mb-4">
          <strong className="fz-h4 d-block mb-1">Dirección de entrega</strong>
          <span className="checkoutMutedText fz-h5">{pedido.direccion}</span>
        </div>
      )}

      <h3 className="fz-h3 fw-semibold mb-3">Productos</h3>
      <div className="d-flex flex-column gap-3">
        {pedido.productos.map((producto) => (
          <div
            key={producto.uuid}
            className="orderProduct d-flex gap-3 align-items-center p-2"
          >
            <div className="orderProductImage flex-shrink-0">
              {producto.logoUrl ? (
                <img src={producto.logoUrl} alt="" />
              ) : (
                <MaterialSymbol icon="inventory_2" size="medium" />
              )}
            </div>
            <div className="flex-grow-1">
              <strong className="fz-h5 d-block">{producto.nombre}</strong>
              <span className="checkoutMutedText fz-h6">
                {producto.cantidad} × {money.format(producto.precioUnitario)}
              </span>
            </div>
            <strong>{money.format(producto.subtotal)}</strong>
          </div>
        ))}
      </div>

      {pedido.historial.length > 0 && (
        <div className="mt-4">
          <h3 className="fz-h3 fw-semibold mb-3">Seguimiento</h3>
          <div className="orderTimeline">
            {pedido.historial.map((item, index) => (
              <div
                key={`${item.fecha}-${index}`}
                className="orderTimelineItem pb-3 ps-4"
              >
                <strong className="fz-h5 d-block">
                  {estadosPedido[item.estado]}
                </strong>
                <span className="checkoutMutedText fz-h6 d-block">
                  {fecha.format(new Date(item.fecha))}
                </span>
                {/* {item.comentario && (
                  <span className="fz-h6 d-block mt-1">{item.comentario}</span>
                )} */}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
