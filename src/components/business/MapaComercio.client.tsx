// MapaComercio.client.tsx
"use client"; // Marca explícita de cliente

import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  lat: number;
  lng: number;
}

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
      <Marker position={[lat, lng]} />
    </MapContainer>
  );
};

export default MapaComercio;
