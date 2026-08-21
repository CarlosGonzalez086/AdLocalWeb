import App from "../../components/App";
import CitasUsuario from "../../components/usuario/citas/CitasUsuario";
import UsuarioAuthGuard from "./UsuarioAuthGuard";
export default function CitasWrapper() {
  return (
    <UsuarioAuthGuard>
      {() => (
        <App>
          <CitasUsuario />
        </App>
      )}
    </UsuarioAuthGuard>
  );
}
