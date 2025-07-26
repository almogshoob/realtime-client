import { GeoJSONSource, MapGeoJSONFeature, MapMouseEvent } from "maplibre-gl";
import { useEffect, useState } from "react";
import { stopsData } from "../../assets/data";
import { AddIcon, StopIcon } from "../../assets/icons";
import { EditModal } from "../../components";
import { STOP_FOCUS_ZOOM } from "../../constants/mapConstants";
import { useMapStore } from "../../stores";
import { loadLayer } from "../../utils/mapboxUtils";
import "./StopsLayer.css";
import { getLayerSource, layerConfig, layerInit } from "./manifest";

export const StopsLayer = () => {
  const map = useMapStore((state) => state.map);
  const [selectedStop, setSelectedStop] = useState<string>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
    source.setData(getLayerSource(selectedStop).data);
    if (selectedStop) {
      const { lat, lon } = stopsData[selectedStop];
      map.flyTo({ center: { lat, lon }, zoom: STOP_FOCUS_ZOOM });
    }
  }, [selectedStop]);

  // init layer
  useEffect(() => {
    if (!map) return;

    // handlers happend by order
    if (map.isStyleLoaded()) {
      loadLayer(map, layerInit);
    } else map.once("load", () => loadLayer(map, layerInit));
    map.on("click", layerConfig.id, handleStopClick);
    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
      map.off("click", layerConfig.id, handleStopClick);
      map.removeLayer(layerConfig.id);
      map.removeSource(layerConfig.source);
      setSelectedStop(undefined);
    };
  }, [map]);

  if (!selectedStop) return null;

  return (
    <>
      <div className="selected-stop">
        <StopIcon />
        <div className="stop-description">
          <p>{stopsData[selectedStop].name}</p>
          <p>
            {stopsData[selectedStop].code} | {stopsData[selectedStop].city}
          </p>
        </div>
        <button className="icon-button" onClick={() => setIsAddModalOpen(true)}>
          <AddIcon />
        </button>
      </div>
      <EditModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        stopId={selectedStop}
      />
    </>
  );
};
