import { useState } from "react";
import { MenuIcon, StopIcon } from "../../../assets/icons";
import { Stop } from "../../../types";
import "../StopCard.css";

type Props = {
  stopData: Stop;
  openModal: (modal: string) => void;
};

export const StopHeader = ({ stopData, openModal }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const menuOptions = [
    {
      name: "עריכה",
      icon: <span className="fa-s">&#xf304;</span>,
      handler: () => openModal("edit"),
    },
    {
      name: "מחיקה",
      icon: <span className="fa-s">&#xf1f8;</span>,
      handler: () => openModal("delete"),
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
          onClick={toggleMenu}
          onBlur={toggleMenu}
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
    </div>
  );
};
