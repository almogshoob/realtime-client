import { useState } from "react";
import { Link } from "react-router-dom";
import { stopsData } from "../../assets/data";
import { AddIcon, ClockIcon, StopIcon } from "../../assets/icons";
import { EditModal } from "../EditModal/EditModal";
import "./StopDrawer.css";

type Props = {
  stopId: string;
};

export const StopDrawer = ({ stopId }: Props) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // TODO error show scroll y on animation because it start from out of screen
  return (
    <>
      <div className="selected-stop">
        <StopIcon />
        <div className="stop-description">
          <p>{stopsData[stopId].name}</p>
          <p>
            {stopsData[stopId].code} | {stopsData[stopId].city}
          </p>
        </div>
        <Link to={`/stop/${stopId}`} className="icon-button">
          <ClockIcon />
        </Link>
        <button className="icon-button" onClick={() => setIsAddModalOpen(true)}>
          <AddIcon />
        </button>
      </div>
      <EditModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        stopId={stopId}
      />
    </>
  );
};
