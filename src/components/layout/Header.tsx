import {
  Avatar,
  Button,
  Drawer,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { FC } from "react";
import { useEffect, useState } from "react";
import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";
import NotificacionesMenu from "../usuario/notificaciones/NotificacionesMenu";
import {
  clearStorageUsuario,
  getLocalStorageJWTUsuario,
} from "../../utils/storageUsuario";

const LOGO_URL =
  "https://pub-d5a2e881682f4782a4be2517d547d3c7.r2.dev/logo-comercio-imagen/WhatsApp%20Image%202025-12-23%20at%2021.19.26%20(1).jpeg";

interface HeaderProps {
  municipio: string | null;
  loading: boolean;
}

interface UsuarioSesion {
  id: number;
  nombre: string;
  rol: string;
  fotoUrl?: string | null;
}

interface JwtUsuarioPayload {
  id?: string;
  nombre?: string;
  rol?: string;
  fotoUrl?: string;
  exp?: number;
}

const decodeJwt = (token: string): JwtUsuarioPayload | null => {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");

    while (base64.length % 4) {
      base64 += "=";
    }

    const binary = window.atob(base64);

    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

    const json = new TextDecoder().decode(bytes);

    return JSON.parse(json);
  } catch {
    return null;
  }
};

const obtenerIniciales = (nombre: string): string => {
  const partes = nombre.trim().split(/\s+/).filter(Boolean);

  if (partes.length === 0) {
    return "U";
  }

  if (partes.length === 1) {
    return partes[0].substring(0, 2).toUpperCase();
  }

  return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
};

