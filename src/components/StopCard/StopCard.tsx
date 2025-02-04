import useStopsStore from "../../stores/stops";
import { Stop } from "../../types";
import { sortRoutesByNextTime } from "../../utils";
import "./StopCard.css";
import { StopHeader } from "./StopHeader/StopHeader";
import { StopRouteItem } from "./StopRouteItem/StopRouteItem";

type Props = {
  stopData: Stop;
};

export const StopCard = ({ stopData }: Props) => {
  const routes = useStopsStore((state) => state.stopsSchedule[stopData.id]);

  return (
    <div className="stop-wrapper">
      <StopHeader stopData={stopData} />
      <div className="stop-routes">
        {routes &&
          routes
            .sort(sortRoutesByNextTime)
            .map((route) => (
              <StopRouteItem
                key={`${route.shortName}:${route.headsign}`}
                route={route}
              />
            ))}
      </div>
    </div>
  );
};
