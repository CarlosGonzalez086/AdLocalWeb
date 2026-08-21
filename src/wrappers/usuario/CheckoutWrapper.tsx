import { useEffect } from "react";

import App from "../../components/App";



import { useCheckout } from "../../hooks/useCheckout";

import { useDireccionesUsuario } from "../../hooks/useDireccionesUsuario";

import UsuarioAuthGuard from "./UsuarioAuthGuard";
import CheckoutUsuario from "../../components/usuario/checkout/CheckoutUsuario";

const CheckoutContent = () => {
  const {
    checkout,

    resultado,

    loading,

    confirmando,

    error,

    cargarCheckout,

    confirmarCheckout,

    clearError,

    subirComprobante,

    subiendoComprobante,

    erroresComprobante,
  } = useCheckout();

  const {
    direcciones,

    loading: loadingDirecciones,

    cargarDirecciones,
  } = useDireccionesUsuario();

  useEffect(() => {
    void cargarCheckout();

    void cargarDirecciones();
  }, [cargarCheckout, cargarDirecciones]);

  return (
    <App>
      <div className="w-100">
        <CheckoutUsuario
          checkout={checkout}
          direcciones={direcciones}
          loading={loading || loadingDirecciones}
          confirmando={confirmando}
          error={error}
          resultado={resultado}
          clearError={clearError}
          onConfirmar={confirmarCheckout}
          onSubirComprobante={subirComprobante}
          subiendoComprobante={subiendoComprobante}
          erroresComprobante={erroresComprobante}
        />
      </div>
    </App>
  );
};

const CheckoutWrapper = () => {
  return <UsuarioAuthGuard>{() => <CheckoutContent />}</UsuarioAuthGuard>;
};

export default CheckoutWrapper;
