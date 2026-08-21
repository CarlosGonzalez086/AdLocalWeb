import type { FC } from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";

const LOGO_URL =
  "https://pub-d5a2e881682f4782a4be2517d547d3c7.r2.dev/logo-comercio-imagen/WhatsApp%20Image%202025-12-23%20at%2021.19.26%20(1).jpeg";

const Footer: FC = () => {
  const year = new Date().getFullYear();

  const registroUrl =
    import.meta.env.MODE === "production"
      ? "https://ad-local-gamma.vercel.app/usuario/crear-cuenta"
      : "http://localhost:5173/usuario/crear-cuenta";

  return (
    <footer className="footer">
      <div className="footerContainer">
        <div className="footerContent">
          <section className="footerBrandSection">
            <div className="footerBrand">
              <img
                src={LOGO_URL}
                alt="Logotipo de ADLocal"
                className="footerLogo"
              />

              <span className="fz-h2 fw-bold">ADLocal</span>
            </div>

            <p className="footerBrandDescription fz-h4 fw-regular">
              Conectando negocios locales con su comunidad.
            </p>

            <div className="footerSocialLinks">
              <a
                href="https://www.facebook.com/profile.php?id=61588323283229"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar ADLocal en Facebook"
                className="footerSocialButton footerFacebookButton"
              >
                <FacebookIcon className="footerSocialIcon" />
              </a>

              <button
                type="button"
                aria-label="Instagram de ADLocal"
                className="footerSocialButton footerInstagramButton"
              >
                <InstagramIcon className="footerSocialIcon" />
              </button>
            </div>
          </section>

          <section className="footerBusinessCard">
            <div className="footerBusinessIcon">
              <MaterialSymbol icon="storefront" size="large" />
            </div>

            <div className="footerBusinessContent">
              <h2 className="fz-h3 fw-bold mb-0">¿Tienes un negocio?</h2>

              <p className="footerBusinessDescription fz-h4 fw-regular">
                Únete a ADLocal y llega a más clientes dentro de tu comunidad.
              </p>
            </div>

            <a
              href={registroUrl}
              className="btn-adlocal btn-adlocal--solid fz-h4 fw-semibold"
              style={{ textDecoration: "none" }}
            >
              <div className="d-flex align-items-center gap-2">
                <MaterialSymbol icon="app_registration" size="small" />

                <span>Registrarme</span>
              </div>
            </a>
          </section>

          <section className="footerLegalSection">
            <a
              href="https://carlosgonzalez086.github.io/DaVincixCode/"
              target="_blank"
              rel="noopener noreferrer"
              className="footerDeveloperLink fz-h5 fw-semibold"
            >
              Da VinciX Code Labs
            </a>

            <p className="fz-h5 fw-regular mb-0">
              © {year} Todos los derechos reservados.
            </p>
          </section>
        </div>

        <div className="footerDivider" />

        <div className="footerBottom">
          <p className="footerBottomText fz-h5 fw-regular">
            <span className="fw-semibold">ADLocal</span>

            <span className="footerBottomSeparator" aria-hidden="true">
              ·
            </span>

            <span>Hecho en México</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
