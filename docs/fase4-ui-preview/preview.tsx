import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { AxiosHeaders } from "axios";
import CitasUsuario from "../../src/components/usuario/citas/CitasUsuario";
import { citasApi, type CitaDto } from "../../src/services/citasApi";
const cita:CitaDto={uuid:"00000000-0000-0000-0000-000000000004",productoUuid:"00000000-0000-0000-0000-000000000050",version:3,zonaHoraria:"America/Mexico_City",puedeGestionarCliente:true,comercio:"Comercio sintético",servicio:"Servicio sintético de atención con nombre extenso para lectura en móvil",cliente:"Cliente de prueba",nombrePersona:"Persona de ejemplo",fechaInicio:"2030-05-21T09:00:00",fechaFin:"2030-05-21T09:30:00",estado:2};
let actual=cita;
const response=<T,>(data:T)=>({data:{codigo:"200",mensaje:"Resultado sintético",respuesta:data},status:200,statusText:"OK",headers:{},config:{headers:new AxiosHeaders()}});
// Separate localhost preview: this synthetic token is not accepted by any API.
localStorage.setItem("jwtCliente",`sintetico.${btoa(JSON.stringify({id:999004}))}.sin-firma`);
citasApi.mias=async()=>response([actual]);
citasApi.disponibilidad=async()=>response(["09:00","09:30","10:00","10:30"]);
citasApi.cancelar=async(_uuid,_version,motivo)=>{actual={...actual,estado:5,version:actual.version+1,puedeGestionarCliente:false,motivoCancelacion:motivo};return response(actual)};
citasApi.reprogramar=async(_uuid,_version,fechaInicio)=>{actual={...actual,estado:1,version:actual.version+1,fechaInicio};return response(actual)};
citasApi.crear=async()=>response(actual);
ReactDOM.createRoot(document.getElementById("root")!).render(<><div className="p-3 bg-warning">Vista local con datos sintéticos. Ninguna operación llama al API.</div><CitasUsuario/></>);
