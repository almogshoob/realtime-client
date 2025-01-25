import { CSSProperties } from "react";
import { arrivalTimeToString } from "../../../utils";
import { RouteSchedule } from "../../../types";
import "../StopCard.css";

type Props = {
  route: RouteSchedule;
};

export const StopRouteItem = ({ route }: Props) => {
  return (
    <div className="stop-route">
      <div
        className="route-icon"
        style={{ "--highlight": `#${route.color}` } as CSSProperties}
      >
        <p>{route.shortName}</p>
      </div>
      <p className="head-to">{route.headsign.split("_")[0]}</p>
      <div className="arrivals">
        {route.arrivals.map((arrival, i) => {
          const timeString = arrivalTimeToString(arrival.arrivalTime);
          return (
            <span
              className="arrival-item"
              key={i}
              time-type={arrival.isRealtime ? "real" : "scheduled"}
            >
              {timeString}
              {timeString.length <= 2 && (
                <span style={{ fontSize: "0.7em" }}> min</span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};
