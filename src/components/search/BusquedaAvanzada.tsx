import {
  CircularProgress,
  Drawer,
  InputAdornment,
  MenuItem,
  Select,
  Skeleton,
  type SelectChangeEvent,
} from "@mui/material";

import React, { useState } from "react";

import { SelectEstadoAutocomplete } from "../Locations/SelectEstadoAutocomplete";
import { SelectMunicipioAutocomplete } from "../Locations/SelectMunicipioAutocomplete";
import { SelectTipoComercioAutocomplete } from "../business/SelectTipoComercioAutocomplete";

import ComercioCard from "../business/ComercioCard";
import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";

import { useComercioPublico } from "../../hooks/useComercioPublico";

type OrdenType = "alfabetico" | "recientes" | "antiguos" | "populares";

interface FiltersPanelProps {
  idState: number;
  idMunicipality: number;
  idTipoComercio: number;
  orden: OrdenType;
  mobile?: boolean;

  onStateChange: (id: number) => void;
  onMunicipalityChange: (id: number) => void;
  onTipoComercioChange: (id: number) => void;

  onOrdenChange: (event: SelectChangeEvent<OrdenType>) => void;

  onAplicar: () => void;
  onLimpiar: () => void;
  onClose?: () => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  idState,
  idMunicipality,
  idTipoComercio,
  orden,
  mobile = false,
  onStateChange,
  onMunicipalityChange,
  onTipoComercioChange,
  onOrdenChange,
  onAplicar,
  onLimpiar,
  onClose,
}) => {
  return (
    <div className="advancedFiltersPanel">
      {mobile && <div className="advancedFiltersIndicator" />}

      <div className="advancedFiltersHeader">
        <div className="advancedFiltersTitleContainer">
          <span className="advancedFiltersTitleIcon">
            <MaterialSymbol icon="tune" size="medium" filled />
          </span>

          <div>
            <h2 className="fz-h2 fw-bold mb-1">Filtros</h2>

            <p className="advancedFiltersSubtitle fz-h5 fw-regular mb-0">
              Personaliza los resultados
            </p>
          </div>
        </div>

        {mobile && (
          <button
            type="button"
            className="btn-adlocal btn-adlocal--ghost btn-adlocal--sm"
            aria-label="Cerrar filtros"
            onClick={onClose}
          >
            <MaterialSymbol icon="close" size="medium" />
          </button>
        )}
      </div>

      <div className="advancedFiltersFields">
        <div className="advancedFilterField">
          <span className="fz-h5 fw-semibold">Estado</span>

          <SelectEstadoAutocomplete value={idState} onChange={onStateChange} />
        </div>

        <div className="advancedFilterField">
          <span className="fz-h5 fw-semibold">Municipio</span>

          <SelectMunicipioAutocomplete
            estadoId={idState}
            value={idMunicipality}
            onChange={onMunicipalityChange}
          />
        </div>

        <div className="advancedFilterField">
          <span className="fz-h5 fw-semibold">Tipo de comercio</span>

          <SelectTipoComercioAutocomplete
            value={idTipoComercio}
            onChange={onTipoComercioChange}
          />
        </div>

        <div className="advancedFilterField">
          <label htmlFor="orden-comercios" className="fz-h5 fw-semibold">
            Ordenar resultados
          </label>

          <Select<OrdenType>
            id="orden-comercios"
            value={orden}
            onChange={onOrdenChange}
            displayEmpty
            fullWidth
            className="advancedOrderSelect"
            startAdornment={
              <InputAdornment
                position="start"
                className="advancedOrderAdornment"
              >
                <MaterialSymbol icon="sort" size="medium" />
              </InputAdornment>
            }
            MenuProps={{
              classes: {
                paper: "advancedOrderMenuPaper",
              },
            }}
          >
            <MenuItem value="alfabetico">Alfabético A–Z</MenuItem>

            <MenuItem value="recientes">Más recientes</MenuItem>

            <MenuItem value="antiguos">Más antiguos</MenuItem>

            <MenuItem value="populares">Más populares</MenuItem>
          </Select>
        </div>
      </div>

      <div className="advancedFiltersActions">
        <button
          type="button"
          className="btn-adlocal btn-adlocal--solid fz-h4 fw-semibold"
          onClick={onAplicar}
        >
          <div className="d-flex align-items-center justify-content-center gap-2">
            <MaterialSymbol icon="filter_alt" size="small" filled />

            <span>Aplicar filtros</span>
          </div>
        </button>

        <button
          type="button"
          className="btn-adlocal btn-adlocal--ghost fz-h4 fw-medium"
          onClick={onLimpiar}
        >
          <div className="d-flex align-items-center justify-content-center gap-2">
            <MaterialSymbol icon="filter_alt_off" size="small" />

            <span>Limpiar filtros</span>
          </div>
        </button>
      </div>
    </div>
  );
};

