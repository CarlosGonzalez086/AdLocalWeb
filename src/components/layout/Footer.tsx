import type { FC } from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import styles from "./Footer.module.css";
import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";

const LOGO_URL =
  "https://pub-d5a2e881682f4782a4be2517d547d3c7.r2.dev/logo-comercio-imagen/WhatsApp%20Image%202025-12-23%20at%2021.19.26%20(1).jpeg";

const Footer: FC = () => {
  const year = new Date().getFullYear();

  const registroUrl =
    import.meta.env.MODE === "production"
      ? "https://ad-local-gamma.vercel.app/registro"
      : "http://localhost:5173/registro";

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <section className={styles.brandSection}>
            <div className={styles.brand}>
              <img
                src={LOGO_URL}
                alt="Logotipo de ADLocal"
                className={styles.logo}
              />

              <span className={styles.brandName}>ADLocal</span>
            </div>

            <p className={styles.brandDescription}>
              Conectando negocios locales con su comunidad.
            </p>

            <div className={styles.socialLinks}>
              <a
                href="https://www.facebook.com/profile.php?id=61588323283229"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar ADLocal en Facebook"
                className={`${styles.socialButton} ${styles.facebookButton}`}
              >
                <FacebookIcon className={styles.socialIcon} />
              </a>

              <button
                type="button"
                aria-label="Instagram de ADLocal"
                className={`${styles.socialButton} ${styles.instagramButton}`}
              >
                <InstagramIcon className={styles.socialIcon} />
              </button>
            </div>
          </section>

          <section className={styles.businessCard}>
            <div className={styles.businessIcon}>
              <MaterialSymbol icon="storefront" size="large" />
            </div>

            <div className={styles.businessContent}>
              <h2 className={styles.businessTitle}>¿Tienes un negocio?</h2>

              <p className={styles.businessDescription}>
                Únete a ADLocal y llega a más clientes dentro de tu comunidad.
              </p>
            </div>

            <a href={registroUrl} className={styles.registerButton}>
              <MaterialSymbol icon="app_registration" size="small" />

              <span>Registrarme</span>
            </a>
          </section>

          <section className={styles.legalSection}>
            <a
              href="https://carlosgonzalez086.github.io/DaVincixCode/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.developerLink}
            >
              Da VinciX Code Labs
            </a>

            <p className={styles.copyright}>
              © {year} Todos los derechos reservados.
            </p>
          </section>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.bottomText}>
            <span>ADLocal</span>

            <span className={styles.bottomSeparator} aria-hidden="true">
              ·
            </span>

            <span>Hecho en México</span>

            <MaterialSymbol
              icon="favorite"
              size="small"
              filled
              className={styles.favoriteIcon}
            />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
