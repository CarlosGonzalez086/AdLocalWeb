import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Swal from "../../utils/sweetalert";
import { citasApi } from "../../services/citasApi";
import type { ProductoServicioDto } from "../../services/comercioPublicApi";
import { cuentaCheckout } from "../../utils/checkoutOperacion";
import {
  diaCita,
  fechaCitaLocal,
  ReservaCitaOperacion,
} from "../../utils/citaOperacion";

interface Props {
  producto: ProductoServicioDto | null;
  zonaHoraria: string;
  onClose: () => void;
}
export default function ReservarCitaModal({
  producto,
  zonaHoraria,
  onClose,
}: Props) {
  return producto ? (
    <ReservaCitaFormulario
      key={`${producto.uuid}.${zonaHoraria}`}
      producto={producto}
      zonaHoraria={zonaHoraria}
      onClose={onClose}
    />
  ) : null;
}
function ReservaCitaFormulario({ producto, zonaHoraria, onClose }: Props) {
  const [inicio] = useState(() => {
    try {
      const op = new ReservaCitaOperacion(localStorage, cuentaCheckout());
      return { op, dto: op.pendiente(), error: "" };
    } catch {
      return {
        op: null,
        dto: null,
        error:
          "No se pudo leer tu reserva guardada. Revisa Mis citas antes de reservar.",
      };
    }
  });
  const [pendiente, setPendiente] = useState(inicio.dto);
  const [fecha, setFecha] = useState(
    inicio.dto?.fechaInicio.slice(0, 10) ?? "",
  );
  const [horarios, setHorarios] = useState<string[]>([]);
  const [hora, setHora] = useState(inicio.dto?.fechaInicio.slice(11, 16) ?? "");
  const [nombre, setNombre] = useState(inicio.dto?.nombrePersona ?? "");
  const [notas, setNotas] = useState(inicio.dto?.notas ?? "");
  const [consultando, setConsultando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(inicio.error);
  const vuelo = useRef(false);
  const zonaMostrada = pendiente?.zonaHoraria ?? zonaHoraria;
  useEffect(() => {
    let vigente = true;
    if (pendiente || !producto || !fecha) {
      setConsultando(false);
      if (!pendiente) {
        setHora("");
        setHorarios([]);
      }
      return;
    }
    if (
      !producto.uuid ||
      producto.uuid === "00000000-0000-0000-0000-000000000000"
    ) {
      setConsultando(false);
      setHora("");
      setHorarios([]);
      setError(
        "El servicio seleccionado no cuenta con un identificador válido para citas.",
      );
      return;
    }
    setHora("");
    setHorarios([]);
    setConsultando(true);
    setError("");
    citasApi
      .disponibilidad(producto.uuid, fecha)
      .then((r) => {
        if (vigente) {
          if (r.data.codigo !== "200") throw new Error(r.data.mensaje);
          setHorarios(r.data.respuesta ?? []);
        }
      })
      .catch((err: unknown) => {
        if (vigente) {
          const mensaje = (
            err as {
              response?: { data?: { mensaje?: string } };
              message?: string;
            }
          )?.response?.data?.mensaje;
          setError(mensaje ?? "No fue posible consultar los horarios.");
        }
      })
      .finally(() => {
        if (vigente) setConsultando(false);
      });
    return () => {
      vigente = false;
    };
  }, [fecha, producto, pendiente]);
  const guardar = async () => {
    if (vuelo.current || !inicio.op || inicio.error) return;
    if (
      !pendiente &&
      (!producto ||
        !producto.uuid ||
        producto.uuid === "00000000-0000-0000-0000-000000000000" ||
        !fecha ||
        !hora ||
        nombre.trim().length < 2)
    ) {
      setError(
        "Selecciona fecha, hora e indica un nombre de al menos dos caracteres.",
      );
      return;
    }
    vuelo.current = true;
    setGuardando(true);
    setError("");
    try {
      const dto = inicio.op.preparar({
        productoUuid: producto!.uuid,
        zonaHoraria,
        fechaInicio: `${fecha}T${hora}:00`,
        nombrePersona: nombre.trim(),
        notas: notas.trim() || undefined,
      });
      setPendiente(dto);
      const r = await citasApi.crear(dto);
      if (
        r.data.codigo !== "200" ||
        !r.data.respuesta?.uuid ||
        !r.data.respuesta.zonaHoraria
      )
        throw new Error(r.data.mensaje || "Respuesta incompleta.");
      inicio.op.completar();
      const registrada = r.data.respuesta;
      const estado = (
        {
          1: "Pendiente",
          2: "Confirmada",
          3: "En atención",
          4: "Completada",
          5: "Cancelada",
          6: "No asistió",
        } as Record<number, string>
      )[registrada.estado];
      await Swal.fire(
        "Reserva comprobada",
        `${fechaCitaLocal(registrada.fechaInicio)} · ${estado}`,
        "success",
      );
      onClose();
    } catch (e: unknown) {
      const mensaje = (
        e as { response?: { data?: { mensaje?: string } }; message?: string }
      )?.response?.data?.mensaje;
      setError(
        mensaje ??
          "No se confirmó la reserva. Revisa Mis citas o reintenta esta misma solicitud antes de reservar de nuevo.",
      );
    } finally {
      vuelo.current = false;
      setGuardando(false);
    }
  };
  return (
    <Dialog
      open={Boolean(producto)}
      onClose={guardando ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle className="fz-h2 fw-semibold">
        {pendiente
          ? "Comprobar reserva guardada"
          : `Reservar ${producto?.nombre}`}
      </DialogTitle>
      <DialogContent>
        <div className="d-flex flex-column gap-3 pt-2">
          {error && <Alert severity="error">{error}</Alert>}
          {pendiente && (
            <Alert severity="warning">
              Se reenviarán los datos originales con la misma clave. No se
              creará otra cita al recuperar una reserva ya confirmada. Puedes
              resolver la solicitud también desde{" "}
              <a href="/usuario/citas">Mis citas</a>.
            </Alert>
          )}
          <TextField
            label="Día de la cita"
            type="date"
            value={fecha}
            disabled={guardando || Boolean(pendiente)}
            onChange={(e) => setFecha(e.target.value)}
            slotProps={{
              htmlInput: { min: diaCita(new Date(), zonaMostrada) },
              inputLabel: { shrink: true },
            }}
            fullWidth
          />
          {pendiente ? (
            <p className="mb-0">
              Hora guardada: <strong>{hora}</strong>
            </p>
          ) : (
            <div>
              <h3 className="fz-h4 fw-semibold mb-2">Horarios disponibles</h3>
              {consultando ? (
                <CircularProgress size={24} />
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  {horarios.map((h) => (
                    <Button
                      key={h}
                      disabled={guardando}
                      variant={hora === h ? "contained" : "outlined"}
                      onClick={() => setHora(h)}
                    >
                      {h}
                    </Button>
                  ))}
                  {fecha && horarios.length === 0 && !error && (
                    <span>No hay horarios disponibles para este día.</span>
                  )}
                </div>
              )}
            </div>
          )}
          <TextField
            label="Nombre de la persona que será atendida"
            value={nombre}
            disabled={guardando || Boolean(pendiente)}
            onChange={(e) => setNombre(e.target.value)}
            slotProps={{ htmlInput: { maxLength: 100 } }}
            required
            fullWidth
          />
          <TextField
            label="Notas para el comercio (opcional)"
            value={notas}
            disabled={guardando || Boolean(pendiente)}
            onChange={(e) => setNotas(e.target.value)}
            slotProps={{ htmlInput: { maxLength: 500 } }}
            multiline
            minRows={2}
            fullWidth
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={guardando}>
          Cerrar
        </Button>
        <Button
          className="btn-adlocal btn-adlocal--solid"
          onClick={() => void guardar()}
          disabled={
            guardando || consultando || !inicio.op || (!pendiente && !hora)
          }
        >
          {guardando
            ? "Comprobando..."
            : pendiente
              ? "Reintentar la misma reserva"
              : "Confirmar cita"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
