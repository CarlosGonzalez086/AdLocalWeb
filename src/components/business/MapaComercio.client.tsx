// MapaComercio.client.tsx
"use client"; // Marca explícita de cliente

import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  lat: number;
  lng: number;
}

const materialIcon = new L.DivIcon({
  html: `
    <span class="material-symbols-outlined" style="
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      font-size: 36px;
      color: #5B3A29;
      text-shadow: 0 0 2px #000;
    ">location_on</span>
  `,
  className: "",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

const MapaComercio: React.FC<Props> = ({ lat, lng }) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={16}
      style={{ height: 300, width: "100%" }}
      scrollWheelZoom={false}
      zoomControl={false}
      dragging={false}
      doubleClickZoom={false}
      touchZoom={false}
      keyboard={false}
      boxZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]} icon={materialIcon} />
    </MapContainer>
  );
};

export default MapaComercio;
