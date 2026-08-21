import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";

interface RegistroData {
  nombre: string;
  email: string;
  password: string;
  confirmarPassword: string;
}

interface Props {
  loading?: boolean;
  error?: string | null;
  onSubmit: (data: RegistroData) => Promise<void>;
}

export default function ClienteRegistro({
  loading = false,
  error,
  onSubmit,
}: Props) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [validationError, setValidationError] = useState<string | null>(null);

  const validar = () => {
    if (!nombre.trim()) {
      setValidationError("El nombre es requerido.");
      return false;
    }

    if (nombre.trim().length < 2) {
      setValidationError("Ingresa un nombre válido.");
      return false;
    }

    if (!email.trim()) {
      setValidationError("El correo electrónico es requerido.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
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

    if (!confirmarPassword) {
      setValidationError("Confirma tu contraseña.");
      return false;
    }

    if (password !== confirmarPassword) {
      setValidationError("Las contraseñas no coinciden.");
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
      nombre: nombre.trim(),
      email: email.trim(),
      password,
      confirmarPassword,
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
                <img
                  src="https://pub-d5a2e881682f4782a4be2517d547d3c7.r2.dev/logo-comercio-imagen/WhatsApp%20Image%202025-12-23%20at%2021.19.26%20(1).jpeg"
                  alt="ADLocal"
                  className="usuarioAuthLogo"
                />
              </a>
            </div>

            <div className="usuarioAuthCard">
              <div className="usuarioAuthHeader">
                <div className="usuarioAuthHeaderIcon">
                  <MaterialSymbol icon="person_add" size="large" filled />
                </div>

                <div className="usuarioAuthHeaderContent">
                  <span className="usuarioAuthType">Únete a ADLocal</span>

                  <h1 className="usuarioAuthTitle">Crear cuenta</h1>

                  <p className="usuarioAuthDescription">
                    Crea tu cuenta para comprar en comercios locales, guardar
                    tus direcciones y consultar tus pedidos.
                  </p>
                </div>
              </div>

              <div className="usuarioAuthRegisterMessage">
                <span className="usuarioAuthRegisterText">
                  ¿Ya tienes una cuenta?
                </span>

                <a
                  href="/usuario/login"
                  className="usuarioAuthTextButton"
                  style={{ textDecoration: "none" }}
                >
                  Iniciar sesión
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
                    placeholder="Nombre completo"
                    fullWidth
                    value={nombre}
                    disabled={loading}
                    onChange={(event) => setNombre(event.target.value)}
                    className="usuarioAuthField"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MaterialSymbol
                            icon="person"
                            size="small"
                            className="usuarioAuthFieldIcon"
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

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
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    placeholder="Confirmar contraseña"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    value={confirmarPassword}
                    disabled={loading}
                    onChange={(event) =>
                      setConfirmarPassword(event.target.value)
                    }
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
                            onClick={() =>
                              setShowConfirmPassword((value) => !value)
                            }
                          >
                            <MaterialSymbol
                              icon={
                                showConfirmPassword
                                  ? "visibility_off"
                                  : "visibility"
                              }
                              size="small"
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
                    {loading ? "Creando cuenta..." : "Crear cuenta"}
                  </Button>
                </div>
              </form>

              <div className="usuarioAuthDividerSimple" />

              <p className="usuarioAuthTerms">
                Al crear una cuenta aceptas nuestros{" "}
                <a
                  href="/terminos"
                  className="usuarioAuthTermsLink"
                  style={{ textDecoration: "none" }}
                >
                  Términos y Condiciones
                </a>{" "}
                y la{" "}
                <a
                  href="/privacidad"
                  className="usuarioAuthTermsLink"
                  style={{ textDecoration: "none" }}
                >
                  Política de Privacidad
                </a>
                .
              </p>
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
