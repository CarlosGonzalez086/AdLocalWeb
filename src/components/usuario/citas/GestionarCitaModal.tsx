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
import { citasApi, type CitaDto } from "../../../services/citasApi";
import { diaCita, fechaCitaLocal } from "../../../utils/citaOperacion";

export function GestionarCitaModal({
  cita,
  modo,
  onClose,
  onConfirmada,
  onActualizar,
}: {
  cita: CitaDto;
  modo: "cancelar" | "reprogramar";
  onClose: () => void;
  onConfirmada: (cita: CitaDto) => void;
  onActualizar: () => Promise<void>;
}) {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [motivo, setMotivo] = useState("");
  const [horarios, setHorarios] = useState<string[]>([]);
  const [consultando, setConsultando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const vuelo = useRef(false);
  useEffect(() => {
    let vigente = true;
    setHora("");
    setHorarios([]);
    if (modo !== "reprogramar" || !fecha) {
      setConsultando(false);
      return;
    }
    setConsultando(true);
    citasApi
      .disponibilidad(cita.productoUuid, fecha, cita.uuid)
      .then((r) => {
        if (vigente) {
          if (r.data.codigo !== "200") throw new Error(r.data.mensaje);
          setHorarios(r.data.respuesta ?? []);
        }
      })
      .catch(() => {
        if (vigente)
          setError(
            "No fue posible consultar horarios. Actualiza la cita y vuelve a comprobar.",
          );
      })
      .finally(() => {
        if (vigente) setConsultando(false);
      });
    return () => {
      vigente = false;
    };
  }, [cita.productoUuid, cita.uuid, cita.version, fecha, modo]);
  const guardar = async () => {
    if (vuelo.current || !cita.puedeGestionarCliente) return;
    if (modo === "cancelar" ? !motivo.trim() : !fecha || !hora) {
      setError("Completa los datos de la operación.");
      return;
    }
    vuelo.current = true;
    setGuardando(true);
    setError("");
    try {
      const r =
        modo === "cancelar"
          ? await citasApi.cancelar(cita.uuid, cita.version, motivo.trim())
          : await citasApi.reprogramar(
              cita.uuid,
              cita.version,
              `${fecha}T${hora}:00`,
              cita.zonaHoraria,
            );
      if (r.data.codigo !== "200" || !r.data.respuesta?.uuid)
        throw new Error(r.data.mensaje);
      onConfirmada(r.data.respuesta);
    } catch (e: unknown) {
      setError(
        (e as { response?: { data?: { mensaje?: string } } })?.response?.data
          ?.mensaje ??
          "No se confirmó el cambio. Actualiza la cita para comprobar el resultado antes de reintentar.",
      );
    } finally {
      vuelo.current = false;
      setGuardando(false);
    }
  };
  return (
    <Dialog
      open
      onClose={guardando ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {modo === "cancelar" ? "Cancelar cita" : "Reprogramar cita"}
      </DialogTitle>
      <DialogContent>
        <div className="d-flex flex-column gap-3 pt-2">
          <p className="mb-0">
            <strong>{cita.servicio}</strong>
            <br />
            {fechaCitaLocal(cita.fechaInicio)} · {cita.zonaHoraria}
          </p>
          {error && <Alert severity="error">{error}</Alert>}
          {!cita.puedeGestionarCliente && (
            <Alert severity="warning">
              Esta cita ya no permite cambios del cliente.
            </Alert>
          )}
          {modo === "cancelar" ? (
            <TextField
              label="Motivo de cancelación"
              multiline
              minRows={2}
              required
              value={motivo}
              disabled={guardando}
              onChange={(e) => setMotivo(e.target.value)}
              slotProps={{ htmlInput: { maxLength: 500 } }}
            />
          ) : (
            <>
              <Alert severity="info">
                El horario anterior se conservará si la nueva reserva falla. Al
                reprogramar, el comercio deberá confirmar nuevamente.
              </Alert>
              <TextField
                type="date"
                label="Nueva fecha"
                value={fecha}
                disabled={guardando}
                onChange={(e) => setFecha(e.target.value)}
                slotProps={{
                  htmlInput: { min: diaCita(new Date(), cita.zonaHoraria) },
                  inputLabel: { shrink: true },
                }}
              />
              {consultando ? (
                <CircularProgress size={24} />
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  {horarios.map((h) => (
                    <Button
                      key={h}
                      disabled={guardando}
                      variant={h === hora ? "contained" : "outlined"}
                      onClick={() => setHora(h)}
                    >
                      {h}
                    </Button>
                  ))}
                  {fecha && horarios.length === 0 && (
                    <span>No hay horarios disponibles.</span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
      <DialogActions className="flex-wrap gap-2">
        <Button disabled={guardando} onClick={onClose}>
          Cerrar
        </Button>
        <Button disabled={guardando} onClick={() => void onActualizar()}>
          Actualizar cita
        </Button>
        <Button
          disabled={guardando || consultando || !cita.puedeGestionarCliente}
          onClick={() => void guardar()}
        >
          {guardando
            ? "Guardando..."
            : modo === "cancelar"
              ? "Confirmar cancelación"
              : "Confirmar nuevo horario"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
