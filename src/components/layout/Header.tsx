import { Drawer, Skeleton } from "@mui/material";
import type { FC } from "react";
import { useState } from "react";

import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";
import styles from "./Header.module.css";

const LOGO_URL =
  "https://pub-d5a2e881682f4782a4be2517d547d3c7.r2.dev/logo-comercio-imagen/WhatsApp%20Image%202025-12-23%20at%2021.19.26%20(1).jpeg";

interface HeaderProps {
  municipio: string | null;
  loading: boolean;
}

const Header: FC<HeaderProps> = ({ municipio, loading }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const registroUrl =
    import.meta.env.MODE === "production"
      ? "https://ad-local-gamma.vercel.app/registro"
      : "http://localhost:5173/registro";

  const busquedaAvanzadaUrl =
    import.meta.env.MODE === "production"
      ? "https://www.adlocal.store/comercios/busqueda-avanzada"
      : "/comercios/busqueda-avanzada";

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.toolbar}>
          <div className={styles.brandArea}>
            <a
              href="/"
              className={styles.brandLink}
              aria-label="Ir al inicio de ADLocal"
            >
              <img
                src={LOGO_URL}
                alt="Logotipo de ADLocal"
                className={styles.logo}
              />

              <span className={styles.brandName}>ADLocal</span>
            </a>

            <div className={styles.desktopLocation}>
              {loading ? (
                <Skeleton
                  variant="rounded"
                  className={styles.locationSkeleton}
                />
              ) : (
                municipio && (
                  <span className={styles.locationBadge}>
                    <MaterialSymbol icon="location_on" size="small" filled />

                    <span>{municipio}</span>
                  </span>
                )
              )}
            </div>
          </div>

          <nav
            className={styles.desktopNavigation}
            aria-label="Navegación principal"
          >
            <a href="/" className={styles.navigationLink}>
              <MaterialSymbol icon="home" size="small" filled />

              <span>Inicio</span>
            </a>

            <a href={busquedaAvanzadaUrl} className={styles.navigationLink}>
              <MaterialSymbol icon="search" size="small" />

              <span>Búsqueda avanzada</span>
            </a>

            <a href={registroUrl} className={styles.registerButton}>
              <MaterialSymbol icon="storefront" size="small" />

              <span>Unirme como negocio</span>
            </a>
          </nav>

          <button
            type="button"
            className={styles.menuButton}
            aria-label="Abrir menú"
            aria-expanded={drawerOpen}
            aria-controls="mobile-navigation"
            onClick={() => setDrawerOpen(true)}
          >
            <MaterialSymbol icon="menu" size="medium" />
          </button>
        </div>
      </header>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          className: styles.drawerPaper,
        }}
      >
        <aside id="mobile-navigation" className={styles.drawerContent}>
          <div className={styles.drawerHeader}>
            <a href="/" className={styles.drawerBrand} onClick={closeDrawer}>
              <img
                src={LOGO_URL}
                alt="Logotipo de ADLocal"
                className={styles.drawerLogo}
              />

              <span className={styles.drawerBrandName}>ADLocal</span>
            </a>

            <button
              type="button"
              aria-label="Cerrar menú"
              className={styles.closeButton}
              onClick={closeDrawer}
            >
              <MaterialSymbol icon="close" size="medium" />
            </button>
          </div>

          <div className={styles.drawerLocation}>
            {loading ? (
              <Skeleton
                variant="rounded"
                className={styles.drawerLocationSkeleton}
              />
            ) : (
              municipio && (
                <span className={styles.locationBadge}>
                  <MaterialSymbol icon="location_on" size="small" filled />

                  <span>{municipio}</span>
                </span>
              )
            )}
          </div>

          <nav
            className={styles.mobileNavigation}
            aria-label="Navegación móvil"
          >
            <a
              href="/"
              className={styles.mobileNavigationLink}
              onClick={closeDrawer}
            >
              <span className={styles.mobileNavigationIcon}>
                <MaterialSymbol icon="home" size="medium" filled />
              </span>

              <span>Inicio</span>

              <MaterialSymbol
                icon="chevron_right"
                size="medium"
                className={styles.mobileNavigationArrow}
              />
            </a>

            <a
              href={busquedaAvanzadaUrl}
              className={styles.mobileNavigationLink}
              onClick={closeDrawer}
            >
              <span className={styles.mobileNavigationIcon}>
                <MaterialSymbol icon="search" size="medium" />
              </span>

              <span>Búsqueda avanzada</span>

              <MaterialSymbol
                icon="chevron_right"
                size="medium"
                className={styles.mobileNavigationArrow}
              />
            </a>
          </nav>

          <div className={styles.drawerFooter}>
            <div className={styles.drawerBusinessMessage}>
              <span className={styles.drawerBusinessIcon}>
                <MaterialSymbol icon="storefront" size="medium" />
              </span>

              <div>
                <p className={styles.drawerBusinessTitle}>
                  ¿Tienes un negocio?
                </p>

                <p className={styles.drawerBusinessDescription}>
                  Regístrate y conecta con clientes de tu comunidad.
                </p>
              </div>
            </div>

            <a
              href={registroUrl}
              className={styles.mobileRegisterButton}
              onClick={closeDrawer}
            >
              <MaterialSymbol icon="app_registration" size="small" />

              <span>Unirme como negocio</span>
            </a>
          </div>
        </aside>
      </Drawer>
    </>
  );
};

export default Header;
