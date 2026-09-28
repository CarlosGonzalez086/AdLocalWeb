import type { FC } from "react";
import { Avatar } from "@mui/material";
import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";
import NotificacionesMenu from "../usuario/notificaciones/NotificacionesMenu";
import type { HeaderNavUrls, UsuarioSesion } from "./headerTypes";

interface HeaderDesktopNavProps {
  usuario: UsuarioSesion | null;
  authLoading: boolean;
  iniciales: string;
  urls: HeaderNavUrls;
}

export const HeaderDesktopNav: FC<HeaderDesktopNavProps> = ({
  usuario,
  authLoading,
  iniciales,
  urls,
}) => {
  return (
    <nav className="desktopNavigation d-none d-md-flex align-items-center gap-3" aria-label="Navegación principal">
      <a href={urls.inicio} className="navigationLink fz-h5 fw-medium d-inline-flex align-items-center gap-1 text-decoration-none">
        <MaterialSymbol icon="home" size="small" filled />
        <span>Inicio</span>
      </a>

      <a
        href={urls.busquedaAvanzada}
        className="navigationLink fz-h5 fw-medium d-inline-flex align-items-center gap-1 text-decoration-none"
      >
        <MaterialSymbol icon="search" size="small" />
        <span>Búsqueda avanzada</span>
      </a>

      {!authLoading && (
        <>
          {usuario ? (
            <div className="d-flex align-items-center gap-2">
              <a
                href={urls.carrito}
                className="btn-adlocal btn-adlocal-ghost btn-adlocal-sm d-inline-flex align-items-center justify-content-center p-2"
                aria-label="Ver mi carrito de compras"
              >
                <MaterialSymbol icon="shopping_cart" size="small" />
              </a>

              <a
                href={urls.pedidos}
                className="btn-adlocal btn-adlocal-ghost btn-adlocal-sm d-inline-flex align-items-center justify-content-center p-2"
                aria-label="Ver mis pedidos"
              >
                <MaterialSymbol icon="receipt_long" size="small" />
              </a>

              <a
                href={urls.citas}
                className="btn-adlocal btn-adlocal-ghost btn-adlocal-sm d-inline-flex align-items-center justify-content-center p-2"
                aria-label="Ver mis citas agendadas"
              >
                <MaterialSymbol icon="calendar_month" size="small" />
              </a>

              <NotificacionesMenu />

              <a
                href={urls.cuentaUsuario}
                className="userAccount d-inline-flex align-items-center gap-2 text-decoration-none p-1 rounded"
                aria-label={`Perfil de ${usuario.nombre}`}
              >
                {usuario.fotoUrl ? (
                  <Avatar
                    src={usuario.fotoUrl}
                    alt={usuario.nombre}
                    style={{ width: 32, height: 32 }}
                  />
                ) : (
                  <span className="userInitials fz-caption fw-bold d-inline-flex align-items-center justify-content-center rounded-circle">
                    {iniciales}
                  </span>
                )}

                <span className="userName fz-body-sm fw-semibold text-dark">
                  {usuario.nombre}
                </span>
              </a>
            </div>
          ) : (
            <div className="authActions d-flex align-items-center gap-2">
              <a
                href={urls.loginUsuario}
                className="btn-adlocal btn-adlocal-ghost btn-adlocal-sm fz-body-sm fw-medium d-inline-flex align-items-center gap-1 text-decoration-none"
              >
                <MaterialSymbol icon="login" size="small" />
                <span>Iniciar sesión</span>
              </a>

              <a
                href={urls.registroUsuario}
                className="btn-adlocal btn-adlocal-primary btn-adlocal-sm fz-body-sm fw-medium d-inline-flex align-items-center gap-1 text-decoration-none"
              >
                <MaterialSymbol icon="person_add" size="small" />
                <span>Crear cuenta</span>
              </a>
            </div>
          )}
        </>
      )}

      {usuario?.rol?.toLowerCase() === "comercio" ? (
        <a
          href={urls.dashboardNegocio}
          className="btn-adlocal btn-adlocal-secondary btn-adlocal-sm fz-body-sm fw-semibold d-inline-flex align-items-center gap-1 text-decoration-none"
        >
          <MaterialSymbol icon="dashboard" size="small" />
          <span>Mi Panel</span>
        </a>
      ) : (
        <a
          href={urls.registroNegocio}
          className="btn-adlocal btn-adlocal-primary btn-adlocal-sm fz-body-sm fw-semibold d-inline-flex align-items-center gap-1 text-decoration-none"
        >
          <MaterialSymbol icon="storefront" size="small" />
          <span>Unirme como negocio</span>
        </a>
      )}
    </nav>
  );
};
