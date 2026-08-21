import { Button, Radio } from "@mui/material";
import type { DireccionUsuarioDto } from "../../../services/direccionesUsuarioApi";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";

interface Props {
  direcciones: DireccionUsuarioDto[];

  value: string | null;

  onChange: (uuid: string) => void;
}

export default function CheckoutDireccionSelector({
  direcciones,
  value,
  onChange,
}: Props) {
  if (direcciones.length === 0) {
    return (
      <div className="checkoutNoAddress p-3">
        <div className="d-flex align-items-center gap-3">
          <div className="checkoutNoAddressIcon d-flex align-items-center justify-content-center flex-shrink-0">
            <MaterialSymbol icon="location_off" size="medium" />
          </div>

          <div className="flex-grow-1">
            <strong className="fz-h4 fw-semibold d-block">
              No tienes direcciones guardadas
            </strong>

            <span className="checkoutMutedText fz-h5 fw-regular d-block mt-1">
              Registra una dirección antes de seleccionar entrega a domicilio.
            </span>
          </div>
        </div>

        <div className="mt-3">
          <Button
            type="button"
            className="btn-adlocal btn-adlocal--solid fz-h4 fw-semibold"
            onClick={() => {
              window.location.href = "/usuario/direcciones";
            }}
          >
            <MaterialSymbol icon="add_location_alt" size="small" />

            <span className="ms-2">Agregar dirección</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="row g-2">
      {direcciones
        .filter((direccion) => direccion.activo)
        .map((direccion) => {
          const selected = value === direccion.uuid;

          return (
            <div key={direccion.uuid} className="col-12">
              <button
                type="button"
                className={`checkoutAddressCard w-100 text-start p-3 ${
                  selected ? "checkoutAddressCardActive" : ""
                }`}
                onClick={() => onChange(direccion.uuid)}
              >
                <div className="d-flex align-items-start gap-2">
                  <Radio checked={selected} tabIndex={-1} />

                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center flex-wrap gap-2">
                      <strong className="fz-h4 fw-semibold">
                        {direccion.alias}
                      </strong>

                      {direccion.esPredeterminada && (
                        <span className="checkoutDefaultBadge px-2 py-1 fz-h6 fw-semibold">
                          Predeterminada
                        </span>
                      )}
                    </div>

                    <span className="checkoutMutedText fz-h5 fw-regular d-block mt-1">
                      {direccion.calle} {direccion.numeroExterior}
                      {direccion.numeroInterior
                        ? ` Int. ${direccion.numeroInterior}`
                        : ""}
                    </span>

                    <span className="checkoutMutedText fz-h5 fw-regular d-block">
                      {direccion.colonia}, CP {direccion.codigoPostal}
                    </span>

                    <span className="checkoutMutedText fz-h5 fw-regular d-block">
                      {direccion.municipio}, {direccion.estado}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
    </div>
  );
}
