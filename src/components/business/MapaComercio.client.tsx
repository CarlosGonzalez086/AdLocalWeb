import type { FC } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L, { type LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";

interface Props {
  lat: number;
  lng: number;
}

const materialIcon = L.divIcon({
  html: `
    <span
      class="mapaComercioMarkerPulse"
      aria-hidden="true"
    ></span>

    <span
      class="material-symbols-outlined mapaComercioMarkerIcon"
      aria-hidden="true"
    >
      location_on
    </span>
  `,
  className: "mapaComercioMarkerContainer",
  iconSize: [48, 48],
  iconAnchor: [24, 45],
  popupAnchor: [0, -44],
});

const isValidCoordinate = (lat: number, lng: number) => {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
};

const MapaComercio: FC<Props> = ({ lat, lng }) => {
  if (!isValidCoordinate(lat, lng)) {
    return (
      <div className="mapaComercioInvalidLocation" role="alert">
        <span
          className="material-symbols-outlined mapaComercioInvalidLocationIcon"
          aria-hidden="true"
        >
          location_off
        </span>

        <span className="fz-h4 fw-medium">
          La ubicación del comercio no está disponible.
        </span>
      </div>
    );
  }

  const position: LatLngExpression = [lat, lng];

  return (
    <div className="mapaComercioWrapper">
      <MapContainer
        center={position}
        zoom={16}
        minZoom={5}
        maxZoom={19}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={false}
        touchZoom={false}
        keyboard={false}
        boxZoom={false}
        className="mapaComercioMap"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution={
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }
        />

        <Marker
          position={position}
          icon={materialIcon}
          keyboard={false}
          interactive={false}
        />
      </MapContainer>

      <div className="mapaComercioOverlay" aria-hidden="true" />
    </div>
  );
};

export default MapaComercio;
