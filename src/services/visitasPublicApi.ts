import axios from "axios";
import type { ApiResponse } from "../api/apiResponse";
import { httpUsuarioPublico } from "../api/httpUsuarioPublico";

export const visitasPublicApi = {
  registrarVisita: (comercioId: number) =>
    httpUsuarioPublico.post<ApiResponse<null>>(`ComercioVisitas/${comercioId}`),
};
