import { Alert, Button } from "@mui/material";

import { useState } from "react";

import DireccionesTable from "./DireccionesTable";
import DireccionUsuarioModal from "./DireccionUsuarioModal";
import type { DireccionUsuarioDto } from "../../../services/direccionesUsuarioApi";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";

interface Props {
  direcciones: DireccionUsuarioDto[];

  loading: boolean;

  error: string | null;

  onCrear: any;

  onActualizar: any;

  onEliminar: any;

  onPredeterminada: any;

  clearError: () => void;
}

export default function DireccionesUsuario({
  direcciones,

  loading,
  error,

  onCrear,
  onActualizar,

  onEliminar,

  onPredeterminada,

  clearError,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const [direccionSeleccionada, setDireccionSeleccionada] =
    useState<DireccionUsuarioDto | null>(null);

  const abrirNueva = () => {
    setDireccionSeleccionada(null);

    setModalOpen(true);
  };

  const abrirEditar = (direccion: DireccionUsuarioDto) => {
    setDireccionSeleccionada(direccion);

    setModalOpen(true);
  };

  const cerrarModal = () => {
    if (loading) {
      return;
    }

    setModalOpen(false);

    setDireccionSeleccionada(null);
  };

  return (
    <div className="direccionesPage">
      <div className="container py-4 py-lg-5">
        <div className="direccionesHeader">
          <div>
            <span className="usuarioCuentaEyebrow">Mi cuenta</span>

            <h1 className="usuarioCuentaTitle">Mis direcciones</h1>

            <p className="usuarioCuentaDescription">
              Administra las direcciones que utilizarás para recibir tus
              pedidos.
            </p>
          </div>

          <Button
            type="button"
            className="btn-adlocal btn-adlocal--solid"
            onClick={abrirNueva}
          >
            <MaterialSymbol icon="add_location_alt" size="small" />

            <span className="ms-2">Nueva dirección</span>
          </Button>
        </div>

        {error && (
          <Alert
            severity="error"
            className="direccionesAlert"
            onClose={clearError}
          >
            {error}
          </Alert>
        )}

        <div className="direccionesSummary">
          <div className="direccionesSummaryItem">
            <div className="direccionesSummaryIcon">
              <MaterialSymbol icon="location_on" size="medium" />
            </div>

            <div>
              <span className="direccionesSummaryValue">
                {direcciones.length}
              </span>

              <span className="direccionesSummaryLabel">
                Direcciones guardadas
              </span>
            </div>
          </div>

          <div className="direccionesSummaryItem">
            <div className="direccionesSummaryIcon">
              <MaterialSymbol icon="home" size="medium" />
            </div>

            <div>
              <span className="direccionesSummaryValue">
                {direcciones.find((x) => x.esPredeterminada)?.alias ??
                  "Sin definir"}
              </span>

              <span className="direccionesSummaryLabel">Predeterminada</span>
            </div>
          </div>
        </div>

        <div className="direccionesTableCard">
          <DireccionesTable
            direcciones={direcciones}
            loading={loading}
            onEditar={abrirEditar}
            onEliminar={onEliminar}
            onPredeterminada={onPredeterminada}
          />
        </div>
      </div>

      <DireccionUsuarioModal
        open={modalOpen}
        onClose={cerrarModal}
        direccion={direccionSeleccionada}
        loading={loading}
        onCrear={onCrear}
        onActualizar={onActualizar}
      />
    </div>
  );
}
