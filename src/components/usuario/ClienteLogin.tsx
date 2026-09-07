import {
  Alert,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";
import { URL_PANEL_COMERCIO } from "../../api/http";

const LOGO_URL =
  "https://pub-d5a2e881682f4782a4be2517d547d3c7.r2.dev/logo-comercio-imagen/WhatsApp%20Image%202025-12-23%20at%2021.19.26%20(1).jpeg";

interface Props {
  loading?: boolean;
  error?: string | null;

  onSubmit: (data: { email: string; password: string }) => Promise<void>;
}

export default function ClienteLogin({
  loading = false,
  error,
  onSubmit,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [validationError, setValidationError] = useState<string | null>(null);

  const validar = () => {
    const emailLimpio = email.trim();

    if (!emailLimpio) {
      setValidationError("El correo electrónico es requerido.");

      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailLimpio)) {
      setValidationError("Ingresa un correo electrónico válido.");

      return false;
    }

    if (!password) {
      setValidationError("La contraseña es requerida.");

      return false;
    }

    if (password.length < 8) {
      setValidationError("La contraseña debe contener al menos 8 caracteres.");

      return false;
    }

    setValidationError(null);

    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validar()) {
      return;
    }

    await onSubmit({
      email: email.trim(),
      password,
    });
  };

  const mensajeError = validationError || error;

  return (
    <div className="usuarioAuthPage">
      <div className="usuarioAuthBackground" aria-hidden="true">
        <div className="usuarioAuthDecorationOne" />
        <div className="usuarioAuthDecorationTwo" />
        <div className="usuarioAuthDecorationThree" />
      </div>

      <div className="container usuarioAuthContainer">
        <div className="row justify-content-center w-100">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
            <div className="text-center mb-4">
              <a
                href="/"
                className="usuarioAuthLogoLink"
                aria-label="Ir al inicio de ADLocal"
                style={{ textDecoration: "none" }}
              >
                <img src={LOGO_URL} alt="ADLocal" className="usuarioAuthLogo" />
              </a>
            </div>

            <div className="usuarioAuthCard">
              <div className="usuarioAuthHeader">
                <div className="usuarioAuthHeaderIcon">
                  <MaterialSymbol icon="person" size="large" filled />
                </div>

                <div className="usuarioAuthHeaderContent">
                  <Typography component="span" className="usuarioAuthType">
                    Cuenta ADLocal
                  </Typography>

                  <Typography component="h1" className="usuarioAuthTitle">
                    Iniciar sesión
                  </Typography>

                  <Typography component="p" className="usuarioAuthDescription">
                    Accede a tu cuenta para comprar en comercios locales y
                    consultar tus pedidos.
                  </Typography>
                </div>
              </div>

              <div className="usuarioAuthRegisterMessage">
                <span className="usuarioAuthRegisterText">
                  ¿Todavía no tienes una cuenta?
                </span>

                <a
                  href="/usuario/crear-cuenta"
                  className="usuarioAuthTextButton"
                  style={{ textDecoration: "none" }}
                >
                  Crear cuenta
                </a>
              </div>

              <form onSubmit={handleSubmit} className="usuarioAuthForm">
                <div className="d-flex flex-column gap-3">
                  {mensajeError && (
                    <Alert severity="error" className="usuarioAuthAlert">
                      {mensajeError}
                    </Alert>
                  )}

                  <TextField
                    placeholder="Correo electrónico"
                    type="email"
                    fullWidth
                    value={email}
                    disabled={loading}
                    onChange={(event) => setEmail(event.target.value)}
                    className="usuarioAuthField"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MaterialSymbol
                            icon="mail"
                            size="small"
                            className="usuarioAuthFieldIcon"
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    placeholder="Contraseña"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    value={password}
                    disabled={loading}
                    onChange={(event) => setPassword(event.target.value)}
                    className="usuarioAuthField"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MaterialSymbol
                            icon="lock"
                            size="small"
                            className="usuarioAuthFieldIcon"
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            type="button"
                            size="small"
                            disabled={loading}
                            onClick={() => setShowPassword((value) => !value)}
                          >
                            <MaterialSymbol
                              icon={
                                showPassword ? "visibility_off" : "visibility"
                              }
                              size="small"
                              className="usuarioAuthFieldIcon"
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    className="btn-adlocal btn-adlocal--solid usuarioAuthSubmit fz-h3 fw-bold"
                  >
                    {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                  </Button>
                </div>
              </form>

              <a
                href="/usuario/recuperar-contrasena"
                className="usuarioAuthForgotPassword"
                style={{ textDecoration: "none" }}
              >
                <MaterialSymbol icon="lock_reset" size="small" />

                <span>¿Olvidaste tu contraseña?</span>
              </a>

              <Divider className="usuarioAuthDivider">
                Información legal
              </Divider>

              <p className="usuarioAuthTerms">
                Al iniciar sesión o crear una cuenta, aceptas nuestros{" "}
                <a href="/terminos" className="usuarioAuthTermsLink" style={{textDecoration:"none"}}>
                  Términos y Condiciones
                </a>{" "}
                y la{" "}
                <a href="/privacidad" className="usuarioAuthTermsLink" style={{textDecoration:"none"}}>
                  Política de Privacidad
                </a>
                .
              </p>

              <div className="usuarioAuthMerchantCallout text-center mt-3 pt-3 border-top">
                <p className="fz-h5 text-muted mb-2">
                  ¿Tienes un negocio o tienda registrada?
                </p>
                <a
                  href={URL_PANEL_COMERCIO}
                  className="btn-adlocal btn-adlocal--ghost btn-adlocal--sm fz-h5 fw-semibold d-inline-flex align-items-center gap-2"
                  style={{ textDecoration: "none" }}
                >
                  <MaterialSymbol icon="storefront" size="small" />
                  <span>Acceder al Panel de Comercios</span>
                </a>
              </div>
            </div>


            <div className="usuarioAuthFooter">
              <MaterialSymbol icon="verified_user" size="small" />

              <span className="usuarioAuthFooterText">
                Tu información está protegida por ADLocal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
