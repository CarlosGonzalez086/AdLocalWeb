import React, { useState } from "react";
import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";
import { useMunicipio } from "../../hooks/useMunicipio";

interface Props {
  onSearch?: (term: string) => void;
}

const HomeHero: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { municipioActual, loadingMunicipios } = useMunicipio();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      window.location.href = `/comercios/busqueda-avanzada?q=${encodeURIComponent(query)}`;
    } else {
      window.location.href = "/comercios/busqueda-avanzada";
    }
  };

  const categorias = [
    { label: "Cafeterías & Pan", icon: "coffee", query: "cafe" },
    { label: "Comida & Restaurantes", icon: "restaurant", query: "comida" },
    { label: "Cuidado Personal", icon: "content_cut", query: "cuidado" },
    { label: "Servicios Locales", icon: "handyman", query: "servicios" },
    { label: "Tienditas & Moda", icon: "shopping_bag", query: "tienda" },
  ];

  return (
    <section className="homeHeroSection" aria-label="Bienvenida a ADLocal">
      <div className="homeHeroContainer">
        <div className="homeHeroBadge">
          <span className="homeHeroBadgeDot" aria-hidden="true" />
          <MaterialSymbol icon="storefront" size="small" filled />
          <span>Comercio de proximidad con alma local</span>
        </div>

        <h1 className="homeHeroTitle">
          El corazón de tu comunidad, <br className="d-none d-md-inline" />
          <span className="homeHeroTitleAccent">a unos pasos de ti.</span>
        </h1>

        <p className="homeHeroSubtitle">
          Conecta con panaderías artesanales, talleres, cafeterías y negocios vecinos.
          Comprar cerca fortalece a tu colonia y llena de vida a nuestras calles.
        </p>

        <form className="homeHeroSearchForm" onSubmit={handleSearchSubmit}>
          <div className="homeHeroSearchInputContainer">
            <MaterialSymbol
              icon="search"
              size="medium"
              className="homeHeroSearchIcon"
            />
            <input
              type="search"
              className="homeHeroSearchInput"
              placeholder="¿Qué necesitas hoy? (ej. café de grano, cerrajería, flores...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar comercios o servicios locales"
            />
          </div>

          <button
            type="submit"
            className="btn-adlocal btn-adlocal--solid homeHeroSearchButton"
          >
            <span>Explorar</span>
            <MaterialSymbol icon="arrow_forward" size="small" />
          </button>
        </form>

        <div className="homeHeroCategories">
          <span className="homeHeroCategoriesLabel">Popular cerca de ti:</span>
          <div className="homeHeroCategoriesList">
            {categorias.map((cat) => (
              <a
                key={cat.label}
                href={`/comercios/busqueda-avanzada`}
                className="homeHeroCategoryChip"
              >
                <MaterialSymbol icon={cat.icon} size="small" />
                <span>{cat.label}</span>
              </a>
            ))}
          </div>
        </div>

        {municipioActual && !loadingMunicipios && (
          <div className="homeHeroLocationHint">
            <MaterialSymbol icon="location_on" size="small" filled />
            <span>
              Explorando comercios y negocios en <strong>{municipioActual}</strong>
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeHero;
