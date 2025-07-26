import { Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState } from "react";
import { FocusIcon } from "../../assets/icons";
import { mapImages } from "../../assets/mapImages";
import { STOP_FOCUS_ZOOM } from "../../constants/mapConstants";
import { useLocationStore, useMapStore } from "../../stores";
import { Coordinate } from "../../types";
import { getLastLocation } from "../../utils";

export const LocationLayer = () => {
  const map = useMapStore((state) => state.map);

  const markerRef = useRef<Marker>(null);
  const watchIdRef = useRef<number>(null);
  const [isLiveLocation, setIsLiveLocation] = useState(false);
  const setLocation = useLocationStore((state) => state.setLocation);

  const startTracking = () => {
    if (!navigator.geolocation || !map) return;

    if (watchIdRef.current)
      map.flyTo({
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

  const handleTracking = (position: GeolocationPosition) => {
    if (!map) {
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
        .addTo(map);
      map.flyTo({ center: coordinate, zoom: STOP_FOCUS_ZOOM });
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

  return (
    <button className="hoverable" onClick={startTracking}>
      <FocusIcon color={isLiveLocation ? "#255dfa" : "currentColor"} />
    </button>
  );
};
