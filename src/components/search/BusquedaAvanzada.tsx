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

import styles from "./BusquedaAvanzada.module.css";

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
    <div className={styles.filtersPanel}>
      {mobile && <div className={styles.drawerIndicator} />}

      <div className={styles.filtersHeader}>
        <div className={styles.filtersTitleContainer}>
          <span className={styles.filtersTitleIcon}>
            <MaterialSymbol icon="tune" size="medium" filled />
          </span>

          <div>
            <h2 className={styles.filtersTitle}>Filtros</h2>

            <p className={styles.filtersSubtitle}>Personaliza los resultados</p>
          </div>
        </div>

        {mobile && (
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Cerrar filtros"
            onClick={onClose}
          >
            <MaterialSymbol icon="close" size="medium" />
          </button>
        )}
      </div>

      <div className={styles.filtersFields}>
        <div className={styles.filterField}>
          <span className={styles.fieldLabel}>Estado</span>

          <SelectEstadoAutocomplete value={idState} onChange={onStateChange} />
        </div>

        <div className={styles.filterField}>
          <span className={styles.fieldLabel}>Municipio</span>

          <SelectMunicipioAutocomplete
            estadoId={idState}
            value={idMunicipality}
            onChange={onMunicipalityChange}
          />
        </div>

        <div className={styles.filterField}>
          <span className={styles.fieldLabel}>Tipo de comercio</span>

          <SelectTipoComercioAutocomplete
            value={idTipoComercio}
            onChange={onTipoComercioChange}
          />
        </div>

        <div className={styles.filterField}>
          <label htmlFor="orden-comercios" className={styles.fieldLabel}>
            Ordenar resultados
          </label>

          <Select<OrdenType>
            id="orden-comercios"
            value={orden}
            onChange={onOrdenChange}
            displayEmpty
            fullWidth
            className={styles.orderSelect}
            startAdornment={
              <InputAdornment
                position="start"
                className={styles.orderAdornment}
              >
                <MaterialSymbol icon="sort" size="medium" />
              </InputAdornment>
            }
            MenuProps={{
              classes: {
                paper: styles.orderMenuPaper,
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

      <div className={styles.filtersActions}>
        <button
          type="button"
          className={styles.applyButton}
          onClick={onAplicar}
        >
          <MaterialSymbol icon="filter_alt" size="small" filled />

          <span>Aplicar filtros</span>
        </button>

        <button
          type="button"
          className={styles.clearButton}
          onClick={onLimpiar}
        >
          <MaterialSymbol icon="filter_alt_off" size="small" />

          <span>Limpiar filtros</span>
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

    // Al cambiar el estado se limpia el municipio anterior.
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
    <section className={styles.searchPage}>
      <aside className={styles.desktopSidebar}>
        <FiltersPanel {...filtersPanelProps} />
      </aside>

      <main className={styles.resultsSection}>
        <header className={styles.resultsHeader}>
          <div>
            <h1 className={styles.resultsTitle}>Búsqueda avanzada</h1>

            <p className={styles.resultsDescription}>
              Encuentra comercios por ubicación, categoría y popularidad.
            </p>
          </div>

          {!loading && comercios.length > 0 && (
            <span className={styles.resultsCount}>
              <MaterialSymbol icon="storefront" size="small" />

              <span>
                {comercios.length}{" "}
                {comercios.length === 1 ? "comercio" : "comercios"}
              </span>
            </span>
          )}
        </header>

        {loading && comercios.length === 0 && (
          <div className={styles.loadingGrid} aria-label="Cargando comercios">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={styles.skeletonCard}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  className={styles.skeletonImage}
                />

                <Skeleton
                  variant="text"
                  animation="wave"
                  className={styles.skeletonTitle}
                />

                <Skeleton
                  variant="text"
                  animation="wave"
                  className={styles.skeletonText}
                />

                <Skeleton
                  variant="text"
                  animation="wave"
                  className={styles.skeletonTextShort}
                />
              </div>
            ))}
          </div>
        )}

        {!loading && comercios.length === 0 && (
          <div className={styles.emptyState} aria-live="polite">
            <div className={styles.emptyIcon}>
              <MaterialSymbol icon="search_off" size="large" />
            </div>

            <h2 className={styles.emptyTitle}>No se encontraron comercios</h2>

            <p className={styles.emptyDescription}>
              Prueba seleccionando otra ubicación, categoría o tipo de
              ordenamiento.
            </p>

            <button
              type="button"
              className={styles.emptyClearButton}
              onClick={handleLimpiar}
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {comercios.length > 0 && (
          <div className={styles.cardsGrid}>
            {comercios.map((comercio) => (
              <div key={comercio.id} className={styles.cardItem}>
                <ComercioCard comercio={comercio} />
              </div>
            ))}
          </div>
        )}

        {hasMore && (
          <div className={styles.loadMoreContainer}>
            <button
              type="button"
              className={styles.loadMoreButton}
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress
                  size={18}
                  thickness={4}
                  className={styles.loadMoreSpinner}
                />
              ) : (
                <MaterialSymbol icon="expand_more" size="medium" />
              )}

              <span>
                {loading ? "Cargando comercios" : "Cargar más comercios"}
              </span>
            </button>
          </div>
        )}
      </main>

      <button
        type="button"
        className={styles.mobileFilterButton}
        aria-label="Abrir filtros"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
      >
        <MaterialSymbol icon="tune" size="medium" filled />

        {activeFiltersCount > 0 && (
          <span className={styles.filterCounter}>{activeFiltersCount}</span>
        )}
      </button>

      <Drawer
        anchor="bottom"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          className: styles.mobileDrawerPaper,
        }}
      >
        <FiltersPanel
          {...filtersPanelProps}
          mobile
          onClose={() => setMobileOpen(false)}
        />
      </Drawer>
    </section>
  );
};

export default BusquedaAvanzada;
