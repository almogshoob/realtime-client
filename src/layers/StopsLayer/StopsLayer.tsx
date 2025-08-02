import { GeoJSONSource, MapGeoJSONFeature, MapMouseEvent } from "maplibre-gl";
import { useEffect, useState } from "react";
import { stopsData } from "../../assets/data";
import { StopDrawer } from "../../components";
import { STOP_FOCUS_ZOOM } from "../../constants/mapConstants";
import { useMapStore } from "../../stores";
import { Stop } from "../../types";
import { loadLayer } from "../../utils/mapboxUtils";
import { getlayerInit, getLayerSource, layerConfig } from "./manifest";

type Props = {
  stops: Pick<Stop, "id" | "lat" | "lon">[];
};

export const StopsLayer = ({ stops }: Props) => {
  const map = useMapStore((state) => state.map);
  const [selectedStop, setSelectedStop] = useState<string>();

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
    setSelectedStop(undefined);
  };

  // handle select stop
  useEffect(() => {
    if (!map || !map.getSource(layerConfig.source)) return;

    const source = map.getSource(layerConfig.source) as GeoJSONSource;
    source.setData(getLayerSource(stops, selectedStop).data);
    if (selectedStop) {
      const { lat, lon } = stopsData[selectedStop];
      map.flyTo({ center: { lat, lon }, zoom: STOP_FOCUS_ZOOM });
    }
  }, [selectedStop]);

  // init layer
  useEffect(() => {
    if (!map) return;

    const layerInit = getlayerInit(stops);
    if (map.isStyleLoaded()) loadLayer(map, layerInit);
    else map.once("load", () => loadLayer(map, layerInit));
    
    // handlers happend by order
    map.on("click", layerConfig.id, handleStopClick);
    map.on("click", handleMapClick);

    return () => {
      if (map.loaded()) {
        //check if loaded because could be after map.remove() and before setMap(undefined)
        map.off("click", handleMapClick);
        map.off("click", layerConfig.id, handleStopClick);
        map.removeLayer(layerConfig.id);
        map.removeSource(layerConfig.source);
      }
      setSelectedStop(undefined);
    };
  }, [map, stops]);

  return selectedStop ? <StopDrawer stopId={selectedStop} /> : null;
};
