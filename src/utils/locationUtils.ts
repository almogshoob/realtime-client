import { stops } from "../assets/data";
import { EARTH_RADIUS_KM } from "../constants/constants";
import { Coordinate } from "../types";

export const getLocation = async () => {
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

const degToRad = (degree: number) => {
  return (degree * Math.PI) / 180;
};

export const haversineDistanceKM = (
  lat1Deg: number,
  lon1Deg: number,
  lat2Deg: number,
  lon2Deg: number
) => {
  const lat1Rad = degToRad(lat1Deg);
  const lon1Rad = degToRad(lon1Deg);
  const lat2Rad = degToRad(lat2Deg);
  const lon2Rad = degToRad(lon2Deg);

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

export const getNearStops = (location: Coordinate, radiusKM: number) => {
  return stops.filter(
    (stop) =>
      haversineDistanceKM(location.lat, location.lon, stop.lat, stop.lon) <
      radiusKM
  );
};
