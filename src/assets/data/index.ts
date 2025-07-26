import { Stop } from "../../types";
import dataStops from "./stops-list.json";

// stops data is from this gov data (bus nearbuy use same stop_id)
// https://www.gov.il/he/pages/gtfs_general_transit_feed_specifications
// https://gtfs.mot.gov.il/gtfsfiles/israel-public-transportation.zip /stops.txt + formatStopsTxt

const stopsDataListWithParents = dataStops as Stop[];
const stopsDataList = stopsDataListWithParents.filter((stop) => !stop.parent);

const stopsDataWithParents = Object.fromEntries(
  stopsDataListWithParents.map((stop) => [stop.id, stop])
);
const stopsData = Object.fromEntries(
  stopsDataList.map((stop) => [stop.id, stop])
);

export {
  stopsDataListWithParents,
  stopsDataList,
  stopsDataWithParents,
  stopsData,
};
