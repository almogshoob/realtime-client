import { RouteSchedule } from "../types";

export const arrivalTimeToString = (arrivalTime: number) => {
  const epochInSec = Math.floor(Date.now() / 1000);
  const minutesLeft = Math.floor((arrivalTime - epochInSec) / 60);
  if (minutesLeft < 0) return "עבר";
  else if (minutesLeft === 0) return "כעת";
  // else if (minutesLeft < 60) return minutesLeft.toString();
  else return new Date(arrivalTime * 1000).toTimeString().slice(0, 5);
};

export const sortRoutesByNextTime = (a: RouteSchedule, b: RouteSchedule) => {
  return a.arrivals[0].arrivalTime < b.arrivals[0].arrivalTime ? -1 : 1;
};
