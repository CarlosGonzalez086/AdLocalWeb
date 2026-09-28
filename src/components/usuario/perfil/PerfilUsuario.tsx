import { Alert, Avatar, Button, CircularProgress } from "@mui/material";
import { usePerfilCliente } from "../../../hooks/usePerfilCliente";
import { clearStorageUsuario } from "../../../utils/storageUsuario";
import {
  getInicialesUsuario,
  type UsuarioSesion,
} from "../../../utils/usuarioSesion";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";
import { URL_DASHBOARD_COMERCIO } from "../../../api/http";

interface Props {
  usuario: UsuarioSesion;
}

export default function PerfilUsuario({ usuario }: Props) {
  const { perfil, loading, error } = usePerfilCliente();
  const nombre = perfil?.nombre ?? usuario.nombre;
  const esComercio = usuario.rol?.toLowerCase() === "comercio";

  const cerrarSesion = () => {
    clearStorageUsuario();
    window.location.replace("/");
  };

  return (
    <div className="usuarioCuentaPage">
      <div className="container py-4 py-lg-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            <div className="usuarioCuentaHeader d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
              <div>
                <span className="usuarioCuentaEyebrow fz-caption fw-bold text-uppercase">
                  Mi cuenta
                </span>
                <h1 className="usuarioCuentaTitle fz-h1 fw-bold">Perfil</h1>
                <p className="usuarioCuentaDescription fz-body text-secondary mb-0">
                  Consulta la información de tu cuenta y administra tu experiencia en ADLocal.
                </p>
              </div>

              <a
                href="/usuario/perfil/editar"
                className="btn-adlocal btn-adlocal-primary text-decoration-none"
              >
                <MaterialSymbol icon="edit" size="small" />
                <span className="ms-2">Editar perfil</span>
              </a>
            </div>

            {error && (
              <Alert severity="error" className="mb-3">
                {error}
              </Alert>
            )}

            {loading ? (
              <div className="d-flex justify-content-center py-5">
                <CircularProgress />
              </div>
            ) : (
              <div className="row g-4">
                {/* Columna lateral: Avatar y Estado */}
                <div className="col-12 col-md-5 col-lg-4">
                  <div className="usuarioPerfilCard card-adlocal p-4 text-center">
                    <div className="usuarioPerfilAvatarContainer mb-3 d-flex justify-content-center">
                      <Avatar
                        src={perfil?.fotoUrl || usuario.fotoUrl || undefined}
                        alt={nombre}
                        className="usuarioPerfilAvatar"
                      >
                        {getInicialesUsuario(nombre)}
                      </Avatar>
                    </div>

                    <h2 className="usuarioPerfilNombre fz-h3 fw-bold mb-1">
                      {nombre}
                    </h2>

                    <span className="usuarioPerfilTipo fz-body-sm text-secondary d-block mb-3">
                      {esComercio ? "Comercio ADLocal" : "Cliente ADLocal"}
                    </span>

                    <div className="usuarioPerfilStatus d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill">
                      <span className="usuarioPerfilStatusDot" />
                      <span className="fz-caption fw-bold">Cuenta activa</span>
                    </div>
                  </div>
                </div>

                {/* Columna principal: Información y Accesos */}
                <div className="col-12 col-md-7 col-lg-8">
                  {/* Tarjeta de Información Personal */}
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
                          Información asociada a tu cuenta.
                        </p>
                      </div>
                    </div>

                    <div className="usuarioCuentaInfoList">
                      <InfoItem icon="badge" label="Nombre" value={nombre} />
                      <InfoItem
                        icon="mail"
                        label="Correo electrónico"
                        value={
                          perfil?.email || usuario.email || "Sin correo disponible"
                        }
                      />
                      <InfoItem
                        icon="phone"
                        label="Teléfono"
                        value={perfil?.telefono || "Sin teléfono registrado"}
                      />
                    </div>
                  </div>

                  {/* Tarjeta de Actividad y Accesos Rápidos */}
                  <div className="usuarioCuentaCard card-adlocal p-4 mt-4">
                    <div className="usuarioCuentaCardHeader d-flex align-items-center gap-3 mb-3">
                      <div className="usuarioCuentaCardIcon">
                        <MaterialSymbol icon="shopping_bag" size="medium" />
                      </div>
                      <div>
                        <h2 className="usuarioCuentaCardTitle fz-h3 fw-bold mb-0">
                          Compras y actividad
                        </h2>
                        <p className="usuarioCuentaCardDescription fz-caption text-secondary mb-0">
                          Accede rápidamente a las funciones de tu cuenta.
                        </p>
                      </div>
                    </div>

                    <div className="usuarioCuentaActions">
                      {esComercio && (
                        <ActionItem
                          href={URL_DASHBOARD_COMERCIO}
                          icon="storefront"
                          title="Panel de mi Comercio"
                          description="Gestiona tu tienda, productos, citas y pedidos en panel.adlocal.store."
                        />
                      )}
                      <ActionItem
                        href="/usuario/carrito"
                        icon="shopping_cart"
                        title="Mi carrito"
                        description="Consulta los productos que quieres comprar."
                      />
                      <ActionItem
                        href="/usuario/pedidos"
                        icon="receipt_long"
                        title="Mis pedidos"
                        description="Consulta el seguimiento y estado de tus compras."
                      />
                      <ActionItem
                        href="/usuario/direcciones"
                        icon="location_on"
                        title="Mis direcciones"
                        description="Administra tus direcciones de entrega."
                      />
                    </div>
                  </div>

                  {/* Tarjeta de Zona de Peligro / Sesión */}
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

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="usuarioCuentaInfoItem d-flex align-items-center gap-3 py-3 border-top">
      <div className="usuarioCuentaInfoIcon">
        <MaterialSymbol icon={icon} size="small" />
      </div>
      <div className="usuarioCuentaInfoContent">
        <span className="usuarioCuentaInfoLabel fz-caption text-muted text-uppercase fw-semibold">
          {label}
        </span>
        <span className="usuarioCuentaInfoValue fz-body fw-medium text-dark">
          {value}
        </span>
      </div>
    </div>
  );
}

function ActionItem({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="usuarioCuentaAction d-flex align-items-center gap-3 p-3 text-decoration-none border-bottom"
    >
      <span className="usuarioCuentaActionIcon">
        <MaterialSymbol icon={icon} size="medium" />
      </span>
      <span className="usuarioCuentaActionContent flex-grow-1">
        <strong className="fz-body fw-bold d-block text-dark">{title}</strong>
        <small className="fz-caption text-secondary d-block">{description}</small>
      </span>
      <MaterialSymbol icon="chevron_right" size="medium" className="text-secondary" />
    </a>
  );
}
