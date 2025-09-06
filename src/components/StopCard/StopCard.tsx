import { useStopsStore } from "../../stores";
import { RouteSchedule, Stop } from "../../types";
import { sortRoutesByNextTime } from "../../utils";
import "./StopCard.css";
import { StopHeader } from "./StopHeader/StopHeader";
import { StopRouteItem } from "./StopRouteItem/StopRouteItem";

type Props = {
  stopData: Stop;
  routesOverride?: RouteSchedule[];
};

export const StopCard = ({ stopData, routesOverride }: Props) => {
  const routes = useStopsStore((state) => state.stopsSchedule[stopData.id]);
  const finalRoutes = routesOverride ?? routes;

  return (
    <div className="stop-wrapper">
      <StopHeader stopData={stopData} />
      <div className="stop-routes">
        {finalRoutes?.sort(sortRoutesByNextTime).map((route) => (
          <StopRouteItem
            key={`${route.shortName}:${route.headsign}`}
            route={route}
          />
        ))}
      </div>
    </div>
  );
};
