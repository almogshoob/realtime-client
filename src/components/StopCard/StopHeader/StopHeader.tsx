import { useState } from "react";
import { MenuIcon, StopIcon } from "../../../assets/icons";
import { Stop } from "../../../types";
import { DeleteModal } from "../../DeleteModal/DeleteModal";
import { EditModal } from "../../EditModal/EditModal";
import "../StopCard.css";

type Props = {
  stopData: Stop;
};

export const StopHeader = ({ stopData }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const menuOptions = [
    {
      name: "עריכה",
      icon: <span className="fa-s">&#xf304;</span>,
      handler: () => setIsEditModalOpen(true),
    },
    {
      name: "מחיקה",
      icon: <span className="fa-s">&#xf1f8;</span>,
      handler: () => setIsDeleteModalOpen(true),
    },
  ];

  return (
    <div className="stop-header">
      <StopIcon />
      <div className="stop-description">
        <p>{stopData.name}</p>
        <p>
          {stopData.code} | {stopData.city}
        </p>
      </div>
      <div className="menu-wrapper">
        <button
          className="icon-button"
          onClick={() => setIsMenuOpen(true)}
          onBlur={() => setIsMenuOpen(false)}
        >
          <MenuIcon />
        </button>
        {isMenuOpen && (
          <menu className="stop-menu">
            {menuOptions.map((option) => (
              <li
                key={option.name}
                onClick={option.handler}
                onMouseDown={(e) => e.preventDefault()} // prevent onBlur
                className="hoverable"
              >
                {option.icon}
                {option.name}
              </li>
            ))}
          </menu>
        )}
      </div>
      <EditModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        stopData={stopData}
        mode="edit"
      />
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        stopData={stopData}
      />
    </div>
  );
};
