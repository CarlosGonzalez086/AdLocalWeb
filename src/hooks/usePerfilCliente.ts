import { useCallback, useEffect, useState } from "react";
import { perfilClienteApi, type ActualizarPerfilClienteDto, type PerfilClienteDto } from "../services/perfilClienteApi";
import { setLocalStorageJWTUsuario } from "../utils/storageUsuario";

export const usePerfilCliente = () => {
  const [perfil, setPerfil] = useState<PerfilClienteDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const cargar = useCallback(async () => {
    setLoading(true); setError(null);
    try { const { data } = await perfilClienteApi.obtener(); if (data.codigo === "200" && data.respuesta) setPerfil(data.respuesta); else setError(data.mensaje || "No fue posible cargar el perfil."); }
    catch (err: any) { setError(err?.response?.data?.mensaje || "No fue posible cargar el perfil."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void cargar(); }, [cargar]);
  const guardar = async (dto: ActualizarPerfilClienteDto) => {
    setGuardando(true); setError(null); setMensaje(null);
    try {
      const { data } = await perfilClienteApi.actualizar(dto);
      if (data.codigo !== "200" || !data.respuesta) { setError(data.mensaje || "No fue posible actualizar el perfil."); return false; }
      setPerfil(data.respuesta); setLocalStorageJWTUsuario(data.respuesta.token);
      setMensaje(data.mensaje || "Perfil actualizado correctamente."); window.dispatchEvent(new StorageEvent("storage")); return true;
    } catch (err: any) { setError(err?.response?.data?.mensaje || "No fue posible actualizar el perfil."); return false; }
    finally { setGuardando(false); }
  };
  return { perfil, loading, guardando, error, mensaje, guardar };
};
