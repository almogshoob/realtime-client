import { AddLayerObject, SourceSpecification } from "maplibre-gl";

export type MapLayerData = {
  name: string;
  source: SourceSpecification;
  config: AddLayerObject;
};
