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

              <span className="fz-h2 fw-bold"><span className="brandNameAd">AD</span><span className="brandNameLocal">Local</span></span>
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

            <div className="d-flex flex-column gap-2 align-items-stretch">
              <a
                href={URL_REGISTRO_COMERCIO}
                className="btn-adlocal btn-adlocal-primary fz-body fw-semibold text-decoration-none"
              >
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <MaterialSymbol icon="app_registration" size="small" />
                  <span>Registrar mi negocio</span>
                </div>
              </a>

              <a
                href={URL_PANEL_COMERCIO}
                className="btn-adlocal btn-adlocal-ghost fz-body-sm fw-medium text-center text-decoration-none"
              >
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <MaterialSymbol icon="login" size="small" />
                  <span>Acceso a Panel Comercios</span>
                </div>
              </a>
            </div>
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
      </div>
    </footer>
  );
};

export default Footer;
