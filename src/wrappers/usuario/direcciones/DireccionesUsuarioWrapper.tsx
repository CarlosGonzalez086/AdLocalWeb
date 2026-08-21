import App from "../../../components/App";
import DireccionesUsuario from "../../../components/usuario/direcciones/DireccionesUsuario";
import { useDireccionesUsuario } from "../../../hooks/useDireccionesUsuario";
import UsuarioAuthGuard from "../UsuarioAuthGuard";

const DireccionesContent = () => {
  const {
    direcciones,

    loading,
    error,

    crearDireccion,

    actualizarDireccion,

    eliminarDireccion,

    establecerPredeterminada,

    clearError,
  } = useDireccionesUsuario();



  return (
    <App>
      <div className="w-100">
        <DireccionesUsuario
          direcciones={direcciones}
          loading={loading}
          error={error}
          onCrear={crearDireccion}
          onActualizar={actualizarDireccion}
          onEliminar={eliminarDireccion}
          onPredeterminada={establecerPredeterminada}
          clearError={clearError}
        />
      </div>
    </App>
  );
};

const DireccionesUsuarioWrapper = () => {
  return <UsuarioAuthGuard>{() => <DireccionesContent />}</UsuarioAuthGuard>;
};

export default DireccionesUsuarioWrapper;
