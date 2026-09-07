import { Alert, Avatar, Button, CircularProgress } from "@mui/material";
import { usePerfilCliente } from "../../../hooks/usePerfilCliente";
import { clearStorageUsuario } from "../../../utils/storageUsuario";
import { getInicialesUsuario, type UsuarioSesion } from "../../../utils/usuarioSesion";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";
import { URL_DASHBOARD_COMERCIO } from "../../../api/http";

interface Props { usuario: UsuarioSesion; }

export default function PerfilUsuario({ usuario }: Props) {
  const { perfil, loading, error } = usePerfilCliente();
  const nombre = perfil?.nombre ?? usuario.nombre;
  const esComercio = usuario.rol?.toLowerCase() === "comercio";
  const cerrarSesion = () => { clearStorageUsuario(); window.location.replace("/"); };

  return <div className="usuarioCuentaPage"><div className="container py-4 py-lg-5"><div className="row justify-content-center"><div className="col-12 col-lg-10 col-xl-9">
    <div className="usuarioCuentaHeader mb-4"><div><span className="usuarioCuentaEyebrow">Mi cuenta</span><h1 className="usuarioCuentaTitle">Perfil</h1><p className="usuarioCuentaDescription">Consulta la información de tu cuenta y administra tu experiencia en ADLocal.</p></div><a href="/usuario/perfil/editar" className="btn-adlocal btn-adlocal--solid text-decoration-none"><MaterialSymbol icon="edit" size="small" /><span className="ms-2">Editar perfil</span></a></div>
    {error && <Alert severity="error" className="mb-3">{error}</Alert>}
    {loading ? <div className="d-flex justify-content-center py-5"><CircularProgress /></div> : <div className="row g-4">
      <div className="col-12 col-md-5 col-lg-4"><div className="usuarioPerfilCard"><div className="usuarioPerfilAvatarContainer"><Avatar src={perfil?.fotoUrl || usuario.fotoUrl || undefined} alt={nombre} className="usuarioPerfilAvatar">{getInicialesUsuario(nombre)}</Avatar></div><h2 className="usuarioPerfilNombre">{nombre}</h2><span className="usuarioPerfilTipo">{esComercio ? "Comercio ADLocal" : "Cliente ADLocal"}</span><div className="usuarioPerfilStatus"><span className="usuarioPerfilStatusDot" /><span>Cuenta activa</span></div></div></div>
      <div className="col-12 col-md-7 col-lg-8"><div className="usuarioCuentaCard"><div className="usuarioCuentaCardHeader"><div className="usuarioCuentaCardIcon"><MaterialSymbol icon="person" size="medium" /></div><div><h2 className="usuarioCuentaCardTitle">Información personal</h2><p className="usuarioCuentaCardDescription">Información asociada a tu cuenta.</p></div></div><div className="usuarioCuentaInfoList"><Info icon="badge" label="Nombre" value={nombre} /><Info icon="mail" label="Correo electrónico" value={perfil?.email || usuario.email || "Sin correo disponible"} /><Info icon="phone" label="Teléfono" value={perfil?.telefono || "Sin teléfono registrado"} /></div></div>
        <div className="usuarioCuentaCard mt-4"><div className="usuarioCuentaCardHeader"><div className="usuarioCuentaCardIcon"><MaterialSymbol icon="shopping_bag" size="medium" /></div><div><h2 className="usuarioCuentaCardTitle">Compras y actividad</h2><p className="usuarioCuentaCardDescription">Accede rápidamente a las funciones de tu cuenta.</p></div></div><div className="usuarioCuentaActions">{esComercio && <Action href={URL_DASHBOARD_COMERCIO} icon="storefront" title="Panel de mi Comercio" description="Gestiona tu tienda, productos, citas y pedidos en panel.adlocal.store." />}<Action href="/usuario/carrito" icon="shopping_cart" title="Mi carrito" description="Consulta los productos que quieres comprar." /><Action href="/usuario/pedidos" icon="receipt_long" title="Mis pedidos" description="Consulta el seguimiento y estado de tus pagos." /><Action href="/usuario/direcciones" icon="location_on" title="Mis direcciones" description="Administra tus direcciones." /></div></div>
        <div className="usuarioCuentaDangerCard mt-4"><div><h3 className="usuarioCuentaDangerTitle">Cerrar sesión</h3><p className="usuarioCuentaDangerDescription">Finaliza tu sesión actual en este dispositivo.</p></div><Button type="button" className="btn-adlocal btn-adlocal--danger" onClick={cerrarSesion}><MaterialSymbol icon="logout" size="small" /><span className="ms-2">Cerrar sesión</span></Button></div>
      </div>
    </div>}

  </div></div></div></div>;
}

const Info = ({ icon, label, value }: { icon: string; label: string; value: string }) => <div className="usuarioCuentaInfoItem"><div className="usuarioCuentaInfoIcon"><MaterialSymbol icon={icon} size="small" /></div><div className="usuarioCuentaInfoContent"><span className="usuarioCuentaInfoLabel">{label}</span><span className="usuarioCuentaInfoValue">{value}</span></div></div>;
const Action = ({ href, icon, title, description }: { href: string; icon: string; title: string; description: string }) => <a href={href} className="usuarioCuentaAction"><span className="usuarioCuentaActionIcon"><MaterialSymbol icon={icon} size="medium" /></span><span className="usuarioCuentaActionContent"><strong>{title}</strong><small>{description}</small></span><MaterialSymbol icon="chevron_right" size="medium" /></a>;
