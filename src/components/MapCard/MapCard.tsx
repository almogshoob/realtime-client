import {
  GeoJSONSource,
  Map,
  MapGeoJSONFeature,
  MapMouseEvent,
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
import {
  myLocationLayer,
  updateLocationLayer,
} from "../../mapbox/layers/myLocation";
import { getDeviceLocation } from "../../utils";
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
  const [selectedStop, setSelectedStop] = useState<string | null>(null);

  const initMap = () => {
    if (mapRef.current) {
      // to use text-field
      // mapRef.setGlyphs(
      //   "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf"
      // );
      mapRef.current.resize();
      loadIcons(mapRef.current, mapImages);
      loadLayer(mapRef.current, stopsLayer);
      loadLayer(mapRef.current, myLocationLayer);
    }
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

  // const [isLocationOn, setIsLocationOn] = useState(false);

  const handleFocusLocation = async () => {
    // get location
    const currentLocation = await getDeviceLocation();
    // update layer
    const source = mapRef.current?.getSource(
      myLocationLayer.name
    ) as GeoJSONSource;
    source.setData(updateLocationLayer(currentLocation) as GeoJSON.GeoJSON);
    // refresh
    if (currentLocation) {
      mapRef.current?.flyTo({
        center: currentLocation,
        zoom: STOP_FOCUS_ZOOM,
      });
      // setIsLocationOn(true);
    } else {
      // setIsLocationOn(false);
    }
  };

  return (
    <div id="stops-map" className="map-container">
      <div className="map-action-buttons">
        <button className="hoverable" onClick={handleFocusLocation}>
          {/* <FocusIcon color={isLocationOn ? "#255dfa" : "currentColor"} /> */}
          <FocusIcon />
        </button>
      </div>
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
