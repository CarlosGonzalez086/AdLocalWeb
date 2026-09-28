import { Alert, Button } from "@mui/material";

import { useState } from "react";

import DireccionesTable from "./DireccionesTable";
import DireccionUsuarioModal from "./DireccionUsuarioModal";
import type {
  DireccionUsuarioDto,
  DireccionUsuarioDtoCreate,
} from "../../../services/direccionesUsuarioApi";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";

interface Props {
  direcciones: DireccionUsuarioDto[];
  loading: boolean;
  error: string | null;
  onCrear: (dto: DireccionUsuarioDtoCreate) => Promise<boolean>;
  onActualizar: (uuid: string, dto: DireccionUsuarioDtoCreate) => Promise<boolean>;
  onEliminar: (direccion: DireccionUsuarioDto) => Promise<boolean>;
  onPredeterminada: (direccion: DireccionUsuarioDto) => Promise<boolean>;
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
        <div className="direccionesHeader d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <span className="usuarioCuentaEyebrow fz-caption fw-bold text-uppercase">
              Mi cuenta
            </span>

            <h1 className="usuarioCuentaTitle fz-h1 fw-bold">Mis direcciones</h1>

            <p className="usuarioCuentaDescription fz-body text-secondary mb-0">
              Administra las direcciones que utilizarás para recibir tus
              pedidos.
            </p>
          </div>

          <Button
            type="button"
            className="btn-adlocal btn-adlocal-primary"
            onClick={abrirNueva}
          >
            <MaterialSymbol icon="add_location_alt" size="small" />

            <span className="ms-2">Nueva dirección</span>
          </Button>
        </div>

        {error && (
          <Alert
            severity="error"
            className="direccionesAlert my-3"
            onClose={clearError}
          >
            {error}
          </Alert>
        )}

        <div className="direccionesSummary my-4">
          <div className="direccionesSummaryItem card-adlocal">
            <div className="direccionesSummaryIcon">
              <MaterialSymbol icon="location_on" size="medium" />
            </div>

            <div>
              <span className="direccionesSummaryValue fz-h3 fw-bold">
                {direcciones.length}
              </span>

              <span className="direccionesSummaryLabel fz-caption text-secondary">
                Direcciones guardadas
              </span>
            </div>
          </div>

          <div className="direccionesSummaryItem card-adlocal">
            <div className="direccionesSummaryIcon">
              <MaterialSymbol icon="home" size="medium" />
            </div>

            <div>
              <span className="direccionesSummaryValue fz-h3 fw-bold">
                {direcciones.find((x) => x.esPredeterminada)?.alias ??
                  "Sin definir"}
              </span>

              <span className="direccionesSummaryLabel fz-caption text-secondary">
                Predeterminada
              </span>
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
