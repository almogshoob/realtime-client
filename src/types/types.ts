export type Coordinate = { lat: number; lon: number };

export type Stop = {
  id: string;
  code: string;
  name: string;
  city: string;
  lat: number;
  lon: number;
  parent: string;
};

export type MapStop = Pick<Stop, "id" | "lat" | "lon">;

export type RouteArrival = {
  patternId: string;
  isRealtime: boolean;
  arrivalTime: number;
  arrivalDelay: number;
  isPickup: boolean;
  isDropOff: boolean;
  isAccessible: boolean;
};

export type RouteSchedule = {
  shortName: string; // 292
  headsign: string; // "בני ברק_קניון איילון"
  color: string; // "004c99"
  arrivals: RouteArrival[];
};

export type RouteData = {
  shortName: string; // 292
  headsign: string; // "בני ברק_קניון איילון"
  color: string; // "004c99"
  stops: { id: string; lat: number; lon: number }[];
  geometry: string; // https://polylinedecoder.online
};

export type UserStops = { [stopId: string]: string[] };
export type StopsSchedule = { [stopId: string]: RouteSchedule[] };
