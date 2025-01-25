import { SERVER_URL } from "../constants/constants";
import { BNRouteSchedule, RouteSchedule } from "../types";

type UrlParams = { [key: string]: string | number | boolean };
type UrlStringParams = { [key: string]: string };

const paramsToString = (params: UrlParams): UrlStringParams => {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, value.toString()])
  );
};

const createSearchParams = (params: UrlParams) => {
  return "?" + new URLSearchParams(paramsToString(params)).toString();
};

type FetchGet = {
  url: RequestInfo | URL;
  params?: UrlParams;
  headers?: { [key: string]: string };
};

export const fetchGet = ({ url, params, headers }: FetchGet) =>
  fetch(url + (params ? createSearchParams(params) : ""), {
    method: "GET",
    headers,
    body: null,
  }).then((response) => {
    return response.json();
    // if (response.ok) return response.json();
    // else throw new Error(response.statusText);
  });

// TODO combine multiple items with same route (if different pattern)
const formatStopSchedule = (
  stopSchedule: BNRouteSchedule[],
  routes: string[]
): RouteSchedule[] => {
  return stopSchedule
    .filter(
      (routeSchedule) =>
        routes.includes(routeSchedule.pattern.route.shortName) &&
        routeSchedule.times.length
    )
    .map((routeSchedule) => ({
      shortName: routeSchedule.pattern.route.shortName,
      headsign: routeSchedule.times[0].headsign,
      color: routeSchedule.pattern.route.color,
      arrivals: routeSchedule.times.map((arrival) => ({
        isRealtime: arrival.realtimeState === "UPDATED",
        arrivalTime: arrival.serviceDay + arrival.realtimeArrival,
        arrivalDelay: arrival.arrivalDelay,
        isPickup: arrival.continuousPickup === 1,
        isDropOff: arrival.continuousDropOff === 1,
        isAccessible: arrival.wheelchairAccessible,
      })),
    }));
};

export const getStopSchedule = async (stopId: string, lines: string[]) => {
  const data: BNRouteSchedule[] = await fetchGet({
    url: `${SERVER_URL}/get-stop`,
    params: { stopId },
  });
  return formatStopSchedule(data, lines);
};

export const getStopsSchedules = async (stops: {
  [stopId: string]: string[];
}) => {
  const stopsData: { [stopId: string]: BNRouteSchedule[] } = await fetchGet({
    url: `${SERVER_URL}/get-stops`,
    params: { stopsIds: Object.keys(stops).join(",") },
  });
  return Object.fromEntries(
    Object.entries(stopsData).map(([stopId, routeSchedule]) => [
      stopId,
      formatStopSchedule(routeSchedule, stops[stopId]),
    ])
  );
};

/*

// -----------------------------------------------

// another data source gov
// https://bus.gov.il/#/realtime/1/0/2/30530

// not needed while having stops.txt
const isStopExist = (stopId: string) => {
  // https://data.gov.il/dataset/bus_stops/resource/e873e6a2-66c1-494f-a677-f5e77348edb0
  return fetchGet({
    url: "https://data.gov.il/api/3/action/datastore_search",
    params: {
      resource_id: "e873e6a2-66c1-494f-a677-f5e77348edb0",
      fields: "StationId",
      q: stopId,
      limit: 1,
      offset: 0,
    },
  });
};

// not needed while having stops.txt
// GET: https://app.busnearby.co.il/stopSearch?query=30530&locale=he -> Stop[]
type BNStop = {
  latitude: number; // 32.065728
  longitude: number; // 34.843931,
  stop_name: string; // "אוניברסיטת בר אילן/דרך אשכול",
  stop_id: string; // "39311",
  stop_code: string; // "30530",
  address: string; // "רמת גן",
  location_type: number; // 5
};
const searchStop = async (query: string) => {
  const data: BNStop[] = await fetchGet({
    url: `${API_URL}/stopSearch`,
    params: { query, locale: "he" },
  });
  return data;
};

// not really needed
// GET: https://api.busnearby.co.il/directions/index/stops/1:39311/routes -> Route[]
type BNRoute = {
  id: string; // "1:989",
  shortName: string; // "68",
  longName: string; // "מסוף קרית אונו-קרית אונו<->מסוף רדינג/הורדה-תל אביב יפו-20",
  mode: string; // "BUS",
  color: string; // "F78F1E",
  agencyName: string; // "מטרופולין"
};
const getStopRoutes = async (stopId: string) => {
  const data: BNRoute[] = await fetchGet({
    url: `${API_URL}/directions/index/stops/1:${stopId}/routes`,
  });
  return data;
};

// -----------------------------------------------
// one time function to process data stops.txt into stops.json

type DataStop = {
  stop_id: string; // "39311";
  stop_code: string; // "30530";
  stop_name: string; // "אוניברסיטת בר אילן/דרך אשכול";
  stop_desc: string; // "רחוב:   עיר: רמת גן רציף:  קומה: ";
  stop_lat: string; // "32.065728";
  stop_lon: string; // "34.843931";
  // zone_id: string; // "30530";
  // location_type: string; // "0";
  // parent_station: string; // "";
};

const relevantKeys = [
  "stop_id",
  "stop_code",
  "stop_name",
  "stop_desc",
  "stop_lat",
  "stop_lon",
];

const keysRename: Record<keyof DataStop, keyof Stop> = {
  stop_id: "id",
  stop_code: "code",
  stop_name: "name",
  stop_desc: "city",
  stop_lat: "lat",
  stop_lon: "lon",
};
const keysHendlers: Record<keyof DataStop, Function> = {
  stop_id: (v: string) => v,
  stop_code: (v: string) => v,
  stop_name: (v: string) => v,
  stop_desc: (v: string) => /עיר: (?<city>.+) רציף/.exec(v)?.groups?.city || "",
  stop_lat: (v: string) => parseFloat(v),
  stop_lon: (v: string) => parseFloat(v),
};

const formatStopsTxt = (text: string) => {
  const [keys, ...data] = text.split("\n").map((row) => row.split(","));
  const stopsObject = data.map((row) => {
    const entries: [keyof DataStop, string][] = (
      keys as (keyof DataStop)[]
    ).map((key, i) => [key, row[i]]);
    const relevantEntries = entries.filter(([key, _]) =>
      relevantKeys.includes(key)
    );
    return Object.fromEntries(
      relevantEntries.map(([key, value]) => [
        keysRename[key],
        keysHendlers[key](value),
      ])
    ) as Stop[];
  });
  console.log(stopsObject);
};

// -----------------------------------------------

*/
