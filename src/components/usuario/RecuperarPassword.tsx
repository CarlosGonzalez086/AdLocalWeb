import { Alert, Button, InputAdornment, TextField } from "@mui/material";
import { useState, type FormEvent } from "react";
import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";

interface Props {
  loading?: boolean;
  error?: string | null;
  onSubmit: (email: string) => Promise<void>;
}

export default function RecuperarPassword({
  loading = false,
  error,
  onSubmit,
}: Props) {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailLimpio = email.trim();

    if (!emailLimpio) {
      setValidationError("El correo electrónico es requerido.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailLimpio)) {
      setValidationError("Ingresa un correo electrónico válido.");
      return;
    }

    setValidationError(null);

    await onSubmit(emailLimpio);
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
              <a href="/" className="usuarioAuthLogoLink">
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
                  <MaterialSymbol icon="lock_reset" size="large" filled />
                </div>

                <span className="usuarioAuthType">Recuperar acceso</span>

                <h1 className="usuarioAuthTitle">Recuperar contraseña</h1>

                <p className="usuarioAuthDescription">
                  Ingresa el correo asociado a tu cuenta. Te enviaremos un
                  código de seguridad para continuar.
                </p>
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

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    className="btn-adlocal btn-adlocal--solid usuarioAuthSubmit fz-h3 fw-bold"
                  >
                    {loading ? "Enviando código..." : "Enviar código"}
                  </Button>
                </div>
              </form>

              <a
                href="/usuario/login"
                className="usuarioAuthForgotPassword"
                style={{ textDecoration: "none" }}
              >
                <MaterialSymbol icon="arrow_back" size="small" />

                <span>Volver a iniciar sesión</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
