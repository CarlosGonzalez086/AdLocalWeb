import { Alert, Button, CircularProgress } from "@mui/material";
import { useRef, useState } from "react";
import type { ComprobanteTransferenciaResponseDto } from "../../../types/checkout";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";

interface Props {
  pedidoUuid: string;
  loading: boolean;
  error?: string | null;
  onSubir: (
    pedidoUuid: string,
    archivo: File,
  ) => Promise<ComprobanteTransferenciaResponseDto | null>;
}

const tiposPermitidos = ["image/jpeg", "image/png", "application/pdf"];
const maximoBytes = 10 * 1024 * 1024;

export default function ComprobanteTransferenciaUploader({
  pedidoUuid,
  loading,
  error,
  onSubir,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);

  const seleccionar = (file?: File) => {
    setErrorLocal(null);

    if (!file) {
      setArchivo(null);
      return;
    }

    if (!tiposPermitidos.includes(file.type)) {
      setArchivo(null);
      setErrorLocal("Selecciona un archivo JPG, PNG o PDF.");
      return;
    }

    if (file.size > maximoBytes) {
      setArchivo(null);
      setErrorLocal("El archivo no puede superar 10 MB.");
      return;
    }

    setArchivo(file);
  };

  const subir = async () => {
    if (!archivo) {
      setErrorLocal("Selecciona el comprobante antes de continuar.");
      return;
    }

    const resultado = await onSubir(pedidoUuid, archivo);

    if (resultado) {
      setArchivo(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="checkoutTransferReceipt mt-3 p-3">
      <div className="d-flex align-items-start gap-2">
        <MaterialSymbol icon="upload_file" size="small" />

        <div className="flex-grow-1">
          <strong className="fz-h5 fw-semibold d-block">
            Adjunta tu comprobante
          </strong>

          <span className="checkoutMutedText fz-h6 fw-regular d-block mt-1">
            Formatos JPG, PNG o PDF. Máximo 10 MB.
          </span>
        </div>
      </div>

      {(errorLocal || error) && (
        <Alert severity="error" className="mt-3">
          {errorLocal || error}
        </Alert>
      )}

      <input
        ref={inputRef}
        type="file"
        className="form-control mt-3"
        accept="image/jpeg,image/png,application/pdf"
        disabled={loading}
        onChange={(event) => seleccionar(event.target.files?.[0])}
      />

      {archivo && (
        <span className="checkoutMutedText fz-h6 d-block mt-2 text-break">
          {archivo.name}
        </span>
      )}

      <Button
        type="button"
        fullWidth
        className="btn-adlocal btn-adlocal--solid fz-h5 fw-semibold mt-3"
        disabled={!archivo || loading}
        onClick={subir}
      >
        {loading ? (
          <>
            <CircularProgress size={18} color="inherit" />
            <span className="ms-2">Subiendo...</span>
          </>
        ) : (
          <>
            <MaterialSymbol icon="cloud_upload" size="small" />
            <span className="ms-2">Enviar comprobante</span>
          </>
        )}
      </Button>
    </div>
  );
}
