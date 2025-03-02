import { Stop } from "../../types";
import dataStops from "./stops-list.json";

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
