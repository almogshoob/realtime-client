import { AddLayerObject, GeoJSONSourceSpecification } from "maplibre-gl";

export type MapLayerData<T extends AddLayerObject> = {
  name: string;
  source: GeoJSONSourceSpecification;
  config: T;
};
