import { beforeEach, describe, expect, it, vi } from "vitest";
import { ReservaCitaOperacion, diaCita, fechaCitaLocal } from "../utils/citaOperacion";
import { citasApi } from "../services/citasApi";

const http = vi.hoisted(() => ({ post: vi.fn(), get: vi.fn(), put: vi.fn() }));
vi.mock("../api/httpUsuario", () => ({ httpUsuario: http }));
vi.mock("../api/httpUsuarioPublico", () => ({ httpUsuarioPublico: http }));
const uuid = "550e8400-e29b-41d4-a716-446655440000";
const dto = { productoUuid: uuid, fechaInicio: "2030-05-21T09:00:00", zonaHoraria: "America/Tijuana", nombrePersona: "Persona sintética" };
function storage() { const datos = new Map<string,string>(); return { getItem: (k:string) => datos.get(k) ?? null,
  setItem: (k:string,v:string) => { datos.set(k,v); }, removeItem: (k:string) => { datos.delete(k); } }; }
describe("Reserva durable y contratos reales de citas", () => {
  beforeEach(() => vi.clearAllMocks());
  it("tras perder una respuesta conserva exactamente la operación al reabrir", async () => {
    const s=storage(); const op=new ReservaCitaOperacion(s,"5",()=>uuid); const original=op.preparar(dto);
    http.post.mockRejectedValueOnce(new Error("Respuesta perdida")); await expect(citasApi.crear(original)).rejects.toThrow();
    const recuperada=new ReservaCitaOperacion(s,"5",()=>"otra").preparar({...dto,nombrePersona:"Otra persona"});
    expect(recuperada).toEqual(original); expect(http.post).toHaveBeenCalledWith("Citas",original);
  });
  it("separa la recuperación por cuenta", () => {
    const s=storage(); new ReservaCitaOperacion(s,"5",()=>uuid).preparar(dto); expect(new ReservaCitaOperacion(s,"6").pendiente()).toBeNull();
  });
  it("si el almacenamiento falla no prepara una reserva irrecuperable", () => {
    expect(()=>new ReservaCitaOperacion({...storage(),setItem:()=>{throw new Error("Bloqueado");}},"5",()=>uuid).preparar(dto)).toThrow("Bloqueado");
    expect(http.post).not.toHaveBeenCalled();
  });
  it("un intento corrupto no genera otra clave silenciosamente", () => {
    const s=storage(); s.setItem("adlocal.cita.pendiente.v1.5","{}"); expect(()=>new ReservaCitaOperacion(s,"5",()=>uuid).preparar(dto)).toThrow();
  });
  it("completar permite otra reserva sin conservar la clave previa", () => {
    const op=new ReservaCitaOperacion(storage(),"5",()=>uuid); op.preparar(dto); op.completar(); expect(op.pendiente()).toBeNull();
  });
  it("envía versión y motivo en el cuerpo de la cancelación", () => {
    citasApi.cancelar(uuid,3,"No puedo asistir"); expect(http.put).toHaveBeenCalledWith(`Citas/${uuid}/cancelar`,{versionCita:3,motivo:"No puedo asistir"});
  });
  it("reprograma con versión y excluye solo la cita indicada al consultar disponibilidad", () => {
    citasApi.disponibilidad(uuid,"2030-05-21",uuid); expect(http.get).toHaveBeenCalledWith(`Citas/disponibilidad/${uuid}`,{params:{fecha:"2030-05-21",citaUuid:uuid}});
    citasApi.reprogramar(uuid,4,dto.fechaInicio,dto.zonaHoraria); expect(http.put).toHaveBeenCalledWith(`Citas/${uuid}/reprogramar`,{versionCita:4,fechaInicio:dto.fechaInicio,zonaHoraria:dto.zonaHoraria});
  });
  it("el día de agenda no depende de UTC ni de la zona del navegador", () => {
    expect(diaCita(new Date("2026-10-13T02:00:00Z"))).toBe("2026-10-12");
    expect(fechaCitaLocal("2030-05-21T09:00:00")).toMatch(/9:00/);
  });
  it("usa el día del comercio en zonas distintas a la del navegador", () => {
    const ahora=new Date("2026-10-13T06:30:00Z");
    expect(diaCita(ahora,"America/Cancun")).toBe("2026-10-13");
    expect(diaCita(ahora,"America/Tijuana")).toBe("2026-10-12");
  });
  it("no reemplaza la zona de una reserva incierta por la configuración actual", () => {
    const s=storage(); const op=new ReservaCitaOperacion(s,"5",()=>uuid); const original=op.preparar(dto);
    expect(new ReservaCitaOperacion(s,"5",()=>uuid).preparar({...dto,zonaHoraria:"America/Cancun"})).toEqual(original);
  });
});
