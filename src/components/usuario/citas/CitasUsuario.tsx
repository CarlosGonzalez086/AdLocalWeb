import { Alert, Chip, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { citasApi, type CitaDto } from "../../../services/citasApi";
const estados: Record<number, string> = {
  1: "Pendiente",
  2: "Confirmada",
  3: "En atención",
  4: "Completada",
  5: "Cancelada",
  6: "No asistió",
};
export default function CitasUsuario() {
  const [citas, setCitas] = useState<CitaDto[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  useEffect(() => {
    citasApi
      .mias()
      .then((r) => setCitas(r.data.respuesta ?? []))
      .catch(() => setError("No fue posible cargar tus citas."))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="fz-h1 fw-bold mb-1">Mis citas</h1>
        <p className="fz-h4 mb-0">
          Consulta tus próximas reservaciones y quién recibirá la atención.
        </p>
      </div>
      {error && <Alert severity="error">{error}</Alert>}
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
                  <strong>Fecha:</strong>{" "}
                  {new Date(c.fechaInicio).toLocaleString("es-MX", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </p>
                <p className="mb-1">
                  <strong>Persona atendida:</strong> {c.nombrePersona}
                </p>
                <p className="mb-0">
                  <strong>Atiende:</strong> {c.nombreAtiende || "Por asignar"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
