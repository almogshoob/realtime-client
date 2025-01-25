import { StopIcon } from "../../../assets/icons";
import { Stop } from "../../../types";
import "../StopCard.css";

type Props = {
  stopData: Stop;
};

export const StopHeader = ({ stopData }: Props) => {
  return (
    <div className="stop-header">
      <StopIcon />
      <div className="stop-description">
        <p>{stopData.name}</p>
        <p>
          {stopData.code} | {stopData.city}
        </p>
      </div>
    </div>
  );
};
