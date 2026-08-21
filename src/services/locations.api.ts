import { httpUsuarioPublico } from "../api/httpUsuarioPublico";

export interface StateDto {
  id: number;
  name: string;
}

export interface MunicipalityDto {
  id: number;
  name: string;
  estadoId: number;
}

export const locationsApi = {
  getAllStates: () => httpUsuarioPublico.get("locations/states"),

  getMunicipalitiesByState: (stateId: number) =>
    httpUsuarioPublico.get(`locations/states/${stateId}/municipalities`),
};
