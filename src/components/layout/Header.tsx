import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";
import NotificacionesMenu from "../usuario/notificaciones/NotificacionesMenu";
import {
  clearStorageUsuario,
  getLocalStorageJWTUsuario,
} from "../../utils/storageUsuario";
import {
  isTokenProximoAExpirar,
  renovarTokenSilencioso,
} from "../../utils/tokenManager";
import {
  decodeJwt,
  getHeaderUrls,
  LOGO_URL,
  obtenerIniciales,
  type UsuarioSesion,
} from "./headerTypes";
import { HeaderDesktopNav } from "./HeaderDesktopNav";
import { HeaderMobileDrawer } from "./HeaderMobileDrawer";

interface HeaderProps {
  municipio?: string | null;
  loading?: boolean;
}

const Header: FC<HeaderProps> = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const urls = useMemo(() => getHeaderUrls(), []);

  useEffect(() => {
    let activo = true;

    const cargarUsuario = async () => {
      try {
        const token = getLocalStorageJWTUsuario();

        if (!token) {
          if (activo) setUsuario(null);
          return;
        }

        const payload = decodeJwt(token);

        if (!payload) {
          clearStorageUsuario();
          if (activo) setUsuario(null);
          return;
        }

        // Si ya expiró el token, intentamos renovarlo antes de cerrar sesión
        if (payload.exp && payload.exp * 1000 <= Date.now()) {
          const nuevoToken = await renovarTokenSilencioso();
          if (nuevoToken && activo) {
            cargarUsuario();
            return;
          } else {
            clearStorageUsuario();
            if (activo) setUsuario(null);
            return;
          }
        }

        // Si le quedan menos de 8 minutos, renovamos proactivamente
        if (isTokenProximoAExpirar(token, 8)) {
          renovarTokenSilencioso().catch(() => {});
        }

        const id = Number(payload.id);

        if (!id || !payload.nombre) {
          clearStorageUsuario();
          if (activo) setUsuario(null);
          return;
        }

        if (activo) {
          setUsuario({
            id,
            nombre: payload.nombre,
            rol: payload.rol ?? "",
            fotoUrl: payload.fotoUrl || null,
          });
        }
      } catch {
        clearStorageUsuario();
        if (activo) setUsuario(null);
      } finally {
        if (activo) {
          setAuthLoading(false);
        }
      }
    };

    cargarUsuario();

    // Sincronización en tiempo real entre componentes y pestañas
    window.addEventListener("usuarioSesionActualizada", cargarUsuario);
    window.addEventListener("storage", cargarUsuario);

    // Renovación periódica silenciosa en segundo plano (cada 2.5 minutos)
    const interval = setInterval(() => {
      const token = getLocalStorageJWTUsuario();
      if (token && isTokenProximoAExpirar(token, 8)) {
        renovarTokenSilencioso();
      }
    }, 150000);

    // Al volver a la pestaña o desbloquear celular
    const handleReanudar = () => {
      if (document.visibilityState === "visible") {
        const token = getLocalStorageJWTUsuario();
        if (token && isTokenProximoAExpirar(token, 8)) {
          renovarTokenSilencioso();
        }
      }
    };

    window.addEventListener("focus", handleReanudar);
    document.addEventListener("visibilitychange", handleReanudar);

    return () => {
      activo = false;
      clearInterval(interval);
      window.removeEventListener("usuarioSesionActualizada", cargarUsuario);
      window.removeEventListener("storage", cargarUsuario);
      window.removeEventListener("focus", handleReanudar);
      document.removeEventListener("visibilitychange", handleReanudar);
    };
  }, []);

  const handleCerrarSesion = () => {
    clearStorageUsuario();
    setUsuario(null);
    setDrawerOpen(false);
    window.location.replace("/");
  };

  const iniciales = usuario ? obtenerIniciales(usuario.nombre) : "";

  return (
    <>
      <header className="header shadow-sm bg-white sticky-top">
        <div className="toolbar container-fluid px-3 px-lg-4 d-flex align-items-center justify-content-between" style={{ minHeight: "64px" }}>
          <div className="brandArea d-flex align-items-center gap-2">
            <a
              href="/"
              className="brandLink d-flex align-items-center gap-2 text-decoration-none"
              aria-label="Ir al inicio de ADLocal"
            >
              <img
                src={LOGO_URL}
                alt=""
                className="logo"
              />
              <span className="brandName fz-h4 fw-bold mb-0"><span className="brandNameAd">AD</span><span className="brandNameLocal">Local</span></span>
            </a>
          </div>

          {/* Navegación de escritorio */}
          <HeaderDesktopNav
            usuario={usuario}
            authLoading={authLoading}
            iniciales={iniciales}
            urls={urls}
          />

          {/* Botones de acción móvil */}
          {isMobile && (
            <div className="d-flex align-items-center gap-2">
              {usuario && <NotificacionesMenu />}
              <button
                type="button"
                className="btn-adlocal btn-adlocal-ghost btn-adlocal-sm d-inline-flex align-items-center justify-content-center p-2"
                aria-label="Abrir menú de navegación"
                aria-expanded={drawerOpen}
                aria-controls="mobile-navigation"
                onClick={() => setDrawerOpen(true)}
              >
                <MaterialSymbol icon="menu" size="medium" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Drawer móvil accesible */}
      <HeaderMobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        usuario={usuario}
        authLoading={authLoading}
        iniciales={iniciales}
        urls={urls}
        onCerrarSesion={handleCerrarSesion}
      />
    </>
  );
};

export default Header;
