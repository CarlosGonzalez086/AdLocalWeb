import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useClienteAuth } from "../../hooks/useClienteAuth";

import {
  getLocalStorageUsuario,
  setLocalStorageUsuario,
} from "../../utils/storageUsuario";
import VerificarCodigo from "../../components/usuario/VerificarCodigo";
import App from "../../components/App";

const VerificarCodigoWrapper = () => {
  const { verificarCodigo, loading, error, clearError } = useClienteAuth();

  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailGuardado = getLocalStorageUsuario("emailRecuperacion");

    if (!emailGuardado) {
      window.location.replace("/usuario/recuperar-contrasena");
      return;
    }

    setEmail(emailGuardado);
  }, []);

  const handleSubmit = async (codigo: string) => {
    clearError();

    if (!email) {
      return;
    }

    const success = await verificarCodigo({
      email,
      codigo,
    });

    if (!success) {
      return;
    }

    setLocalStorageUsuario("codigoRecuperacion", codigo);

    await Swal.fire({
      icon: "success",
      title: "Código correcto",
      text: "Ahora puedes establecer una nueva contraseña.",
      timer: 1200,
      showConfirmButton: false,
    });

    window.location.href = "/usuario/restablecer-contrasena";
  };

  if (!email) {
    return null;
  }

  return (
    <App>
      <div className="w-100">
        <VerificarCodigo
          email={email}
          loading={loading}
          error={error}
          onSubmit={handleSubmit}
        />
      </div>
    </App>
  );
};

export default VerificarCodigoWrapper;
