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

export type BNRouteArrival = {
  // stopId: string; // "1:35694"
  // stopIndex: number; // 9
  // stopCount: number; // 33
  // tripId: string; // "1:19289551_281224"
  // routeId: string; // "2783"
  // routeShortName: string; // "292"
  // serviceAreaRadius: number; // 0.0
  // recorded: boolean; // false
  headsign: string; // "בני ברק_קניון איילון"
  timepoint: boolean; // true - what is it?
  realtime: boolean; // didn't fully understand (true if scheduledArrival != realtimeArrival)
  realtimeState: string; // "SCHEDULED" | "UPDATED"
  scheduledArrival: number; // 66441
  realtimeArrival: number; // 66441
  arrivalDelay: number; // 0
  // scheduledDeparture: number; // 66441
  // realtimeDeparture: number; // 66441
  // departureDelay: number; // 0
  serviceDay: 1735336800;
  continuousPickup: number; // 1
  continuousDropOff: number; // 1
  wheelchairAccessible: boolean; // true
};

export type BNRoutePattern = {
  // id: string; // "1:2783:1:01";
  route: {
    // id: string; // "1:2783"
    shortName: string; // "292"
    // longName: string; // "דרך מנחם בגין/קופת חולים-פתח תקווה<->קניון איילון-בני ברק-20"
    color: string; // "004c99"
    // type: number; // 3
    // desc: string; // "10292-2-0"
    // textColor: string; // "FFFFFF"
    // motDirection: string; // "2"
    // motAlternative: string; // "0"
    // motLineId: string; // "10292"
    // agency: {};
    // cluster: {};
  };
  // originStop: {};
  // destStop: {};
};

export type BNRouteSchedule = {
  pattern: BNRoutePattern;
  times: BNRouteArrival[]; // length as param numberOfDepartures
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

// get alerts by stop id
// GET: https://api.busnearby.co.il/directions/patch/stopAlerts/1:39311?locale=he -> ?

export type UserStops = { [stopId: string]: string[] };
export type StopsSchedule = { [stopId: string]: RouteSchedule[] };