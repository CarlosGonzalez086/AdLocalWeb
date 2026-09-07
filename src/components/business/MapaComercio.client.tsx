import { useEffect, useRef, type FC } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

interface Props {
  lat: number;
  lng: number;
}

const createMaterialIcon = () => {
  if (typeof window === "undefined") return undefined;
  return L.divIcon({
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
};

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || !isValidCoordinate(lat, lng)) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 16,
      minZoom: 5,
      maxZoom: 19,
      scrollWheelZoom: false,
      zoomControl: false,
      dragging: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false,
      boxZoom: false,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const markerIcon = createMaterialIcon();
    if (markerIcon) {
      L.marker([lat, lng], {
        icon: markerIcon,
        interactive: false,
        keyboard: false,
      }).addTo(map);
    }

    mapRef.current = map;

    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(resizeTimer);
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng]);

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

  return (
    <div className="mapaComercioWrapper">
      <div
        ref={containerRef}
        className="mapaComercioMap"
        style={{ width: "100%", height: "100%" }}
      />
      <div className="mapaComercioOverlay" aria-hidden="true" />
    </div>
  );
};

export default MapaComercio;
