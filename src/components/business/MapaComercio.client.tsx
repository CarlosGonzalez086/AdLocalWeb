import React, { useEffect, useState } from "react";

interface Props {
  lat: number;
  lng: number;
}

export default function MapaComercio({ lat, lng }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Solo cliente
  }, []);

  if (!isClient) return null; // Mientras no está en cliente, no renderiza

  // Import dinámico solo en cliente
  const { MapContainer, TileLayer, Marker } = require("react-leaflet");

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
}
