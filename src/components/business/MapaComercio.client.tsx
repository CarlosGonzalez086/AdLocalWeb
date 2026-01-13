import React, { useEffect, useState, Suspense } from "react";
import "leaflet/dist/leaflet.css"; // solo si estás seguro de que es cliente
// Si lo pones en <head> global, ni siquiera necesitas importarlo aquí

interface Props {
  lat: number;
  lng: number;
}

// Import dinámico usando React.lazy
const MapContainer = React.lazy(() => import("react-leaflet").then(mod => ({ default: mod.MapContainer })));
const TileLayer = React.lazy(() => import("react-leaflet").then(mod => ({ default: mod.TileLayer })));
const Marker = React.lazy(() => import("react-leaflet").then(mod => ({ default: mod.Marker })));

export default function MapaComercio({ lat, lng }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Suspense fallback={<div>Cargando mapa...</div>}>
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
    </Suspense>
  );
}
