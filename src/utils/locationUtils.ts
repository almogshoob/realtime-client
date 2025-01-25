import { stops } from "../assets/data";
import { DEFAULT_LOCATION, EARTH_RADIUS_KM } from "../constants/constants";
import { Coordinate, RouteSchedule, Stop } from "../types";

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

export const updateLastLocation = async () => {
  const currentLocation = await getLocation();
  if (currentLocation) {
    localStorage.setItem("last-location", JSON.stringify(currentLocation));
  } else if (!localStorage.getItem("last-location")) {
    localStorage.setItem("last-location", JSON.stringify(DEFAULT_LOCATION));
  }
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

export const getNearStops = (location: Coordinate, radiusKM: number) => {
  return stops.filter(
    ({ lat, lon }) => haversineDistanceKM(location, { lat, lon }) < radiusKM
  );
};

export const sortStopsByDistance = (
  a: { stopData: Stop; routes: RouteSchedule[] },
  b: { stopData: Stop; routes: RouteSchedule[] }
) => {
  const location = JSON.parse(localStorage.getItem("last-location") || "");
  if (!location) return 1;

  return haversineDistanceKM(location, {
    lat: a.stopData.lat,
    lon: a.stopData.lon,
  }) <
    haversineDistanceKM(location, {
      lat: b.stopData.lat,
      lon: b.stopData.lon,
    })
    ? -1
    : 1;
};
