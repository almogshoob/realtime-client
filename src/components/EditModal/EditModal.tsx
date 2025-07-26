import {
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { stopsData } from "../../assets/data";
import { useStopsStore } from "../../stores";
import { Modal } from "../templates";
import "./EditModal.css";

type Props = {
  open: boolean;
  onClose: () => void;
  stopId: string;
};

export const EditModal = ({ open, onClose, stopId }: Props) => {
  const userRoutes = useStopsStore((state) => state.userStops[stopId]);
  const setUserStop = useStopsStore((state) => state.setUserStop);
  const text = useMemo(
    () =>
      userRoutes
        ? { title: "עדכון תחנה", action: "עדכון" }
        : { title: "הוספת תחנה", action: "הוספה" },
    [userRoutes]
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);

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
    setUserStop(stopId, selectedRoutes);
    onClose();
  };

  useEffect(() => {
    if (open) setSelectedRoutes(userRoutes || []);
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={text.title}
      className="edit-modal"
    >
      <p>קווים בתחנת {stopsData[stopId].name}:</p>
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
        {text.action}
      </button>
    </Modal>
  );
};
