import { SERVER_URL } from "../constants/constants";
import { RouteData, RouteSchedule } from "../types";

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

const filterStopSchedule = (
  stopSchedule: RouteSchedule[],
  routes: string[]
): RouteSchedule[] => {
  return stopSchedule.filter((routeSchedule) =>
    routes.includes(routeSchedule.shortName)
  );
};

export const getStopSchedule = async (stopId: string, lines: string[]) => {
  const data: RouteSchedule[] = await fetchGet({
    url: `${SERVER_URL}/stops/${stopId}`,
  });
  return filterStopSchedule(data, lines);
};

export const getStopsSchedules = async (stops: {
  [stopId: string]: string[];
}) => {
  const stopsData: { [stopId: string]: RouteSchedule[] } = await fetchGet({
    url: `${SERVER_URL}/stops`,
    params: { stopsIds: Object.keys(stops).join(",") },
  });
  return Object.fromEntries(
    Object.entries(stopsData).map(([stopId, routeSchedule]) => [
      stopId,
      filterStopSchedule(routeSchedule, stops[stopId]),
    ])
  );
};

export const getRouteData = async (routePatternId: string) => {
  const routeData: RouteData = await fetchGet({
    url: `${SERVER_URL}/route/${routePatternId}`,
  });
  return routeData;
};

/*

// one time function to process data stops.txt into stops.json

type DataStop = {
  stop_id: string; // "39311";
  stop_code: string; // "30530";
  stop_name: string; // "אוניברסיטת בר אילן/דרך אשכול";
  stop_desc: string; // "רחוב:   עיר: רמת גן רציף:  קומה: ";
  stop_lat: string; // "32.065728";
  stop_lon: string; // "34.843931";
  parent_station: string; // לרכבת קלה למשל יש תחנה אבא של כל הרציפים ו2 תחנות לפי רציף
  // location_type: string; // 1 for train stations / central stations / masof . else 0
  // zone_id: string; // always identical to stop_code or empty string
};

const relevantKeys = [
  "stop_id",
  "stop_code",
  "stop_name",
  "stop_desc",
  "stop_lat",
  "stop_lon",
  "parent_station",
];

const keysRename: Record<keyof DataStop, keyof Stop> = {
  stop_id: "id",
  stop_code: "code",
  stop_name: "name",
  stop_desc: "city",
  stop_lat: "lat",
  stop_lon: "lon",
  parent_station: "parent",
};
const keysHendlers: Record<keyof DataStop, Function> = {
  stop_id: (v: string) => v,
  stop_code: (v: string) => v,
  stop_name: (v: string) => v,
  stop_desc: (v: string) => /עיר: (?<city>.+) רציף/.exec(v)?.groups?.city || "",
  stop_lat: (v: string) => Number(v),
  stop_lon: (v: string) => Number(v),
  parent_station: (v: string) => v || null,
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

const formatRawStopsTxt = (text: string) => {
  const [keys, ...data] = text.split("\n").map((row) => row.split(","));
  const stopsObject = data.map((row) => {
    const entries: [keyof DataStop, string][] = (
      keys as (keyof DataStop)[]
    ).map((key, i) => [key, row[i]]);
    return Object.fromEntries(entries);
  });
  console.log(stopsObject);
};

*/
