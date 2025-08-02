import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { RouteSchedule } from "../../../types";
import { arrivalTimeToString } from "../../../utils";
import "../StopCard.css";

type Props = {
  route: RouteSchedule;
};

export const StopRouteItem = ({ route }: Props) => {
  return (
    <div className="stop-route">
      <Link
        to={`/map/${route.arrivals[0].patternId}`}
        className="route-icon"
        style={{ "--highlight": `#${route.color}` } as CSSProperties}
      >
        {route.shortName}
      </Link>
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
