import { CSSProperties } from "react";
import { arrivalTimeToString } from "../../../utils";
import { RouteSchedule } from "../../../types";
import "../StopCard.css"

type Props = {
  line: RouteSchedule;
};

export const StopLineItem = ({ line }: Props) => {
  return (
    <div className="stop-line">
      <div
        className="line-icon"
        style={{ "--highlight": `#${line.color}` } as CSSProperties}
      >
        <p>{line.shortName}</p>
      </div>
      <p className="head-to">{line.headsign.split("_")[0]}</p>
      <div className="arrivals">
        {line.arrivals.map((arrival, i) => (
          <span
            className="arrival-item"
            key={i}
            time-type={arrival.isRealtime ? "real" : "scheduled"}
          >
            {/* TODO replace with Timer component auto refresh relative to now() */}
            {arrivalTimeToString(arrival.arrivalTime)}
          </span>
        ))}
      </div>
    </div>
  );
};
