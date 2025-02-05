import { useState } from "react";
import useStopsStore from "../../stores/stops";
import { Stop } from "../../types";
import { sortRoutesByNextTime } from "../../utils";
import { Modal } from "../templates";
import "./StopCard.css";
import { StopHeader } from "./StopHeader/StopHeader";
import { StopRouteItem } from "./StopRouteItem/StopRouteItem";

type Props = {
  stopData: Stop;
};

export const StopCard = ({ stopData }: Props) => {
  const routes = useStopsStore((state) => state.stopsSchedule[stopData.id]);
  const removeUserStop = useStopsStore((state) => state.removeUserStop);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openModal = (modal: string) => {
    switch (modal) {
      case "edit":
        setIsEditModalOpen(true);
        break;
      case "delete":
        setIsDeleteModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDelete = () => removeUserStop(stopData.id);
  const handleEdit = () => removeUserStop(stopData.id);

  return (
    <div className="stop-wrapper">
      <StopHeader stopData={stopData} openModal={openModal} />
      <div className="stop-routes">
        {routes?.sort(sortRoutesByNextTime).map((route) => (
          <StopRouteItem
            key={`${route.shortName}:${route.headsign}`}
            route={route}
          />
        ))}
      </div>
      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="עדכון תחנה"
        className="delete-modal"
      >
        {/* TODO edit (use it for adding too) */}
        <p>קווים בתחנת {stopData.name}:</p>
        {routes?.map(({ shortName, headsign }) => (
          <p key={shortName + headsign}>{shortName}</p>
        ))}
        <button onClick={handleDelete} className="edit-button | hoverable">
          עדכון
        </button>
      </Modal>
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="מחיקת תחנה"
        className="delete-modal"
      >
        <p>האם ברצונך למחוק את תחנת {stopData.name}?</p>
        <button onClick={handleDelete} className="delete-button | hoverable">
          מחיקה
        </button>
      </Modal>
    </div>
  );
};
