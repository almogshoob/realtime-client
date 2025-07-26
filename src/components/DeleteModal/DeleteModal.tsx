import { stopsData } from "../../assets/data";
import { useStopsStore } from "../../stores";
import { Modal } from "../templates";
import "./DeleteModal.css";

type Props = {
  open: boolean;
  onClose: () => void;
  stopId: string;
};

export const DeleteModal = ({ open, onClose, stopId }: Props) => {
  const removeUserStop = useStopsStore((state) => state.removeUserStop);

  const handleDelete = () => {
    removeUserStop(stopId);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="מחיקת תחנה"
      className="delete-modal"
    >
      <p>האם ברצונך למחוק את תחנת {stopsData[stopId].name}?</p>
      <button onClick={handleDelete} className="delete-button | hoverable">
        מחיקה
      </button>
    </Modal>
  );
};
