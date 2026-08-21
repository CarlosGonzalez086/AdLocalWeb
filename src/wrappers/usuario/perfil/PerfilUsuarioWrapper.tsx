import App from "../../../components/App";
import PerfilUsuario from "../../../components/usuario/perfil/PerfilUsuario";
import UsuarioAuthGuard from "../UsuarioAuthGuard";

const PerfilUsuarioWrapper = () => {
  return (
    <App>
      <div className="w-100">
        <UsuarioAuthGuard>
          {(usuario) => <PerfilUsuario usuario={usuario} />}
        </UsuarioAuthGuard>
      </div>
    </App>
  );
};

export default PerfilUsuarioWrapper;
