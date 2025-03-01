import { GeoJSONSource, Map } from "maplibre-gl";
import { useEffect } from "react";
import { mapImages } from "../../assets/mapImages";
import { DEFAULT_LOCATION } from "../../constants/constants";
import { STOP_FOCUS_ZOOM } from "../../constants/mapConstants";
import {
  getSelectedStopSourceData,
  stopsLayer,
} from "../../mapbox/layers/stops";
import { mapStyles } from "../../mapbox/mapStyles";
import { loadIcons, loadLayer } from "../../utils/mapboxUtils";

import "maplibre-gl/dist/maplibre-gl.css";
import "./MapCard.css";
import { myLocationLayer } from "../../mapbox/layers/myLocation";

export const MapCard = () => {
  useEffect(() => {
    const map = new Map({
      container: "stops-map",
      style: mapStyles.OpenStreetMap,
      center: DEFAULT_LOCATION,
      minZoom: 8,
      zoom: 14,
      maxZoom: 18,
    });

    map.on("load", () => {
      // to use text-field
      // map.setGlyphs(
      //   "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf"
      // );
      loadIcons(map, mapImages);
      loadLayer(map, stopsLayer);
      loadLayer(map, myLocationLayer);
    });

    map.on("click", stopsLayer.config.id, (e) => {
      e.preventDefault();
      const { stopId, lat, lon } = e.features![0].properties;
      console.log(stopId);
      // set state selection
      const source = map.getSource(stopsLayer.name) as GeoJSONSource;
      source.setData(getSelectedStopSourceData(stopId) as GeoJSON.GeoJSON);
      map.flyTo({ center: { lat, lon }, zoom: STOP_FOCUS_ZOOM });
    });

    map.on("click", (e) => {
      if (e.defaultPrevented) return;
      // clear state selection
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="stops-map" className="map-container"></div>;
};
