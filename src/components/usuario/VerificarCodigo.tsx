import { Alert, Button, InputAdornment, TextField } from "@mui/material";
import { useState, type FormEvent } from "react";
import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";

interface Props {
  loading?: boolean;
  error?: string | null;
  email: string;
  onSubmit: (codigo: string) => Promise<void>;
}

export default function VerificarCodigo({
  loading = false,
  error,
  email,
  onSubmit,
}: Props) {
  const [codigo, setCodigo] = useState("");

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleCodigoChange = (value: string) => {
    const soloNumeros = value.replace(/\D/g, "").slice(0, 6);

    setCodigo(soloNumeros);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!codigo) {
      setValidationError("Ingresa el código de recuperación.");
      return;
    }

    if (codigo.length !== 6) {
      setValidationError("El código debe contener 6 dígitos.");
      return;
    }

    setValidationError(null);

    await onSubmit(codigo);
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
            <div className="usuarioAuthCard">
              <div className="usuarioAuthHeader">
                <div className="usuarioAuthHeaderIcon">
                  <MaterialSymbol icon="password" size="large" filled />
                </div>

                <span className="usuarioAuthType">Verificación</span>

                <h1 className="usuarioAuthTitle">Ingresa el código</h1>

                <p className="usuarioAuthDescription">
                  Enviamos un código de 6 dígitos a:
                </p>

                <div className="usuarioAuthEmailBadge">
                  <MaterialSymbol icon="mail" size="small" />

                  <span>{email}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="usuarioAuthForm">
                <div className="d-flex flex-column gap-3">
                  {mensajeError && (
                    <Alert severity="error" className="usuarioAuthAlert">
                      {mensajeError}
                    </Alert>
                  )}

                  <TextField
                    placeholder="000000"
                    fullWidth
                    value={codigo}
                    disabled={loading}
                    onChange={(event) => handleCodigoChange(event.target.value)}
                    inputProps={{
                      inputMode: "numeric",
                      maxLength: 6,
                    }}
                    className="usuarioAuthField usuarioAuthCodeField"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MaterialSymbol
                            icon="key"
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
                    {loading ? "Verificando..." : "Verificar código"}
                  </Button>
                </div>
              </form>

              <a
                href="/usuario/recuperar-contrasena"
                className="usuarioAuthForgotPassword"
                style={{ textDecoration: "none" }}
              >
                <MaterialSymbol icon="refresh" size="small" />

                <span>Solicitar otro código</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
