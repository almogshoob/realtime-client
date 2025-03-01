import { Map } from "maplibre-gl";
import { MapLayerData } from "../types";

export const loadIcons = (
  map: Map,
  icons: { img: HTMLImageElement; name: string }[]
) => {
  icons.forEach(({ img, name }) => map.addImage(name, img));
};

export const loadLayer = (map: Map, layer: MapLayerData) => {
  map.addSource(layer.name, layer.source);
  map.addLayer(layer.config);
};
