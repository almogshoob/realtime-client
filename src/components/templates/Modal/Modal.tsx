import { ReactNode, useEffect, useRef } from "react";
import { CloseIcon } from "../../../assets/icons";
import "./Modal.css";

type Props = {
  open: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
  raw?: boolean;
  title?: string;
};

export const Modal = ({
  open,
  onClose,
  className,
  raw,
  title,
  children,
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    console.log("backdrop click");
    if (e.target instanceof HTMLElement && e.target.tagName === "DIALOG")
      onClose();
  };

  useEffect(() => {
    console.log("use effect");
    if (open) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);

  return (
    <dialog
      className={`TModalWrapper ${className || ""}`.trim()}
      ref={ref}
      onCancel={onClose}
      onClick={handleBackdropClick}
    >
      {raw ? (
        children
      ) : (
        <div className="TModal">
          <button
            className="icon-button"
            style={{
              margin: "0.4rem",
              padding: "0.1rem",
              float: "left",
              opacity: 0.75,
            }}
            onClick={onClose}
          >
            <CloseIcon />
          </button>
          <div className="TModalHeader">{title}</div>
          <div className="TModalBody">{children}</div>
        </div>
      )}
    </dialog>
  );
};
