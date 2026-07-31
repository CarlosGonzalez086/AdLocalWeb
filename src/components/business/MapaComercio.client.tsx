import type { FC } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L, { type LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";
import styles from "../../styles/MapaComercio.module.css";

interface Props {
  lat: number;
  lng: number;
}

const materialIcon = L.divIcon({
  html: `
    <span
      class="${styles.markerPulse}"
      aria-hidden="true"
    ></span>

    <span
      class="material-symbols-outlined ${styles.markerIcon}"
      aria-hidden="true"
    >
      location_on
    </span>
  `,
  className: styles.markerContainer,
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
      <div className={styles.invalidLocation} role="alert">
        <span
          className={`material-symbols-outlined ${styles.invalidLocationIcon}`}
          aria-hidden="true"
        >
          location_off
        </span>

        <span>La ubicación del comercio no está disponible.</span>
      </div>
    );
  }

  const position: LatLngExpression = [lat, lng];

  return (
    <div className={styles.mapWrapper}>
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
        className={styles.map}
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

      <div className={styles.mapOverlay} aria-hidden="true" />
    </div>
  );
};

export default MapaComercio;
