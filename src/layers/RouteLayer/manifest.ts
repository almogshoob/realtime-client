import {
  GeoJSONSourceSpecification,
  LineLayerSpecification,
} from "maplibre-gl";
import { Coordinate, MapLayerData } from "../../types";
import { coordinateToArray } from "../../utils";

const layerName = "route";

export const layerConfig: LineLayerSpecification = {
  id: `${layerName}-layer`,
  type: "line",
  source: layerName,
  paint: {
    "line-color": ["get", "color"],
    "line-width": ["get", "width"],
  },
  minzoom: 8,
};

export const getLayerSource = (
  line: Coordinate[],
  color: string
): GeoJSONSourceSpecification => {
  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        // {
        //   type: "Feature",
        //   geometry: {
        //     type: "LineString",
        //     coordinates: line.map((coordinate) =>
        //       coordinateToArray(coordinate)
        //     ),
        //   },
        //   properties: {
        //     width: 5,
        //     color: "black",
        //   },
        // },
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: line.map((coordinate) =>
              coordinateToArray(coordinate)
            ),
          },
          properties: {
            width: 4,
            color: `#${color}`,
          },
        },
      ],
    },
  };
};

export const getLayerInit = (
  line: Coordinate[],
  color: string
): MapLayerData<LineLayerSpecification> => ({
  name: layerName,
  config: layerConfig,
  source: getLayerSource(line, color),
});
