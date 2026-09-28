import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { usePerfilCliente } from "../../../hooks/usePerfilCliente";
import { clearStorageUsuario } from "../../../utils/storageUsuario";
import {
  getInicialesUsuario,
  type UsuarioSesion,
} from "../../../utils/usuarioSesion";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";

interface Props {
  usuario: UsuarioSesion;
}
const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];
const maximoFoto = 5 * 1024 * 1024;

export default function EditarPerfilUsuario({ usuario }: Props) {
  const { perfil, loading, guardando, error, mensaje, guardar } =
    usePerfilCliente();
  const [nombre, setNombre] = useState(usuario.nombre);
  const [telefono, setTelefono] = useState("");
  const [fotoBase64, setFotoBase64] = useState<string | null>(null);
  const [errorFoto, setErrorFoto] = useState<string | null>(null);
  const inputFoto = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (perfil) {
      setNombre(perfil.nombre);
      setTelefono(perfil.telefono ?? "");
    }
  }, [perfil]);

  const seleccionarFoto = (archivo?: File) => {
    setErrorFoto(null);
    if (!archivo) return;
    if (!tiposPermitidos.includes(archivo.type)) {
      setErrorFoto("Selecciona una imagen JPG, PNG o WEBP.");
      return;
    }
    if (archivo.size > maximoFoto) {
      setErrorFoto("La imagen no puede superar 5 MB.");
      return;
    }
    const lector = new FileReader();
    lector.onload = () =>
      typeof lector.result === "string" && setFotoBase64(lector.result);
    lector.onerror = () => setErrorFoto("No fue posible leer la imagen.");
    lector.readAsDataURL(archivo);
  };

  const enviar = async () => {
    const correcto = await guardar({
      nombre: nombre.trim(),
      telefono: telefono.trim() || null,
      fotoBase64,
    });
    if (correcto) {
      setFotoBase64(null);
      if (inputFoto.current) inputFoto.current.value = "";
    }
  };

  const cerrarSesion = () => {
    clearStorageUsuario();
    window.location.replace("/");
  };
  const nombreVisible = perfil?.nombre ?? usuario.nombre;
  const fotoVisible =
    fotoBase64 ?? perfil?.fotoUrl ?? usuario.fotoUrl ?? undefined;

  return (
    <div className="usuarioCuentaPage">
      <div className="container py-4 py-lg-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            <div className="usuarioCuentaHeader mb-4">
              <div>
                <span className="usuarioCuentaEyebrow">Mi cuenta</span>
                <h1 className="usuarioCuentaTitle">Editar perfil</h1>
                <p className="usuarioCuentaDescription">
                  Actualiza tu información personal y foto de perfil.
                </p>
              </div>
              <a
                href="/usuario/perfil"
                className="btn-adlocal btn-adlocal-ghost text-decoration-none d-inline-flex align-items-center"
              >
                <MaterialSymbol
                  icon="arrow_back"
                  size="small"                  
                />
                <span className="ms-2">Volver al perfil</span>
              </a>
            </div>
            {error && (
              <Alert severity="error" className="mb-3">
                {error}
              </Alert>
            )}
            {mensaje && (
              <Alert severity="success" className="mb-3">
                {mensaje}
              </Alert>
            )}
            {loading ? (
              <div className="d-flex justify-content-center py-5">
                <CircularProgress />
              </div>
            ) : (
              <div className="row g-4">
                <div className="col-12 col-md-5 col-lg-4">
                  <div className="usuarioPerfilCard card-adlocal p-4 text-center">
                    <div className="usuarioPerfilAvatarContainer mb-3 d-flex justify-content-center">
                      <Avatar
                        src={fotoVisible}
                        alt={nombreVisible}
                        className="usuarioPerfilAvatar"
                      >
                        {getInicialesUsuario(nombreVisible)}
                      </Avatar>
                    </div>
                    <h2 className="usuarioPerfilNombre fz-h3 fw-bold mb-1">{nombreVisible}</h2>
                    <span className="usuarioPerfilTipo fz-body-sm text-secondary d-block mb-3">Cliente ADLocal</span>
                    <input
                      ref={inputFoto}
                      type="file"
                      hidden
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(event) =>
                        seleccionarFoto(event.target.files?.[0])
                      }
                    />
                    <Button
                      type="button"
                      className="btn-adlocal btn-adlocal-outline mt-2"
                      disabled={guardando}
                      onClick={() => inputFoto.current?.click()}
                    >
                      <MaterialSymbol icon="photo_camera" size="small" />
                      <span className="ms-2">Cambiar foto</span>
                    </Button>
                    {errorFoto && (
                      <span className="usuarioPerfilError fz-caption text-danger d-block mt-2">
                        {errorFoto}
                      </span>
                    )}
                    <span className="usuarioCuentaDescription fz-caption text-muted d-block mt-2">
                      JPG, PNG o WEBP. Máximo 5 MB.
                    </span>
                  </div>
                </div>
                <div className="col-12 col-md-7 col-lg-8">
                  <div className="usuarioCuentaCard card-adlocal p-4">
                    <div className="usuarioCuentaCardHeader d-flex align-items-center gap-3 mb-3">
                      <div className="usuarioCuentaCardIcon">
                        <MaterialSymbol icon="person" size="medium" />
                      </div>
                      <div>
                        <h2 className="usuarioCuentaCardTitle fz-h3 fw-bold mb-0">
                          Información personal
                        </h2>
                        <p className="usuarioCuentaCardDescription fz-caption text-secondary mb-0">
                          El correo no puede modificarse desde esta sección.
                        </p>
                      </div>
                    </div>
                    <div className="row g-3 mt-1">
                      <div className="col-12">
                        <TextField
                          fullWidth
                          label="Nombre"
                          value={nombre}
                          inputProps={{ maxLength: 150 }}
                          onChange={(event) => setNombre(event.target.value)}
                        />
                      </div>
                      <div className="col-12">
                        <TextField
                          fullWidth
                          label="Teléfono"
                          value={telefono}
                          inputProps={{ maxLength: 20, inputMode: "tel" }}
                          onChange={(event) => setTelefono(event.target.value)}
                          helperText="Entre 10 y 20 caracteres."
                        />
                      </div>
                      <div className="col-12">
                        <TextField
                          fullWidth
                          disabled
                          label="Correo electrónico"
                          value={perfil?.email ?? usuario.email}
                        />
                      </div>
                      <div className="col-12">
                        <Button
                          fullWidth
                          type="button"
                          className="btn-adlocal btn-adlocal-primary"
                          disabled={
                            guardando || !nombre.trim() || Boolean(errorFoto)
                          }
                          onClick={() => void enviar()}
                        >
                          {guardando ? (
                            <>
                              <CircularProgress size={18} color="inherit" />
                              <span className="ms-2">Guardando...</span>
                            </>
                          ) : (
                            <>
                              <MaterialSymbol icon="save" size="small" />
                              <span className="ms-2">Guardar cambios</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="usuarioCuentaDangerCard mt-4 d-flex justify-content-between align-items-center p-3">
                    <div>
                      <h3 className="usuarioCuentaDangerTitle fz-h4 fw-bold mb-1">
                        Cerrar sesión
                      </h3>
                      <p className="usuarioCuentaDangerDescription fz-caption text-secondary mb-0">
                        Finaliza tu sesión actual en este dispositivo.
                      </p>
                    </div>
                    <Button
                      type="button"
                      className="btn-adlocal btn-adlocal-danger"
                      onClick={cerrarSesion}
                    >
                      <MaterialSymbol icon="logout" size="small" />
                      <span className="ms-2">Cerrar sesión</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
