import { useEffect, useRef } from "react";
import { visitasPublicApi } from "../services/visitasPublicApi";

export const useRegistrarVisita = (comercioId: number): void => {
  const hasRegisteredRef = useRef<boolean>(false);

  useEffect(() => {
    if (!comercioId || hasRegisteredRef.current) return;

    hasRegisteredRef.current = true;

    visitasPublicApi.registrarVisita(comercioId).catch((err: unknown) => {
      if (err instanceof Error) {
        console.warn("No se pudo registrar la visita:", err.message);
      } else {
        console.warn("No se pudo registrar la visita");
      }
    });
  }, [comercioId]);
};
