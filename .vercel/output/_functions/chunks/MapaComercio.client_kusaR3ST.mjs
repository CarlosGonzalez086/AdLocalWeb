import { jsxs, jsx } from 'react/jsx-runtime';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
/* empty css                          */

function MapaComercio({ lat, lng }) {
  return /* @__PURE__ */ jsxs(
    MapContainer,
    {
      center: [lat, lng],
      zoom: 16,
      style: { height: 300, width: "100%" },
      scrollWheelZoom: false,
      zoomControl: false,
      dragging: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false,
      boxZoom: false,
      children: [
        /* @__PURE__ */ jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }),
        /* @__PURE__ */ jsx(Marker, { position: [lat, lng] })
      ]
    }
  );
}

export { MapaComercio as default };
