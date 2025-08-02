import { useState } from "react";
import { stopsData } from "../../assets/data";
import { AddIcon, StopIcon } from "../../assets/icons";
import { EditModal } from "../EditModal/EditModal";
import "./StopDrawer.css";

type Props = {
  stopId: string;
};

export const StopDrawer = ({ stopId }: Props) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
