// MapaComercio.client.tsx
import React, { useEffect, useState, Suspense } from "react";
import "leaflet/dist/leaflet.css";

const MapContainer = React.lazy(() => import("react-leaflet").then(m => ({ default: m.MapContainer })));
const TileLayer = React.lazy(() => import("react-leaflet").then(m => ({ default: m.TileLayer })));
const Marker = React.lazy(() => import("react-leaflet").then(m => ({ default: m.Marker })));

interface Props { lat: number; lng: number; }

export default function MapaComercio({ lat, lng }: Props) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) return null;

  return (
    <Suspense fallback={<div>Cargando mapa...</div>}>
      <MapContainer center={[lat, lng]} zoom={16} style={{ height: 300, width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]} />
      </MapContainer>
    </Suspense>
  );
}