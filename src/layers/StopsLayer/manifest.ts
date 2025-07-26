import {
  GeoJSONSourceSpecification,
  SymbolLayerSpecification,
} from "maplibre-gl";
import { stopsDataList } from "../../assets/data";
import { MapLayerData } from "../../types";
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
  minzoom: 13,
};

export const getLayerSource = (
  selectedStop?: string
): GeoJSONSourceSpecification => {
  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: stopsDataList.map(({ id, lat, lon }) => {
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

export const layerInit: MapLayerData = {
  name: layerName,
  config: layerConfig,
  source: getLayerSource(),
};
