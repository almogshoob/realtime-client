import { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect } from "react";
import { mapImages } from "../../assets/mapImages";
import { MAP_STYLES } from "../../constants/mapConstants";
import { useMapStore } from "../../stores";
import { getLastLocation } from "../../utils";
import { loadIcons } from "../../utils/mapboxUtils";
import "./MapCard.css";

const createMap = () => {
  return new Map({
    container: "stops-map",
    style: MAP_STYLES.OpenStreetMap,
    center: getLastLocation(),
    minZoom: 8,
    zoom: 14,
    maxZoom: 18,
    // attributionControl: false,
  });
};

export const MapCard = () => {
  const setMap = useMapStore((state) => state.setMap);

  const initMap = (map: Map) => {
    // to use text-field
    // mapRef.setGlyphs(
    //   "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf"
    // );
    map.resize();
    loadIcons(map, mapImages);
  };

  useEffect(() => {
    const map = createMap();
    map.once("load", () => initMap(map));
    setMap(map);

    return () => {
      map.remove(); // TODO remove?
      setMap(undefined);
    };
  }, []);

  return <div id="stops-map" className="map-container"></div>;
};
