declare module "@esri/arcgis-to-geojson-utils" {
  import type { Feature } from "geojson";

  export function arcgisToGeoJSON(
    esriFeature: any
  ): Feature;
}
