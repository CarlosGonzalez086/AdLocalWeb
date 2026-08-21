import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";

interface RestablecerData {
  password: string;
  confirmarPassword: string;
}

interface Props {
  loading?: boolean;
  error?: string | null;
  onSubmit: (data: RestablecerData) => Promise<void>;
}

export default function RestablecerPassword({
  loading = false,
  error,
  onSubmit,
}: Props) {
  const [password, setPassword] = useState("");

  const [confirmarPassword, setConfirmarPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password) {
      setValidationError("La nueva contraseña es requerida.");
      return;
    }

    if (password.length < 8) {
      setValidationError("La contraseña debe contener al menos 8 caracteres.");
      return;
    }

    if (!confirmarPassword) {
      setValidationError("Confirma tu nueva contraseña.");
      return;
    }

    if (password !== confirmarPassword) {
      setValidationError("Las contraseñas no coinciden.");
      return;
    }

    setValidationError(null);

    await onSubmit({
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
            <div className="usuarioAuthCard">
              <div className="usuarioAuthHeader">
                <div className="usuarioAuthHeaderIcon">
                  <MaterialSymbol icon="key" size="large" filled />
                </div>

                <span className="usuarioAuthType">Seguridad</span>

                <h1 className="usuarioAuthTitle">Nueva contraseña</h1>

                <p className="usuarioAuthDescription">
                  Crea una nueva contraseña para recuperar el acceso a tu cuenta
                  ADLocal.
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
                    placeholder="Nueva contraseña"
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
                    placeholder="Confirmar nueva contraseña"
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
                    {loading ? "Actualizando..." : "Cambiar contraseña"}
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
