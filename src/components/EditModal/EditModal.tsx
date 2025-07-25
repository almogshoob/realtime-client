import { KeyboardEventHandler, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useStopsStore } from "../../stores";
import { Stop } from "../../types";
import { Modal } from "../templates";
import "./EditModal.css";

type Props = {
  open: boolean;
  onClose: () => void;
  stopData: Stop;
  mode: "edit" | "add";
};

export const EditModal = ({ open, onClose, stopData, mode }: Props) => {
  const userStopRoutes = useStopsStore(
    useShallow((state) => state.userStops[stopData.id] || [])
  );
  const setUserStop = useStopsStore((state) => state.setUserStop);

  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedRoutes, setSelectedRoutes] = useState(userStopRoutes);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      const inputValue = inputRef.current?.value.trim();
      if (inputValue && !selectedRoutes.includes(inputValue)) {
        inputRef.current!.value = "";
        setSelectedRoutes((prev) => [...prev, inputValue]);
      }
    }
  };

  const removeRoute = (route: string) => {
    setSelectedRoutes((prev) =>
      prev.filter((routeItem) => routeItem !== route)
    );
  };

  const handleEdit = () => {
    setUserStop(stopData.id, selectedRoutes);
    // onClose();
    handleClose();
  };

  const handleClose = () => {
    setTimeout(() => setSelectedRoutes(userStopRoutes), 200);
    onClose();
  };

  const title = mode === "edit" ? "עדכון תחנה" : "הוספת תחנה";
  const action = mode === "edit" ? "עדכון" : "הוספה";

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={title}
      className="edit-modal"
    >
      <p>קווים בתחנת {stopData.name}:</p>
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        placeholder="הוספת קו"
        className="add-input"
      />
      <div className="routes-tags">
        {selectedRoutes.map((route) => (
          <li key={route} onClick={() => removeRoute(route)}>
            <span>{route}</span>
            <span className="fa-s">&#xf00d;</span>
          </li>
        ))}
      </div>
      <button onClick={handleEdit} className="edit-button | hoverable">
        {action}
      </button>
    </Modal>
  );
};
