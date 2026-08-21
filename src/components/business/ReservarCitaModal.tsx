import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { citasApi } from "../../services/citasApi";
import type { ProductoServicioDto } from "../../services/comercioPublicApi";

interface Props { producto: ProductoServicioDto | null; onClose: () => void; }

export default function ReservarCitaModal({ producto, onClose }: Props) {
  const [fecha, setFecha] = useState("");
  const [horarios, setHorarios] = useState<string[]>([]);
  const [hora, setHora] = useState("");
  const [nombre, setNombre] = useState("");
  const [notas, setNotas] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setHora(""); setHorarios([]); setError("");
    if (!producto || !fecha) return;
    setLoading(true);
    citasApi.disponibilidad(producto.uuid, fecha)
      .then((r) => setHorarios(r.data.respuesta ?? []))
      .catch(() => setError("No fue posible consultar los horarios."))
      .finally(() => setLoading(false));
  }, [fecha, producto]);

  const guardar = async () => {
    if (!producto || !fecha || !hora || !nombre.trim()) { setError("Selecciona fecha, hora e indica quién recibirá la atención."); return; }
    setLoading(true); setError("");
    try {
      await citasApi.crear({ productoUuid: producto.uuid, fechaInicio: `${fecha}T${hora}:00`, nombrePersona: nombre.trim(), notas: notas.trim() || undefined });
      await Swal.fire("Cita agendada", `Tu cita quedó reservada para el ${fecha} a las ${hora}.`, "success");
      onClose();
    } catch (e: any) { setError(e?.response?.data?.mensaje ?? "Ese horario ya no está disponible."); }
    finally { setLoading(false); }
  };

  const hoy = new Date(); hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
  return <Dialog open={Boolean(producto)} onClose={loading ? undefined : onClose} fullWidth maxWidth="sm">
    <DialogTitle className="fz-h2 fw-semibold">Reservar {producto?.nombre}</DialogTitle>
    <DialogContent>
      <div className="d-flex flex-column gap-3 pt-2">
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Día de la cita" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} inputProps={{ min: hoy.toISOString().slice(0, 10) }} slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        <div>
          <h3 className="fz-h4 fw-semibold mb-2">Horarios disponibles</h3>
          {!loading && horarios.length > 0 && <p className="fz-h5 mb-2">Hay {horarios.length} espacios disponibles para este día.</p>}
          {loading && fecha ? <CircularProgress size={24} /> : <div className="d-flex flex-wrap gap-2">{horarios.map((h) => <Button key={h} variant={hora === h ? "contained" : "outlined"} onClick={() => setHora(h)}>{h}</Button>)}{fecha && horarios.length === 0 && <span className="fz-h5">No hay horarios disponibles para este día.</span>}</div>}
        </div>
        <TextField label="Nombre de la persona que será atendida" value={nombre} onChange={(e) => setNombre(e.target.value)} required fullWidth helperText="Puede ser tu nombre, el de un hijo, familiar o amigo." />
        <TextField label="Notas para el comercio (opcional)" value={notas} onChange={(e) => setNotas(e.target.value)} multiline minRows={2} fullWidth />
      </div>
    </DialogContent>
    <DialogActions><Button onClick={onClose} disabled={loading}>Cancelar</Button><Button className="btn-adlocal btn-adlocal--solid" onClick={() => void guardar()} disabled={loading || !hora}>{loading ? "Agendando..." : "Confirmar cita"}</Button></DialogActions>
  </Dialog>;
}
