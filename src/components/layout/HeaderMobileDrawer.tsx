import type { FC } from "react";
import { Avatar, Drawer } from "@mui/material";
import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";
import { LOGO_URL, type HeaderNavUrls, type UsuarioSesion } from "./headerTypes";

interface HeaderMobileDrawerProps {
  open: boolean;
  onClose: () => void;
  usuario: UsuarioSesion | null;
  authLoading: boolean;
  iniciales: string;
  urls: HeaderNavUrls;
  onCerrarSesion: () => void;
}

export const HeaderMobileDrawer: FC<HeaderMobileDrawerProps> = ({
  open,
  onClose,
  usuario,
  authLoading,
  iniciales,
  urls,
  onCerrarSesion,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          className: "drawerPaper",
          style: { width: "min(320px, 85vw)" },
        },
      }}
    >
      <aside id="mobile-navigation" className="drawerContent d-flex flex-column h-100 p-3" aria-label="Menú de navegación móvil">
        <div className="drawerHeader d-flex align-items-center justify-content-between pb-3 border-bottom mb-3">
          <a
            href={urls.inicio}
            className="drawerBrand d-flex align-items-center gap-2 text-decoration-none"
            onClick={onClose}
          >
            <img
              src={LOGO_URL}
              alt=""
              className="drawerLogo"
            />
            <span className="fz-h4 fw-bold"><span className="brandNameAd">AD</span><span className="brandNameLocal">Local</span></span>
          </a>

          <button
            type="button"
            aria-label="Cerrar menú móvil"
            className="btn-adlocal btn-adlocal-ghost btn-adlocal-sm d-inline-flex align-items-center justify-content-center"
            onClick={onClose}
          >
            <MaterialSymbol icon="close" size="medium" />
          </button>
        </div>

        {!authLoading && (
          <div className="mobileAccountContainer mb-3">
            {usuario ? (
              <div className="mobileUserCard card-adlocal p-2 mb-2">
                <a
                  href={urls.cuentaUsuario}
                  className="mobileUserInfo d-flex align-items-center justify-content-between text-decoration-none text-dark"
                  onClick={onClose}
                >
                  <div className="d-flex align-items-center gap-2">
                    {usuario.fotoUrl ? (
                      <Avatar
                        src={usuario.fotoUrl}
                        alt={usuario.nombre}
                        style={{ width: 36, height: 36 }}
                      />
                    ) : (
                      <span className="mobileUserInitials fz-body-sm fw-bold d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: 36, height: 36, backgroundColor: "var(--primary-glow)", color: "var(--primary)" }}>
                        {iniciales}
                      </span>
                    )}

                    <div className="d-flex flex-column">
                      <span className="fz-caption text-muted">Mi cuenta</span>
                      <span className="fz-body-sm fw-semibold">{usuario.nombre}</span>
                    </div>
                  </div>

                  <MaterialSymbol icon="chevron_right" size="medium" />
                </a>
              </div>
            ) : (
              <div className="mobileAuthActions d-flex flex-column gap-2">
                <a
                  href={urls.loginUsuario}
                  className="btn-adlocal btn-adlocal-outline-primary btn-adlocal-sm w-100 d-inline-flex align-items-center justify-content-center gap-2 text-decoration-none"
                  onClick={onClose}
                >
                  <MaterialSymbol icon="login" size="small" />
                  <span>Iniciar sesión</span>
                </a>

                <a
                  href={urls.registroUsuario}
                  className="btn-adlocal btn-adlocal-primary btn-adlocal-sm w-100 d-inline-flex align-items-center justify-content-center gap-2 text-decoration-none"
                  onClick={onClose}
                >
                  <MaterialSymbol icon="person_add" size="small" />
                  <span>Crear cuenta</span>
                </a>
              </div>
            )}
          </div>
        )}

        <nav className="mobileNavigation d-flex flex-column gap-1 flex-grow-1" aria-label="Enlaces de navegación">
          <a
            href={urls.inicio}
            className="mobileNavigationLink d-flex align-items-center justify-content-between p-2 rounded text-decoration-none text-dark"
            onClick={onClose}
          >
            <div className="d-flex align-items-center gap-2">
              <MaterialSymbol icon="home" size="medium" filled />
              <span className="fz-body fw-medium">Inicio</span>
            </div>
            <MaterialSymbol icon="chevron_right" size="small" />
          </a>

          <a
            href={urls.busquedaAvanzada}
            className="mobileNavigationLink d-flex align-items-center justify-content-between p-2 rounded text-decoration-none text-dark"
            onClick={onClose}
          >
            <div className="d-flex align-items-center gap-2">
              <MaterialSymbol icon="search" size="medium" />
              <span className="fz-body fw-medium">Búsqueda avanzada</span>
            </div>
            <MaterialSymbol icon="chevron_right" size="small" />
          </a>

          {usuario && (
            <>
              <a
                href={urls.carrito}
                className="mobileNavigationLink d-flex align-items-center justify-content-between p-2 rounded text-decoration-none text-dark"
                onClick={onClose}
              >
                <div className="d-flex align-items-center gap-2">
                  <MaterialSymbol icon="shopping_cart" size="medium" />
                  <span className="fz-body fw-medium">Mi carrito</span>
                </div>
                <MaterialSymbol icon="chevron_right" size="small" />
              </a>

              <a
                href={urls.pedidos}
                className="mobileNavigationLink d-flex align-items-center justify-content-between p-2 rounded text-decoration-none text-dark"
                onClick={onClose}
              >
                <div className="d-flex align-items-center gap-2">
                  <MaterialSymbol icon="receipt_long" size="medium" />
                  <span className="fz-body fw-medium">Mis pedidos</span>
                </div>
                <MaterialSymbol icon="chevron_right" size="small" />
              </a>

              <a
                href={urls.citas}
                className="mobileNavigationLink d-flex align-items-center justify-content-between p-2 rounded text-decoration-none text-dark"
                onClick={onClose}
              >
                <div className="d-flex align-items-center gap-2">
                  <MaterialSymbol icon="calendar_month" size="medium" />
                  <span className="fz-body fw-medium">Mis citas</span>
                </div>
                <MaterialSymbol icon="chevron_right" size="small" />
              </a>
            </>
          )}
        </nav>

        <div className="drawerFooter pt-3 border-top mt-auto d-flex flex-column gap-2">
          {usuario && (
            <button
              type="button"
              className="btn-adlocal btn-adlocal-danger btn-adlocal-sm w-100 d-inline-flex align-items-center justify-content-center gap-2 mb-2"
              onClick={onCerrarSesion}
            >
              <MaterialSymbol icon="logout" size="small" />
              <span>Cerrar sesión</span>
            </button>
          )}

          {usuario?.rol?.toLowerCase() === "comercio" ? (
            <a
              href={urls.dashboardNegocio}
              className="btn-adlocal btn-adlocal-secondary btn-adlocal-sm w-100 d-inline-flex align-items-center justify-content-center gap-2 text-decoration-none"
              onClick={onClose}
            >
              <MaterialSymbol icon="dashboard" size="small" />
              <span>Mi Panel de Comercio</span>
            </a>
          ) : (
            <div className="card-adlocal p-2 text-center">
              <p className="fz-body-sm fw-bold mb-1">¿Tienes un negocio?</p>
              <p className="fz-caption text-muted mb-2">Únete a la comunidad de comercios locales.</p>
              <a
                href={urls.registroNegocio}
                className="btn-adlocal btn-adlocal-primary btn-adlocal-sm w-100 d-inline-flex align-items-center justify-content-center gap-1 text-decoration-none mb-1"
                onClick={onClose}
              >
                <MaterialSymbol icon="storefront" size="small" />
                <span>Registrar negocio</span>
              </a>
              <a
                href={urls.loginNegocio}
                className="btn-adlocal btn-adlocal-ghost btn-adlocal-sm w-100 d-inline-flex align-items-center justify-content-center gap-1 text-decoration-none"
                onClick={onClose}
              >
                <MaterialSymbol icon="login" size="small" />
                <span>Acceso comerciantes</span>
              </a>
            </div>
          )}
        </div>
      </aside>
    </Drawer>
  );
};
