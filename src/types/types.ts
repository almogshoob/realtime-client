export type Coordinate = { lat: number; lon: number };

// get stop by stop number
// this file match the stop_id of bus nearby
// https://www.gov.il/he/pages/gtfs_general_transit_feed_specifications
// https://gtfs.mot.gov.il/gtfsfiles/israel-public-transportation.zip /stops.txt + formatStopsTxt
export type Stop = {
  id: string;
  code: string;
  name: string;
  city: string;
  lat: number;
  lon: number;
  parent: string;
};

export type RouteArrival = {
  isRealtime: boolean; // realtimeState === "UPDATED"
  arrivalTime: number; // serviceDay + realtimeArrival
  arrivalDelay: number;
  isPickup: boolean; // continuousPickup === 1
  isDropOff: boolean; // continuousDropOff === 1
  isAccessible: boolean; // wheelchairAccessible
};

export type RouteSchedule = {
  shortName: string; // 292
  headsign: string; // "בני ברק_קניון איילון"
  color: string; // "004c99"
  arrivals: RouteArrival[];
};

export type UserStops = { [stopId: string]: string[] };
export type StopsSchedule = { [stopId: string]: RouteSchedule[] };