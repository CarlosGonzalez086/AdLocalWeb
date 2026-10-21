import { Alert, Button, Chip, CircularProgress } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { citasApi, type CitaDto } from "../../../services/citasApi";
import { cuentaCheckout } from "../../../utils/checkoutOperacion";
import {
  fechaCitaLocal,
  ReservaCitaOperacion,
} from "../../../utils/citaOperacion";
import { GestionarCitaModal } from "./GestionarCitaModal";
const estados: Record<number, string> = {
  1: "Pendiente",
  2: "Confirmada",
  3: "En atención",
  4: "Completada",
  5: "Cancelada",
  6: "No asistió",
};
export default function CitasUsuario() {
  const [seleccion, setSeleccion] = useState<{
    cita: CitaDto;
    modo: "cancelar" | "reprogramar";
  } | null>(null);
  const [pendiente, setPendiente] = useState(false);
  const [recuperando, setRecuperando] = useState(false);
  const vuelo = useRef(false);
  const [citas, setCitas] = useState<CitaDto[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  const cargar = useCallback(async () => {
    setError("");
    try {
      const r = await citasApi.mias();
      if (r.data.codigo !== "200") throw new Error(r.data.mensaje);
      const datos = r.data.respuesta ?? [];
      setCitas(datos);
      setSeleccion((v) =>
        v
          ? { ...v, cita: datos.find((c) => c.uuid === v.cita.uuid) ?? v.cita }
          : null,
      );
      try {
        const op = new ReservaCitaOperacion(localStorage, cuentaCheckout());
        setPendiente(Boolean(op.pendiente()));
      } catch {
        setPendiente(true);
        setError(
          "No se pudo leer la reserva guardada. Revisa la lista antes de cerrar esa comprobación.",
        );
      }
    } catch {
      setError("No fue posible comprobar tus citas o la solicitud guardada.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void cargar();
  }, [cargar]);
  const recuperar = async () => {
    if (vuelo.current) return;
    vuelo.current = true;
    setRecuperando(true);
    setError("");
    try {
      const op = new ReservaCitaOperacion(localStorage, cuentaCheckout());
      const dto = op.pendiente();
      if (dto) {
        const r = await citasApi.crear(dto);
        if (r.data.codigo !== "200" || !r.data.respuesta?.uuid)
          throw new Error(r.data.mensaje);
        op.completar();
      }
      setPendiente(false);
      await cargar();
    } catch (e: unknown) {
      setError(
        (e as { response?: { data?: { mensaje?: string } } })?.response?.data
          ?.mensaje ??
          "No se comprobó la reserva. Conserva la solicitud y revisa la lista antes de reservar otra cita.",
      );
    } finally {
      vuelo.current = false;
      setRecuperando(false);
    }
  };
  const descartar = async () => {
    const { default: Swal } = await import("../../../utils/sweetalert");
    const r = await Swal.fire({
      title: "Cerrar comprobación pendiente",
      text: "Confirma que revisaste tus citas. Esto elimina solo la solicitud guardada; no cancela una reserva existente.",
      showCancelButton: true,
      confirmButtonText: "Ya revisé mis citas",
      cancelButtonText: "Conservar",
    });
    if (r.isConfirmed) {
      try {
        new ReservaCitaOperacion(localStorage, cuentaCheckout()).completar();
        setPendiente(false);
      } catch {
        setError("No se pudo eliminar la solicitud local.");
      }
    }
  };
  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="fz-h1 fw-bold mb-1">Mis citas</h1>
        <p className="fz-h4 mb-0">
          Consulta tus próximas reservaciones y quién recibirá la atención.
        </p>
      </div>
      {error && <Alert severity="error">{error}</Alert>}
      <p>
        Cada cita muestra la hora local y la zona del comercio donde reservaste.
      </p>
      <Button disabled={loading || recuperando} onClick={() => void cargar()}>
        Actualizar mis citas
      </Button>
      {pendiente && (
        <Alert severity="warning">
          Hay una reserva pendiente de comprobar. Reintentar utiliza los datos y
          la clave originales.
          <div className="d-flex flex-wrap gap-2 mt-2">
            <Button disabled={recuperando} onClick={() => void recuperar()}>
              Comprobar reserva guardada
            </Button>
            <Button disabled={recuperando} onClick={() => void descartar()}>
              Ya revisé mis citas
            </Button>
          </div>
        </Alert>
      )}
      {loading ? (
        <div className="text-center py-5">
          <CircularProgress />
        </div>
      ) : citas.length === 0 ? (
        <div className="appointment-empty p-4">
          <h2 className="fz-h3 fw-semibold">Aún no tienes citas</h2>
          <p className="mb-0">
            Reserva un servicio desde el perfil de un comercio.
          </p>
        </div>
      ) : (
        <div className="row g-3">
          {citas.map((c) => (
            <div key={c.uuid} className="col-12 col-md-6">
              <div className="appointment-client-card h-100 p-3">
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div>
                    <h2 className="fz-h3 fw-semibold mb-1">{c.servicio}</h2>
                    <p className="fz-h5 mb-0">{c.comercio}</p>
                  </div>
                  <Chip size="small" label={estados[c.estado]} />
                </div>
                <hr />
                <p className="mb-1">
                  <strong>Fecha:</strong> {fechaCitaLocal(c.fechaInicio)} ·{" "}
                  {c.zonaHoraria}
                </p>
                <p className="mb-1">
                  <strong>Persona atendida:</strong> {c.nombrePersona}
                </p>
                <p className="mb-0">
                  <strong>Atiende:</strong> {c.nombreAtiende || "Por asignar"}
                </p>
                {c.motivoCancelacion && (
                  <p className="mt-2 mb-0">
                    <strong>Motivo:</strong> {c.motivoCancelacion}
                  </p>
                )}
                {c.puedeGestionarCliente && (
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    <Button
                      onClick={() =>
                        setSeleccion({ cita: c, modo: "reprogramar" })
                      }
                    >
                      Reprogramar
                    </Button>
                    <Button
                      color="error"
                      onClick={() =>
                        setSeleccion({ cita: c, modo: "cancelar" })
                      }
                    >
                      Cancelar cita
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {seleccion && (
        <GestionarCitaModal
          cita={seleccion.cita}
          modo={seleccion.modo}
          onClose={() => setSeleccion(null)}
          onActualizar={cargar}
          onConfirmada={(cita) => {
            setCitas((v) => v.map((c) => (c.uuid === cita.uuid ? cita : c)));
            setSeleccion(null);
          }}
        />
      )}
    </div>
  );
}
