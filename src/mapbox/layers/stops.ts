import { AddLayerObject, GeoJSONSourceSpecification } from "maplibre-gl";
import { MapLayerData } from "../../types";
import { coordinateToArray } from "../../utils";
import { stopsDataList } from "../../assets/data";

const layerName = "stops";

const stopsFeatures = stopsDataList.map(({ id, lat, lon }) => {
  const feature: GeoJSON.Feature = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: coordinateToArray({ lat, lon }),
    },
    properties: {
      stopId: id,
      isSelected: false,
    },
  };
  return feature;
});

const source: GeoJSONSourceSpecification = {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: stopsFeatures,
  },
};

const config: AddLayerObject = {
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

export const stopsLayer: MapLayerData = {
  name: layerName,
  source,
  config,
};

export const getSelectedStopSourceData = (stopId: string) => {
  return {
    type: "FeatureCollection",
    features: stopsFeatures.map((f) => {
      return f.properties?.stopId !== stopId
        ? f
        : {
            ...f,
            properties: {
              ...f.properties,
              isSelected: true,
            },
          };
    }),
  };
};
