import Swal from "sweetalert2";
import { useClienteAuth } from "../../hooks/useClienteAuth";
import ClienteLogin from "../../components/usuario/ClienteLogin";
import App from "../../components/App";

const ClienteLoginWrapper = () => {
  const { login, loading, error, clearError } = useClienteAuth();

  const handleLogin = async (data: { email: string; password: string }) => {
    clearError();

    const token = await login(data);

    if (!token) {
      return;
    }

    await Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: "Has iniciado sesión correctamente.",
      timerProgressBar: true,
      showConfirmButton: false,
    });

    window.location.replace("/");
  };

  return (
    <App>
      <div className="w-100">
        <ClienteLogin loading={loading} error={error} onSubmit={handleLogin} />
      </div>
    </App>
  );
};

export default ClienteLoginWrapper;
