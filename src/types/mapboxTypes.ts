import { AddLayerObject, GeoJSONSourceSpecification } from "maplibre-gl";

export type MapLayerData = {
  name: string;
  source: GeoJSONSourceSpecification;
  config: AddLayerObject;
};
