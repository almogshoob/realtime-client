import polyline from "@mapbox/polyline";
import { LngLatBounds } from "maplibre-gl";
import { useEffect, useState } from "react";
import { CircleLoader } from "../../components/templates";
import { useMapStore } from "../../stores";
import { MapStop } from "../../types";
import { getBoundingBox, getRouteData } from "../../utils";
import { loadLayer } from "../../utils/mapboxUtils";
import { StopsLayer } from "../StopsLayer/StopsLayer";
import { getLayerInit, layerConfig } from "./manifest";

type Props = {
  routePatternId: string;
};

export const RouteLayer = ({ routePatternId }: Props) => {
  const map = useMapStore((state) => state.map);
  const [stops, setStops] = useState<MapStop[]>();

  // init layer
  useEffect(() => {
    if (!map) return;

    getRouteData(routePatternId).then((data) => {
      const geometry = polyline
        .decode(data.geometry, 6)
        .map(([lat, lon]) => ({ lat, lon }));
      const bbox = getBoundingBox(geometry);

      map.fitBounds(
        new LngLatBounds(
          { lat: bbox.minLat, lon: bbox.minLon },
          { lat: bbox.maxLat, lon: bbox.maxLon }
        ),
        { padding: 20, duration: 0 }
      );

      const layerInit = getLayerInit(geometry, data.color);
      if (map.isStyleLoaded()) loadLayer(map, layerInit);
      else
        map.once("load", () => {
          loadLayer(map, layerInit);
        });

      // TODO error stops shows only on first try, backword forward and it doesnt show
      setStops(data.stops); // add stops above polyline
    });

    return () => {
      if (map.loaded()) {
        //check if loaded because could be after map.remove() and before setMap(undefined)
        map.removeLayer(layerConfig.id);
        map.removeSource(layerConfig.source);
      }
    };
  }, [map]);

  return stops ? (
    <StopsLayer stops={stops} />
  ) : (
    <CircleLoader
      color="#FFFFFF77"
      fontSize="10rem"
      center="absolute"
      style={{
        backdropFilter: "blur(3px) brightness(0.75)",
      }}
    />
  );
};
