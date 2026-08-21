import App from "../../components/App";
import PedidosUsuario from "../../components/usuario/pedidos/PedidosUsuario";
import { usePedidos } from "../../hooks/usePedidos";
import UsuarioAuthGuard from "./UsuarioAuthGuard";
import { useEffect, useRef } from "react";

const PedidosContent = () => {
  const pedidos = usePedidos();
  const pedidoAbierto = useRef(false);

  useEffect(() => {
    if (pedidoAbierto.current) return;
    const pedidoUuid = new URLSearchParams(window.location.search).get("pedido");
    if (!pedidoUuid) return;
    pedidoAbierto.current = true;
    void pedidos.seleccionarPedido(pedidoUuid);
  }, [pedidos.seleccionarPedido]);

  return (
    <App>
      <div className="w-100">
        <PedidosUsuario
          pedidos={pedidos.pedidos}
          detalle={pedidos.detalle}
          loading={pedidos.loading}
          loadingDetalle={pedidos.loadingDetalle}
          subiendo={pedidos.subiendo}
          error={pedidos.error}
          errorComprobante={pedidos.errorComprobante}
          pagina={pedidos.pagina}
          filtroPago={pedidos.filtroPago}
          onPagina={pedidos.setPagina}
          onFiltro={pedidos.cambiarFiltro}
          onSeleccionar={pedidos.seleccionarPedido}
          onSubirComprobante={pedidos.subirComprobante}
        />
      </div>
    </App>
  );
};

export default function PedidosWrapper() {
  return <UsuarioAuthGuard>{() => <PedidosContent />}</UsuarioAuthGuard>;
}