const Header: FC<HeaderProps> = ({ municipio, loading }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);

  const [authLoading, setAuthLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const registroNegocioUrl =
    import.meta.env.MODE === "production"
      ? "https://adlocal.jcarlosgonzalez086.workers.dev/usuario/crear-cuenta"
      : "http://localhost:5173/usuario/crear-cuenta";

  const busquedaAvanzadaUrl =
    import.meta.env.MODE === "production"
      ? "https://adlocalweb.jcarlosgonzalez086.workers.dev/comercios/busqueda-avanzada"
      : "/comercios/busqueda-avanzada";

  const loginUsuarioUrl = "/usuario/login";

  const registroUsuarioUrl = "/usuario/crear-cuenta";

  const cuentaUsuarioUrl = "/usuario/perfil";

  const carritoUrl = "/usuario/carrito";
  const pedidosUrl = "/usuario/pedidos";
  const citasUrl = "/usuario/citas";

  useEffect(() => {
    const cargarUsuario = () => {
      try {
        const token = getLocalStorageJWTUsuario();

        if (!token) {
          setUsuario(null);
          return;
        }

        const payload = decodeJwt(token);

        if (!payload) {
          clearStorageUsuario();
          setUsuario(null);
          return;
        }

        if (payload.exp && payload.exp * 1000 <= Date.now()) {
          clearStorageUsuario();
          setUsuario(null);
          return;
        }

        const id = Number(payload.id);

        if (!id || !payload.nombre) {
          clearStorageUsuario();
          setUsuario(null);
          return;
        }

        setUsuario({
          id,
          nombre: payload.nombre,
          rol: payload.rol ?? "",
          fotoUrl: payload.fotoUrl || null,
        });
      } catch {
        clearStorageUsuario();

        setUsuario(null);
      } finally {
        setAuthLoading(false);
      }
    };

    cargarUsuario();

    window.addEventListener("storage", cargarUsuario);

    return () => {
      window.removeEventListener("storage", cargarUsuario);
    };
  }, []);

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleCerrarSesion = () => {
    clearStorageUsuario();

    setUsuario(null);
    setDrawerOpen(false);

    window.location.replace("/");
  };

  const iniciales = usuario ? obtenerIniciales(usuario.nombre) : "";

  console.log(isMobile);

  return (
    <>
      <header className="header">
        <div className="toolbar">
          <div className="brandArea">
            <a
              href="/"
              className="brandLink"
              aria-label="Ir al inicio de ADLocal"
            >
              <img src={LOGO_URL} alt="Logotipo de ADLocal" className="logo" />

              <span className="brandName fz-h3 fw-bold">ADLocal</span>
            </a>

            <div className="desktopLocation">
              {loading ? (
                <Skeleton variant="rounded" className="locationSkeleton" />
              ) : (
                municipio && (
                  <span className="locationBadge">
                    <MaterialSymbol icon="location_on" size="small" filled />

                    <span className="fz-h5 fw-medium">{municipio}</span>
                  </span>
                )
              )}
            </div>
          </div>

          <nav className="desktopNavigation" aria-label="Navegación principal">
            <a href="/" className="navigationLink fz-h4 fw-medium">
              <MaterialSymbol icon="home" size="small" filled />

              <span>Inicio</span>
            </a>

            <a
              href={busquedaAvanzadaUrl}
              className="navigationLink fz-h4 fw-medium"
            >
              <MaterialSymbol icon="search" size="small" />

              <span>Búsqueda avanzada</span>
            </a>

            {!authLoading && (
              <>
                {usuario ? (
                  <>
                    <a
                      href={carritoUrl}
                      className="btn-adlocal btn-adlocal--ghost btn-adlocal--sm"
                      aria-label="Ver carrito"
                    >
                      <MaterialSymbol
                        icon="shopping_cart"
                        size="small"
                        className="mt-2"
                      />
                    </a>

                    <a
                      href={pedidosUrl}
                      className="btn-adlocal btn-adlocal--ghost btn-adlocal--sm"
                      aria-label="Ver mis pedidos"
                    >
                      <MaterialSymbol
                        icon="receipt_long"
                        size="small"
                        className="mt-2"
                      />
                    </a>

                    <a
                      href={citasUrl}
                      className="btn-adlocal btn-adlocal--ghost btn-adlocal--sm"
                      aria-label="Ver mis citas"
                    >
                      <MaterialSymbol
                        icon="calendar_month"
                        size="small"
                        className="mt-2"
                      />
                    </a>

                    {usuario && <NotificacionesMenu />}

                    <a href={cuentaUsuarioUrl} className="userAccount">
                      {usuario.fotoUrl ? (
                        <Avatar src={usuario.fotoUrl} alt={usuario.nombre} />
                      ) : (
                        <span className="userInitials fz-h5 fw-bold">
                          {iniciales}
                        </span>
                      )}

                      <span className="userName fz-h4 fw-semibold">
                        {usuario.nombre}
                      </span>
                    </a>
                  </>
                ) : (
                  <div className="authActions">
                    <a
                      href={loginUsuarioUrl}
                      className="btn-adlocal btn-adlocal--ghost btn-adlocal--sm fz-h4 fw-medium"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <MaterialSymbol icon="login" size="small" />

                        <span>Iniciar sesión</span>
                      </div>
                    </a>

                    <a
                      href={registroUsuarioUrl}
                      className="btn-adlocal btn-adlocal--sm fz-h4 fw-medium"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <MaterialSymbol icon="person_add" size="small" />

                        <span>Crear cuenta</span>
                      </div>
                    </a>
                  </div>
                )}
              </>
            )}

            <a
              href={registroNegocioUrl}
              className="btn-adlocal btn-adlocal--solid fz-h4 fw-semibold"
              style={{ textDecoration: "none" }}
            >
              <div className="d-flex align-items-center gap-2">
                <MaterialSymbol icon="storefront" size="small" />

                <span>Unirme como negocio</span>
              </div>
            </a>
          </nav>

          {isMobile ? (
            <>
              {" "}
              <div className="d-flex justify-content-end align-items-center gap-2">
                {usuario && <NotificacionesMenu />}
                <Button
                  type="button"
                  className="btn-adlocal btn-adlocal--ghost btn-adlocal--sm"
                  aria-label="Abrir menú"
                  aria-expanded={drawerOpen}
                  aria-controls="mobile-navigation"
                  onClick={() => setDrawerOpen(true)}
                >
                  <MaterialSymbol icon="menu" size="medium" className="mt-1"/>
                </Button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </header>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          className: "drawerPaper",
        }}
      >
        <aside id="mobile-navigation" className="drawerContent">
          <div className="drawerHeader">
            <a href="/" className="drawerBrand" onClick={closeDrawer}>
              <img
                src={LOGO_URL}
                alt="Logotipo de ADLocal"
                className="drawerLogo"
              />

              <span className="fz-h3 fw-bold">ADLocal</span>
            </a>

            <button
              type="button"
              aria-label="Cerrar menú"
              className="btn-adlocal btn-adlocal--ghost btn-adlocal--sm"
              onClick={closeDrawer}
            >
              <MaterialSymbol icon="close" size="medium" />
            </button>
          </div>

          <div className="drawerLocation">
            {loading ? (
              <Skeleton variant="rounded" className="drawerLocationSkeleton" />
            ) : (
              municipio && (
                <span className="locationBadge">
                  <MaterialSymbol icon="location_on" size="small" filled />

                  <span className="fz-h5 fw-medium">{municipio}</span>
                </span>
              )
            )}
          </div>

          {!authLoading && (
            <div className="mobileAccountContainer">
              {usuario ? (
                <div className="mobileUserCard">
                  <a
                    href={cuentaUsuarioUrl}
                    className="mobileUserInfo"
                    onClick={closeDrawer}
                  >
                    {usuario.fotoUrl ? (
                      <Avatar src={usuario.fotoUrl} alt={usuario.nombre} />
                    ) : (
                      <span className="mobileUserInitials fz-h4 fw-bold">
                        {iniciales}
                      </span>
                    )}

                    <div className="mobileUserText">
                      <span className="mobileUserLabel} fz-h6 fw-medium">
                        Mi cuenta
                      </span>

                      <span className="mobileUserName} fz-h4 fw-semibold">
                        {usuario.nombre}
                      </span>
                    </div>

                    <MaterialSymbol
                      icon="chevron_right"
                      size="medium"
                      className="mobileNavigationArrow"
                    />
                  </a>
                </div>
              ) : (
                <div className="mobileAuthActions">
                  <a
                    href={loginUsuarioUrl}
                    className="btn-adlocal btn-adlocal--ghost btn-adlocal--sm fz-h4 fw-medium"
                    onClick={closeDrawer}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <MaterialSymbol icon="login" size="small" />

                      <span>Iniciar sesión</span>
                    </div>
                  </a>

                  <a
                    href={registroUsuarioUrl}
                    className="btn-adlocal btn-adlocal--solid btn-adlocal--sm fz-h4 fw-medium"
                    onClick={closeDrawer}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <MaterialSymbol icon="person_add" size="small" />

                      <span>Crear cuenta</span>
                    </div>
                  </a>
                </div>
              )}
            </div>
          )}

          <nav className="mobileNavigation" aria-label="Navegación móvil">
            <a href="/" className="mobileNavigationLink" onClick={closeDrawer}>
              <span className="mobileNavigationIcon">
                <MaterialSymbol icon="home" size="medium" filled />
              </span>

              <span className="fz-h4 fw-semibold">Inicio</span>

              <MaterialSymbol
                icon="chevron_right"
                size="medium"
                className="mobileNavigationArrow"
              />
            </a>

            <a
              href={busquedaAvanzadaUrl}
              className="mobileNavigationLink"
              onClick={closeDrawer}
            >
              <span className="mobileNavigationIcon">
                <MaterialSymbol icon="search" size="medium" />
              </span>

              <span className="fz-h4 fw-semibold">Búsqueda avanzada</span>

              <MaterialSymbol
                icon="chevron_right"
                size="medium"
                className="mobileNavigationArrow"
              />
            </a>

            {usuario && (
              <a
                href={pedidosUrl}
                className="mobileNavigationLink"
                onClick={closeDrawer}
              >
                <span className="mobileNavigationIcon">
                  <MaterialSymbol icon="receipt_long" size="medium" />
                </span>

                <span className="fz-h4 fw-semibold">Mis pedidos</span>

                <MaterialSymbol
                  icon="chevron_right"
                  size="medium"
                  className="mobileNavigationArrow"
                />
              </a>
            )}

            {usuario && (
              <a
                href={citasUrl}
                className="mobileNavigationLink"
                onClick={closeDrawer}
              >
                <span className="mobileNavigationIcon">
                  <MaterialSymbol icon="calendar_month" size="medium" />
                </span>

                <span className="fz-h4 fw-semibold">Mis citas</span>

                <MaterialSymbol
                  icon="chevron_right"
                  size="medium"
                  className="mobileNavigationArrow"
                />
              </a>
            )}

            {usuario && (
              <a
                href={carritoUrl}
                className="mobileNavigationLink"
                onClick={closeDrawer}
              >
                <span className="mobileNavigationIcon">
                  <MaterialSymbol icon="shopping_cart" size="medium" />
                </span>

                <span className="fz-h4 fw-semibold">Mi carrito</span>

                <MaterialSymbol
                  icon="chevron_right"
                  size="medium"
                  className="mobileNavigationArrow"
                />
              </a>
            )}
          </nav>

          <div className="drawerFooter">
            {usuario && (
              <button
                type="button"
                className="btn-adlocal btn-adlocal--danger fz-h4 fw-semibold w-100 mb-3"
                onClick={handleCerrarSesion}
              >
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <MaterialSymbol icon="logout" size="small" />

                  <span>Cerrar sesión</span>
                </div>
              </button>
            )}

            <div className="drawerBusinessMessage">
              <span className="drawerBusinessIcon">
                <MaterialSymbol icon="storefront" size="medium" />
              </span>

              <div>
                <p className="drawerBusinessTitle} fz-h4 fw-bold">
                  ¿Tienes un negocio?
                </p>

                <p className="drawerBusinessDescription} fz-h5 fw-regular">
                  Regístrate y conecta con clientes de tu comunidad.
                </p>
              </div>
            </div>
            <div className="drawerBusinessMessage d-flex justify-content-center align-items-center">
              <a
                href={registroNegocioUrl}
                className="btn-adlocal btn-adlocal--solid fz-h4 fw-semibold"
                onClick={closeDrawer}
                style={{ textDecoration: "none" }}
              >
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <MaterialSymbol icon="app_registration" size="medium" />

                  <span>Unirme como negocio</span>
                </div>
              </a>
            </div>
          </div>
        </aside>
      </Drawer>
    </>
  );
};

export default Header;
