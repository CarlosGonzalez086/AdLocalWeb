import { type ReactNode, useEffect, useState } from "react";

import {
  getUsuarioSesion,
  type UsuarioSesion,
} from "../../utils/usuarioSesion";

import MaterialSymbol from "../../components/UI/MaterialSymbol/MaterialSymbol";

interface Props {
  children: (usuario: UsuarioSesion) => ReactNode;
}

const UsuarioAuthGuard = ({ children }: Props) => {
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const sesion = getUsuarioSesion();

    if (!sesion) {
      const returnUrl = `${window.location.pathname}${window.location.search}`;

      window.location.replace(
        `/usuario/login?returnUrl=${encodeURIComponent(returnUrl)}`,
      );

      return;
    }

    setUsuario(sesion);
    setChecking(false);
  }, []);

  if (checking || !usuario) {
    return (
      <div className="usuarioProtectedLoading">
        <div className="usuarioProtectedLoadingIcon">
          <MaterialSymbol icon="shield_lock" size="large" />
        </div>

        <span className="fz-h4 fw-semibold">Verificando tu sesión...</span>
      </div>
    );
  }

  return <>{children(usuario)}</>;
};

export default UsuarioAuthGuard;
