import { RouteSchedule, Stop } from "../../types";
import { sortRoutesByNextTime } from "../../utils";
import "./StopCard.css";
import { StopHeader } from "./StopHeader/StopHeader";
import { StopRouteItem } from "./StopRouteItem/StopRouteItem";

type Props = {
  stopData: Stop;
  routes: RouteSchedule[];
};

export const StopCard = ({ stopData, routes }: Props) => {
  return (
    <div className="stop-wrapper">
      <StopHeader stopData={stopData} />
      <div className="stop-routes">
        {routes.sort(sortRoutesByNextTime).map((route) => (
          <StopRouteItem key={route.shortName} route={route} />
        ))}
      </div>
    </div>
  );
};