const BusquedaAvanzada: React.FC = () => {
  const [idState, setIdState] = useState(0);

  const [idMunicipality, setIdMunicipality] = useState(0);

  const [idTipoComercio, setIdTipoComercio] = useState(0);

  const [orden, setOrden] = useState<OrdenType>("alfabetico");

  const [mobileOpen, setMobileOpen] = useState(false);

  const { comercios, loading, hasMore, cargarPorFiltros } =
    useComercioPublico();

  const activeFiltersCount =
    Number(idState > 0) +
    Number(idMunicipality > 0) +
    Number(idTipoComercio > 0) +
    Number(orden !== "alfabetico");

  const handleStateChange = (estadoId: number) => {
    setIdState(estadoId);
    setIdMunicipality(0);
  };

  const handleOrdenChange = (event: SelectChangeEvent<OrdenType>) => {
    setOrden(event.target.value as OrdenType);
  };

  const handleLimpiar = () => {
    setIdState(0);
    setIdMunicipality(0);
    setIdTipoComercio(0);
    setOrden("alfabetico");

    cargarPorFiltros(0, 0, 0, "alfabetico", true);

    setMobileOpen(false);
  };

  const handleAplicar = () => {
    cargarPorFiltros(idState, idMunicipality, idTipoComercio, orden, true);

    setMobileOpen(false);
  };

  const handleLoadMore = () => {
    cargarPorFiltros(idState, idMunicipality, idTipoComercio, orden);
  };

  const filtersPanelProps = {
    idState,
    idMunicipality,
    idTipoComercio,
    orden,
    onStateChange: handleStateChange,
    onMunicipalityChange: setIdMunicipality,
    onTipoComercioChange: setIdTipoComercio,
    onOrdenChange: handleOrdenChange,
    onAplicar: handleAplicar,
    onLimpiar: handleLimpiar,
  };

  return (
    <div className="advancedSearchPage">
      <div className="advancedSearchSidebar">
        <FiltersPanel {...filtersPanelProps} />
      </div>

      <div className="advancedSearchResults">
        <div className="advancedResultsHeader">
          <div>
            <h1 className="fz-h1 fw-bold mb-1">Búsqueda avanzada</h1>

            <p className="advancedResultsDescription fz-h4 fw-regular mb-0">
              Encuentra comercios por ubicación, categoría y popularidad.
            </p>
          </div>

          {!loading && comercios.length > 0 && (
            <span className="advancedResultsCount fz-h5 fw-semibold">
              <MaterialSymbol icon="storefront" size="small" />

              <span>
                {comercios.length}{" "}
                {comercios.length === 1 ? "comercio" : "comercios"}
              </span>
            </span>
          )}
        </div>

        {loading && comercios.length === 0 && (
          <div className="advancedLoadingGrid" aria-label="Cargando comercios">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div key={index} className="advancedSkeletonCard">
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  className="advancedSkeletonImage"
                />

                <div className="advancedSkeletonContent">
                  <Skeleton
                    variant="text"
                    animation="wave"
                    className="advancedSkeletonTitle"
                  />

                  <Skeleton
                    variant="text"
                    animation="wave"
                    className="advancedSkeletonText"
                  />

                  <Skeleton
                    variant="text"
                    animation="wave"
                    className="advancedSkeletonTextShort"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && comercios.length === 0 && (
          <div className="advancedEmptyState" aria-live="polite">
            <div className="advancedEmptyIcon">
              <MaterialSymbol icon="search_off" size="large" />
            </div>

            <h2 className="fz-h2 fw-semibold mb-0">
              No se encontraron comercios
            </h2>

            <p className="advancedEmptyDescription fz-h4 fw-regular">
              Prueba seleccionando otra ubicación, categoría o tipo de
              ordenamiento.
            </p>

            <button
              type="button"
              className="btn-adlocal fz-h4 fw-semibold"
              onClick={handleLimpiar}
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {comercios.length > 0 && (
          <div className="advancedCardsGrid">
            {comercios.map((comercio) => (
              <div key={comercio.id} className="advancedCardItem">
                <ComercioCard comercio={comercio} />
              </div>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="advancedLoadMore">
            <button
              type="button"
              className="btn-adlocal fz-h4 fw-semibold"
              onClick={handleLoadMore}
              disabled={loading}
            >
              <div className="d-flex align-items-center justify-content-center gap-2">
                {loading ? (
                  <CircularProgress
                    size={17}
                    thickness={4}
                    className="advancedLoadMoreSpinner"
                  />
                ) : (
                  <MaterialSymbol icon="expand_more" size="small" />
                )}

                <span>
                  {loading ? "Cargando comercios" : "Cargar más comercios"}
                </span>
              </div>
            </button>
          </div>
        )}
      </div>

      <div className="advancedMobileFilterContainer">
        <button
          type="button"
          className="btn-adlocal btn-adlocal--solid btn-adlocal--sm"
          aria-label="Abrir filtros"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <div className="advancedMobileFilterContent">
            <MaterialSymbol icon="tune" size="medium" filled />

            <span className="fz-h4 fw-semibold">Filtros</span>

            {activeFiltersCount > 0 && (
              <span className="advancedFilterCounter fz-h6 fw-bold">
                {activeFiltersCount}
              </span>
            )}
          </div>
        </button>
      </div>

      <Drawer
        anchor="bottom"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          className: "advancedMobileDrawerPaper",
        }}
      >
        <FiltersPanel
          {...filtersPanelProps}
          mobile
          onClose={() => setMobileOpen(false)}
        />
      </Drawer>
    </div>
  );
};

export default BusquedaAvanzada;
