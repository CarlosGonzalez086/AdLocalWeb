import { Badge, IconButton, Menu } from "@mui/material";
import { useState, type MouseEvent } from "react";
import { useNotificaciones } from "../../../hooks/useNotificaciones";
import type { Notificacion } from "../../../types/notificaciones";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";

export default function NotificacionesMenu() {
  const [ancla, setAncla] = useState<HTMLElement | null>(null);
  const { notificaciones, noLeidas, leer, leerTodas } = useNotificaciones(true);

  const abrirNotificacion = async (notificacion: Notificacion) => {
    await leer(notificacion);
    setAncla(null);
    if (notificacion.url) window.location.href = notificacion.url;
  };
  console.log(notificaciones);

  return (
    <>
      <IconButton
        className="notificationButton"
        aria-label={`${noLeidas} notificaciones sin leer`}
        onClick={(event: MouseEvent<HTMLElement>) =>
          setAncla(event.currentTarget)
        }
      >
        <Badge badgeContent={noLeidas} color="error" max={99}>
          <MaterialSymbol icon="notifications" size="small" filled className="mt-2"/>
        </Badge>
      </IconButton>
      <Menu
        anchorEl={ancla}
        open={Boolean(ancla)}
        onClose={() => setAncla(null)}
        slotProps={{ paper: { className: "notificationMenu" } }}
      >
        <div className="d-flex align-items-center justify-content-between px-3 py-2">
          <h2 className="fz-h4 fw-bold mb-0">Notificaciones</h2>
          {noLeidas > 0 && (
            <button
              type="button"
              className="btn-adlocal btn-adlocal--ghost btn-adlocal--sm"
              onClick={() => void leerTodas()}
            >
              Leer todas
            </button>
          )}
        </div>
        {notificaciones.length === 0 ? (
          <p className="notificationEmpty fz-h5 mb-0 px-3 py-4">
            No tienes notificaciones.
          </p>
        ) : (
          notificaciones.map((item) => (
            <button
              key={item.uuid}
              type="button"
              className={`notificationItem w-100 text-start px-3 py-2 ${item.leida ? "" : "notificationItem--unread"}`}
              onClick={() => void abrirNotificacion(item)}
            >
              <span className="d-block fz-h5 fw-bold">{item.titulo}</span>
              <span className="d-block fz-small">{item.mensaje}</span>
              <span className="d-block notificationDate fz-small">
                {new Date(item.fechaCreacion).toLocaleString("es-MX")}
              </span>
            </button>
          ))
        )}
      </Menu>
    </>
  );
}
