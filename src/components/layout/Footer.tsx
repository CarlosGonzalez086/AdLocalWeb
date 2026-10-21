import type { FC } from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";
import { URL_PANEL_COMERCIO, URL_REGISTRO_COMERCIO } from "../../api/http";
import { ADLOCAL_MARK_URL } from "../../constants/brand";

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footerContainer">
        <div className="footerContent">
          <section className="footerBrandSection">
            <div className="footerBrand">
              <img
                src={ADLOCAL_MARK_URL}
                alt=""
                className="footerLogo"
              />

              <span className="fz-h2 fw-bold">
                <span className="brandNameAd">AD</span>
                <span className="brandNameLocal">Local</span>
              </span>
            </div>

            <p className="footerBrandDescription">
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

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar ADLocal en Instagram"
                className="footerSocialButton footerInstagramButton"
              >
                <InstagramIcon className="footerSocialIcon" />
              </a>
            </div>
          </section>

          <section className="footerBusinessCard">
            <div className="footerBusinessInfo">
              <div className="footerBusinessIcon" aria-hidden="true">
                <MaterialSymbol icon="storefront" size="medium" />
              </div>

              <div className="footerBusinessContent">
                <h2 className="footerBusinessTitle mb-1">¿Tienes un negocio?</h2>

                <p className="footerBusinessDescription">
                  Únete a ADLocal y llega a más clientes dentro de tu comunidad.
                </p>
              </div>
            </div>

            <div className="footerBusinessActions">
              <a
                href={URL_REGISTRO_COMERCIO}
                className="btn-adlocal btn-adlocal-primary btn-adlocal-sm fw-semibold text-decoration-none"
              >
                <MaterialSymbol icon="app_registration" size="small" />
                <span>Registrar mi negocio</span>
              </a>

              <a
                href={URL_PANEL_COMERCIO}
                className="btn-adlocal btn-adlocal-ghost btn-adlocal-sm fw-medium text-decoration-none"
              >
                <MaterialSymbol icon="login" size="small" />
                <span>Acceso a Panel Comercios</span>
              </a>
            </div>
          </section>
        </div>

        <div className="footerDivider" />

        <div className="footerBottom">
          <div className="footerBottomContent">
            <p className="fz-h5 fw-regular text-muted mb-0">
              © {year} ADLocal. Todos los derechos reservados.
            </p>

            <a
              href="https://carlosgonzalez086.github.io/DaVincixCode/"
              target="_blank"
              rel="noopener noreferrer"
              className="footerDeveloperLink fz-h5"
            >
              Desarrollado por <strong>Da VinciX Code Labs</strong>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
