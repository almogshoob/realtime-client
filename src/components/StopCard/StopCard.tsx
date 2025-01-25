import { RouteSchedule, Stop } from "../../types";
import { StopHeader } from "./StopHeader/StopHeader";
import { StopLineItem } from "./StopLineItem/StopLineItem";
import "./StopCard.css"

type Props = {
  stopData: Stop;
  lines: RouteSchedule[];
};

export const StopCard = ({ stopData, lines }: Props) => {
  return (
    <div className="stop-wrapper">
      <StopHeader stopData={stopData} />
      <div className="stop-lines">
        {lines.map((line) => (
          <StopLineItem key={line.shortName} line={line} />
        ))}
      </div>
    </div>
  );
};
