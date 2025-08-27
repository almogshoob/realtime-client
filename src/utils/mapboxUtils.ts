import { AddLayerObject, Map, Marker } from "maplibre-gl";
import { mapImages } from "../assets/mapImages";
import { MapLayerData } from "../types";
import { getLastLocation } from "./locationUtils";

export const loadIcons = (
  map: Map,
  icons: { [name: string]: HTMLImageElement }
) => {
  Object.entries(icons).forEach(([name, img]) => map.addImage(name, img));
};

export const loadLayer = <T extends AddLayerObject>(
  map: Map,
  layer: MapLayerData<T>
) => {
  map.addSource(layer.name, layer.source);
  map.addLayer(layer.config);
};

export const createMyLocationMarker = (map: Map) => {
  const element = mapImages["my-location-active"];
  element.style.width = "20px";
  return new Marker({ element }).setLngLat(getLastLocation()).addTo(map);
};
