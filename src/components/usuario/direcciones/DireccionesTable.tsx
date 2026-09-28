import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";

import { useState, type MouseEvent } from "react";

import type {
  DireccionUsuarioDto,
} from "../../../services/direccionesUsuarioApi";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";

interface Props {
  direcciones: DireccionUsuarioDto[];

  loading?: boolean;

  onEditar: (direccion: DireccionUsuarioDto) => void;

  onEliminar: (direccion: DireccionUsuarioDto) => void;

  onPredeterminada: (direccion: DireccionUsuarioDto) => void;
}

export default function DireccionesTable({
  direcciones,
  loading = false,
  onEditar,
  onEliminar,
  onPredeterminada,
}: Props) {
  const isMobile = useMediaQuery("(max-width: 1199.98px)");

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [selected, setSelected] = useState<DireccionUsuarioDto | null>(null);

  const handleMenuOpen = (
    event: MouseEvent<HTMLElement>,
    direccion: DireccionUsuarioDto,
  ) => {
    setAnchorEl(event.currentTarget);

    setSelected(direccion);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelected(null);
  };

  if (isMobile) {
    return (
      <div className="direccionesMobileList">
        {loading ? (
          Array.from({
            length: 3,
          }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={160}
              className="direccionesMobileSkeleton"
            />
          ))
        ) : direcciones.length === 0 ? (
          <div className="direccionesEmpty">
            <div className="direccionesEmptyIcon">
              <MaterialSymbol icon="location_off" size="large" />
            </div>

            <h3 className="fz-h3 fw-bold mb-1">No tienes direcciones</h3>

            <p className="fz-h5 fw-regular mb-0">
              Agrega una dirección para utilizarla en tus pedidos.
            </p>
          </div>
        ) : (
          direcciones.map((direccion) => (
            <div key={direccion.uuid} className="direccionMobileCard table-adlocal-mobile-card">
              <div className="direccionMobileHeader">
                <div className="direccionAliasContainer">
                  <div className="direccionIcon">
                    <MaterialSymbol
                      icon={direccion.esPredeterminada ? "home" : "location_on"}
                      size="medium"
                      filled={direccion.esPredeterminada}
                    />
                  </div>

                  <div>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <strong className="fz-h4 fw-bold">
                        {direccion.alias}
                      </strong>

                      {direccion.esPredeterminada && (
                        <span className="badge-adlocal badge-adlocal-primary">
                          Predeterminada
                        </span>
                      )}
                    </div>

                    <span className="direccionLocationSmall">
                      {direccion.municipio}, {direccion.estado}
                    </span>
                  </div>
                </div>

                <IconButton
                  aria-label={`Acciones para ${direccion.alias}`}
                  size="small"
                  onClick={(event) => handleMenuOpen(event, direccion)}
                >
                  <MaterialSymbol icon="more_vert" size="medium" />
                </IconButton>
              </div>

              <div className="direccionMobileBody">
                <p className="direccionAddressText">
                  {direccion.calle} {direccion.numeroExterior}
                  {direccion.numeroInterior
                    ? ` Int. ${direccion.numeroInterior}`
                    : ""}
                </p>

                <p className="direccionSecondaryText">
                  {direccion.colonia}, CP {direccion.codigoPostal}
                </p>

                {direccion.referencias && (
                  <p className="direccionReferenceText">
                    <MaterialSymbol icon="near_me" size="small" />

                    <span>{direccion.referencias}</span>
                  </p>
                )}
              </div>
            </div>
          ))
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          slotProps={{
            paper: {
              className: "direccionesActionMenu",
            },
          }}
        >
          {selected && (
            <>
              {!selected.esPredeterminada && (
                <MenuItem
                  onClick={() => {
                    onPredeterminada(selected);

                    handleMenuClose();
                  }}
                >
                  <MaterialSymbol icon="star" size="small" />

                  <span className="ms-2">Hacer predeterminada</span>
                </MenuItem>
              )}

              <MenuItem
                onClick={() => {
                  onEditar(selected);

                  handleMenuClose();
                }}
              >
                <MaterialSymbol icon="edit" size="small" />

                <span className="ms-2">Editar</span>
              </MenuItem>

              <MenuItem
                className="direccionDeleteMenuItem"
                onClick={() => {
                  onEliminar(selected);

                  handleMenuClose();
                }}
              >
                <MaterialSymbol icon="delete" size="small" />

                <span className="ms-2">Eliminar</span>
              </MenuItem>
            </>
          )}
        </Menu>
      </div>
    );
  }

  return (
    <div className="direccionesTableWrapper">
      <TableContainer className="direccionesTableContainer table-adlocal-wrapper" tabIndex={0} role="region" aria-label="Direcciones registradas">
        <Table className="table-adlocal" aria-label="Direcciones registradas">
          <TableHead>
            <TableRow>
              <TableCell className="direccionesTableHeadCell">
                Dirección
              </TableCell>

              <TableCell className="direccionesTableHeadCell">
                Municipio
              </TableCell>

              <TableCell className="direccionesTableHeadCell">
                Teléfono
              </TableCell>

              <TableCell className="direccionesTableHeadCell">Estado</TableCell>

              <TableCell align="right" className="direccionesTableHeadCell">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              Array.from({
                length: 4,
              }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({
                    length: 5,
                  }).map((__, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton variant="rounded" height={24} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : direcciones.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="direccionesEmpty">
                    <div className="direccionesEmptyIcon">
                      <MaterialSymbol icon="location_off" size="large" />
                    </div>

                    <h3 className="fz-h3 fw-bold mb-1">
                      No tienes direcciones
                    </h3>

                    <p className="fz-h5 fw-regular mb-0">
                      Registra tu primera dirección para utilizarla en tus
                      pedidos.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              direcciones.map((direccion) => (
                <TableRow key={direccion.uuid} className="direccionesTableRow">
                  <TableCell>
                    <div className="direccionMainCell">
                      <div className="direccionIcon">
                        <MaterialSymbol
                          icon={
                            direccion.esPredeterminada ? "home" : "location_on"
                          }
                          size="medium"
                          filled={direccion.esPredeterminada}
                        />
                      </div>

                      <div className="direccionMainInfo">
                        <div className="d-flex align-items-center gap-2">
                          <strong className="fz-h4 fw-bold">
                            {direccion.alias}
                          </strong>

                          {direccion.esPredeterminada && (
                            <span className="badge-adlocal badge-adlocal-primary">
                              Predeterminada
                            </span>
                          )}
                        </div>

                        <span className="direccionAddressText">
                          {direccion.calle} {direccion.numeroExterior}
                          {direccion.numeroInterior
                            ? ` Int. ${direccion.numeroInterior}`
                            : ""}
                        </span>

                        <span className="direccionSecondaryText">
                          {direccion.colonia}, CP {direccion.codigoPostal}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="direccionLocationCell">
                      <span className="fz-h4 fw-medium">
                        {direccion.municipio}
                      </span>

                      <span className="direccionLocationSmall">
                        {direccion.estado}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="fz-h4 fw-medium">
                      {direccion.telefono || "—"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`badge-adlocal ${
                        direccion.activo
                          ? "badge-adlocal-success"
                          : "badge-adlocal-secondary"
                      }`}
                    >
                      {direccion.activo ? "Activa" : "Inactiva"}
                    </span>
                  </TableCell>

                  <TableCell align="right">
                    <div className="direccionesActions table-adlocal-actions">
                      {!direccion.esPredeterminada && (
                        <Button
                          type="button"
                          size="small"
                          className="btn-adlocal btn-adlocal-outline btn-adlocal-sm direccionActionPrimary"
                          onClick={() => onPredeterminada(direccion)}
                        >
                          <MaterialSymbol icon="star" size="small" />

                          <span>Predeterminada</span>
                        </Button>
                      )}

                      <IconButton
                        type="button"
                        size="small"
                        className="direccionActionButton"
                        onClick={() => onEditar(direccion)}
                        aria-label="Editar dirección"
                      >
                        <MaterialSymbol icon="edit" size="small" />
                      </IconButton>

                      <IconButton
                        type="button"
                        size="small"
                        className="direccionActionButton direccionActionDelete"
                        onClick={() => onEliminar(direccion)}
                        aria-label="Eliminar dirección"
                      >
                        <MaterialSymbol icon="delete" size="small" />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
