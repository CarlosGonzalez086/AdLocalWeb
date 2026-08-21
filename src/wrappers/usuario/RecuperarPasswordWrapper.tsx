import Swal from "sweetalert2";

import { useClienteAuth } from "../../hooks/useClienteAuth";

import { setLocalStorageUsuario } from "../../utils/storageUsuario";
import RecuperarPassword from "../../components/usuario/RecuperarPassword";
import App from "../../components/App";

const RecuperarPasswordWrapper = () => {
  const { recuperarPassword, loading, error, clearError } = useClienteAuth();

  const handleSubmit = async (email: string) => {
    clearError();

    const success = await recuperarPassword({
      email,
    });

    if (!success) {
      return;
    }

    setLocalStorageUsuario("emailRecuperacion", email);

    await Swal.fire({
      icon: "success",
      title: "Código enviado",
      text: "Si existe una cuenta asociada al correo, recibirás un código para continuar.",
      confirmButtonText: "Continuar",
    });

    window.location.href = "/usuario/verificar-codigo";
  };

  return (
    <App>
      <div className="w-100">
        <RecuperarPassword
          loading={loading}
          error={error}
          onSubmit={handleSubmit}
        />
      </div>
    </App>
  );
};

export default RecuperarPasswordWrapper;
