import { useEffect, useRef } from "react";
import { visitasPublicApi } from "../services/visitasPublicApi";

export const useRegistrarVisita = (comercioId: number): void => {
  const hasRegisteredRef = useRef<boolean>(false);

  useEffect(() => {
    if (!comercioId || hasRegisteredRef.current) return;

    hasRegisteredRef.current = true;

    visitasPublicApi.registrarVisita(comercioId).catch(() => {
      // Silencioso: fallo en métrica de visita no debe degradar la experiencia de usuario
    });
  }, [comercioId]);
};
