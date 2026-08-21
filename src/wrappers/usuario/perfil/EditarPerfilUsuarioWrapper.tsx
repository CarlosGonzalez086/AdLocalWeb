import App from "../../../components/App";
import EditarPerfilUsuario from "../../../components/usuario/perfil/EditarPerfilUsuario";
import UsuarioAuthGuard from "../UsuarioAuthGuard";

export default function EditarPerfilUsuarioWrapper() {
  return (
    <App>
      <div className="w-100">
        <UsuarioAuthGuard>
          {(usuario) => <EditarPerfilUsuario usuario={usuario} />}
        </UsuarioAuthGuard>
      </div>
    </App>
  );
}
