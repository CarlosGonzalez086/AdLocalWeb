import { appSwal } from "../../utils/sweetalert";

import { useClienteAuth } from "../../hooks/useClienteAuth";
import ClienteRegistro from "../../components/usuario/ClienteRegistro";
import App from "../../components/App";

const ClienteRegistroWrapper = () => {
  const { registro, loading, error, clearError } = useClienteAuth();

  const handleRegistro = async (data: {
    nombre: string;
    email: string;
    password: string;
    confirmarPassword: string;
  }) => {
    clearError();

    const token = await registro(data);

    if (!token) {
      return;
    }

    await appSwal.fire({
      icon: "success",
      title: "Cuenta creada",
      text: "Tu cuenta de ADLocal fue creada correctamente.",
      timer: 1400,
      timerProgressBar: true,
      showConfirmButton: false,
    });

    window.location.replace("/");
  };

  return (
    <App>
      <div className="w-100">
        <ClienteRegistro
          loading={loading}
          error={error}
          onSubmit={handleRegistro}
        />
      </div>
    </App>
  );
};

export default ClienteRegistroWrapper;
