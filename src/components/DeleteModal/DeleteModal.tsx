import useStopsStore from "../../stores/stops";
import { Stop } from "../../types";
import { Modal } from "../templates";
import "./DeleteModal.css";

type Props = {
  open: boolean;
  onClose: () => void;
  stopData: Stop;
};

export const DeleteModal = ({ open, onClose, stopData }: Props) => {
  const removeUserStop = useStopsStore((state) => state.removeUserStop);

  const handleDelete = () => {
    removeUserStop(stopData.id);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="מחיקת תחנה"
      className="delete-modal"
    >
      <p>האם ברצונך למחוק את תחנת {stopData.name}?</p>
      <button onClick={handleDelete} className="delete-button | hoverable">
        מחיקה
      </button>
    </Modal>
  );
};
