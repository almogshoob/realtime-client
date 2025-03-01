import { DEFAULT_LOCATION, EARTH_RADIUS_KM } from "../constants/constants";
import { Coordinate, Stop } from "../types";

export const coordinateToArray = ({ lat, lon }: Coordinate) => [lon, lat];

export const getDeviceLocation = async () => {
  try {
    const location: Coordinate = await new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ lat: latitude, lon: longitude });
          },
          (error) => {
            reject(`Error getting location: ${error.message}`);
          }
        );
      } else {
        reject("Geolocation is not supported by your browser.");
      }
    });
    return location;
  } catch {
    return null;
  }
};

export const getLastLocation = () => {
  const lastLocation = localStorage.getItem("last-location");
  return lastLocation
    ? (JSON.parse(lastLocation) as Coordinate)
    : DEFAULT_LOCATION;
};

const degToRad = (degree: number) => {
  return (degree * Math.PI) / 180;
};

export const haversineDistanceKM = (
  coordinate1: Coordinate,
  coordinate2: Coordinate
) => {
  const lat1Rad = degToRad(coordinate1.lat);
  const lon1Rad = degToRad(coordinate1.lon);
  const lat2Rad = degToRad(coordinate2.lat);
  const lon2Rad = degToRad(coordinate2.lon);

  const d =
    2 *
    EARTH_RADIUS_KM *
    Math.asin(
      Math.sqrt(
        Math.sin((lat2Rad - lat1Rad) / 2) ** 2 +
          Math.cos(lat1Rad) *
            Math.cos(lat2Rad) *
            Math.sin((lon2Rad - lon1Rad) / 2) ** 2
      )
    );
  return parseFloat(d.toFixed(3));
};

export const getStopsInRadius = (stops: Stop[], radiusKM: number) => {
  const location = getLastLocation();
  return stops.filter(
    ({ lat, lon }) => haversineDistanceKM(location, { lat, lon }) < radiusKM
  );
};

export const getNearestStops = (stops: Stop[], max: number) => {
  if (max < 1) return [];

  const location = getLastLocation();
  return stops
    .sort(
      ({ lat: lat1, lon: lon1 }, { lat: lat2, lon: lon2 }) =>
        haversineDistanceKM(location, { lat: lat1, lon: lon1 }) -
        haversineDistanceKM(location, { lat: lat2, lon: lon2 })
    )
    .slice(0, max);
};

export const toSortedByDistance = (stops: Stop[], location: Coordinate) => {
  const copy = stops.slice();
  copy.sort((a, b) =>
    haversineDistanceKM(location, {
      lat: a.lat,
      lon: a.lon,
    }) <
    haversineDistanceKM(location, {
      lat: b.lat,
      lon: b.lon,
    })
      ? -1
      : 1
  );
  return copy;
};
