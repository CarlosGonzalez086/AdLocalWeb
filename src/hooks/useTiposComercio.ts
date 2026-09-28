import { useState, useCallback } from "react";
import Swal from "../utils/sweetalert";
import { tipoComercioApi } from "../services/tipoComercioApi";


export const useTiposComercio = () => {
  const [tiposSelect, setTiposSelect] = useState<
    { id: number; nombre: string }[]
  >([]);
  const [loadingSelect, setLoadingSelect] = useState(false);

  const listarParaSelect = useCallback(async () => {
    setLoadingSelect(true);
    try {
      const { data } = await tipoComercioApi.getAllForSelect();
      setTiposSelect(data.respuesta ?? []);
    } catch {
      Swal.fire(
        "Error",
        "No se pudo cargar los tipos de comercio para select",
        "error",
      );
    } finally {
      setLoadingSelect(false);
    }
  }, []);

  return {
    tiposSelect,
    loadingSelect,

    listarParaSelect,
  };
};
