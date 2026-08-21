import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useClienteAuth } from "../../hooks/useClienteAuth";

import {
  getLocalStorageUsuario,
  removeLocalStorageUsuario,
} from "../../utils/storageUsuario";
import RestablecerPassword from "../../components/usuario/RestablecerPassword";
import App from "../../components/App";

const RestablecerPasswordWrapper = () => {
  const { restablecerPassword, loading, error, clearError } = useClienteAuth();

  const [email, setEmail] = useState("");

  const [codigo, setCodigo] = useState("");

  useEffect(() => {
    const emailGuardado = getLocalStorageUsuario("emailRecuperacion");

    const codigoGuardado = getLocalStorageUsuario("codigoRecuperacion");

    if (!emailGuardado || !codigoGuardado) {
      window.location.replace("/usuario/recuperar-contrasena");

      return;
    }

    setEmail(emailGuardado);
    setCodigo(codigoGuardado);
  }, []);

  const handleSubmit = async (data: {
    password: string;
    confirmarPassword: string;
  }) => {
    clearError();

    if (!email || !codigo) {
      return;
    }

    const success = await restablecerPassword({
      email,
      codigo,
      password: data.password,
      confirmarPassword: data.confirmarPassword,
    });

    if (!success) {
      return;
    }

    removeLocalStorageUsuario("emailRecuperacion");

    removeLocalStorageUsuario("codigoRecuperacion");

    await Swal.fire({
      icon: "success",
      title: "Contraseña actualizada",
      text: "Tu contraseña fue actualizada correctamente.",
      confirmButtonText: "Iniciar sesión",
    });

    window.location.replace("/usuario/login");
  };

  if (!email || !codigo) {
    return null;
  }

  return (
    <App>
      <div className="w-100">
        <RestablecerPassword
          loading={loading}
          error={error}
          onSubmit={handleSubmit}
        />
      </div>
    </App>
  );
};

export default RestablecerPasswordWrapper;
