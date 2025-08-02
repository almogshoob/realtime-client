import {
  GeoJSONSourceSpecification,
  SymbolLayerSpecification,
} from "maplibre-gl";
import { MapLayerData, Stop } from "../../types";
import { coordinateToArray } from "../../utils";

const layerName = "stops";

export const layerConfig: SymbolLayerSpecification = {
  id: `${layerName}-layer`,
  type: "symbol",
  source: layerName,
  layout: {
    "icon-image": [
      "case",
      ["boolean", ["get", "isSelected"]],
      "stop-selected",
      "stop",
    ],
    // "icon-size": ["interpolate", ["linear"], ["zoom"], 14, 1, 16, 1.4], // with full size icon
    "icon-size": ["interpolate", ["linear"], ["zoom"], 14, 0.75, 16, 1],
  },
  minzoom: 13, // TODO not enough when looking on a route
};

export const getLayerSource = (
  stops: Pick<Stop, "id" | "lat" | "lon">[],
  selectedStop?: string
): GeoJSONSourceSpecification => {
  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: stops.map(({ id, lat, lon }) => {
        const feature: GeoJSON.Feature = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: coordinateToArray({ lat, lon }),
          },
          properties: {
            stopId: id,
            isSelected: id === selectedStop,
          },
        };
        return feature;
      }),
    },
  };
};

export const getlayerInit = (
  stops: Pick<Stop, "id" | "lat" | "lon">[]
): MapLayerData => ({
  name: layerName,
  config: layerConfig,
  source: getLayerSource(stops),
});
