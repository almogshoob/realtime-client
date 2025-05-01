import {
  AddLayerObject,
  Feature,
  GeoJSONSourceSpecification,
} from "maplibre-gl";
import { Coordinate, MapLayerData } from "../../types";
import { coordinateToArray, getLastLocation } from "../../utils";

const layerName = "my-location";

const features: GeoJSON.Feature[] = [
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: coordinateToArray(getLastLocation()),
    },
    properties: {
      isActive: false,
    },
  },
];

const source: GeoJSONSourceSpecification = {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: features,
  },
};

const config: AddLayerObject = {
  id: `${layerName}-layer`,
  type: "symbol",
  source: layerName,
  layout: {
    "icon-image": [
      "case",
      ["boolean", ["get", "isActive"]],
      "my-location-active",
      "my-location-inactive",
    ],
    "icon-size": 0.5,
  },
};

export const myLocationLayer: MapLayerData = {
  name: layerName,
  source,
  config,
};

export const updateLocationLayer = (coordinate: Coordinate | null) => {
  const feature: GeoJSON.Feature = {
    ...features[0],
    geometry: {
      type: "Point",
      coordinates: coordinateToArray(coordinate || getLastLocation()),
    },
    properties: {
      ...features[0].properties,
      isActive: !!coordinate,
    },
  };

  return {
    type: "FeatureCollection",
    features: [feature],
  };
};
