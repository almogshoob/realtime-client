import {
  GeoJSONSource,
  Map,
  MapGeoJSONFeature,
  MapMouseEvent,
  Marker,
} from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
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
import { stopsData } from "../../assets/data";
import { AddIcon, FocusIcon, StopIcon } from "../../assets/icons";
import { useLocationStore } from "../../stores";
import { Coordinate } from "../../types";
import { getLastLocation } from "../../utils";
import "./MapCard.css";

const createMap = () => {
  return new Map({
    container: "stops-map",
    style: mapStyles.OpenStreetMap,
    center: DEFAULT_LOCATION,
    minZoom: 8,
    zoom: 14,
    maxZoom: 18,
    // attributionControl: false,
  });
};

export const MapCard = () => {
  const mapRef = useRef<Map>(null);
  const markerRef = useRef<Marker>(null);
  const watchIdRef = useRef<number>(null);
  const [isLiveLocation, setIsLiveLocation] = useState(false);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  const setLocation = useLocationStore((state) => state.setLocation);

  const initMap = () => {
    if (mapRef.current) {
      // to use text-field
      // mapRef.setGlyphs(
      //   "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf"
      // );
      mapRef.current.resize();
      loadIcons(mapRef.current, mapImages);
      loadLayer(mapRef.current, stopsLayer);
    }
  };

  const handleTracking = (position: GeolocationPosition) => {
    if (!mapRef.current) {
      stopTracking();
      return;
    }

    const { latitude, longitude } = position.coords;
    const coordinate: Coordinate = { lat: latitude, lon: longitude };
    setLocation(coordinate);

    if (markerRef.current) {
      markerRef.current.setLngLat(coordinate);
    } else {
      const element = mapImages["my-location-active"];
      element.style.width = "20px";
      markerRef.current = new Marker({ element })
        .setLngLat(coordinate)
        .addTo(mapRef.current);
      mapRef.current.flyTo({ center: coordinate, zoom: STOP_FOCUS_ZOOM });
    }
  };

  const startTracking = () => {
    if (!navigator.geolocation || !mapRef.current) return;

    if (watchIdRef.current)
      mapRef.current.flyTo({
        center: getLastLocation(),
        zoom: STOP_FOCUS_ZOOM,
      });
    else {
      setIsLiveLocation(true);
      watchIdRef.current = navigator.geolocation.watchPosition(
        handleTracking,
        stopTracking
        // { enableHighAccuracy: true }
      );
    }
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
    setIsLiveLocation(false);
  };

  const handleStopClick = (
    event: MapMouseEvent & {
      features?: MapGeoJSONFeature[];
    }
  ) => {
    event.preventDefault();
    const { stopId } = event.features![0].properties;
    setSelectedStop(stopId);
  };

  const handleMapClick = (e: MapMouseEvent) => {
    if (e.defaultPrevented) return;
    setSelectedStop(null);
  };

  useEffect(() => {
    if (mapRef.current) {
      const source = mapRef.current.getSource(stopsLayer.name) as GeoJSONSource;
      if (selectedStop) {
        source.setData(
          getSelectedStopSourceData(selectedStop) as GeoJSON.GeoJSON
        );
        const { lat, lon } = stopsData[selectedStop];
        mapRef.current.flyTo({ center: { lat, lon }, zoom: STOP_FOCUS_ZOOM });
      } else {
        source.setData(stopsLayer.source.data);
      }
    }
  }, [selectedStop]);

  useEffect(() => {
    const map = createMap();

    // handlers happend by order
    map.on("load", initMap);
    map.on("click", stopsLayer.config.id, handleStopClick);
    map.on("click", handleMapClick);

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div id="stops-map" className="map-container">
      <div className="map-action-buttons">
        <button className="hoverable" onClick={startTracking}>
          <FocusIcon color={isLiveLocation ? "#255dfa" : "currentColor"} />
        </button>
      </div>
      {/* TODO make it a component */}
      {selectedStop && (
        <div className="selected-stop">
          <StopIcon />
          <div className="stop-description">
            <p>{stopsData[selectedStop].name}</p>
            <p>
              {stopsData[selectedStop].code} | {stopsData[selectedStop].city}
            </p>
          </div>
          <button className="icon-button" onClick={() => {}}>
            <AddIcon />
          </button>
        </div>
      )}
    </div>
  );
};
