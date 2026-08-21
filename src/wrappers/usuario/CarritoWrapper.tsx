import App from "../../components/App";
import CarritoUsuario from "../../components/usuario/CarritoUsuario";
import { useCarrito } from "../../hooks/useCarrito";

import UsuarioAuthGuard from "./UsuarioAuthGuard";

const CarritoContent = () => {
  const {
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
  } = useCarrito();

  return (
    <App>
      <div className="w-100">
        <CarritoUsuario
          carrito={carrito}
          subtotal={subtotal}
          totalProductos={totalProductos}
          tieneProductos={tieneProductos}
          loading={loading}
          error={error}
          incrementarCantidad={incrementarCantidad}
          disminuirCantidad={disminuirCantidad}
          eliminarProducto={eliminarProducto}
          vaciarCarrito={vaciarCarrito}
          clearError={clearError}
        />
      </div>
    </App>
  );
};

const CarritoWrapper = () => {
  return <UsuarioAuthGuard>{() => <CarritoContent />}</UsuarioAuthGuard>;
};

export default CarritoWrapper;
