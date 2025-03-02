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
    if (e.target instanceof HTMLElement && e.target.tagName === "DIALOG")
      onClose();
  };

  useEffect(() => {
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
      {open &&
        (raw ? (
          children
        ) : (
          <div className="TModal">
            <button
              className="TModalCloseButton | icon-button"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
            <div className="TModalHeader">{title}</div>
            <div className="TModalBody">{children}</div>
          </div>
        ))}
    </dialog>
  );
};
