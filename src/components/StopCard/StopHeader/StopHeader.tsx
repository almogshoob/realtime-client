import { useState } from "react";
import { MenuIcon, StopIcon } from "../../../assets/icons";
import { Stop } from "../../../types";
import "../StopCard.css";

type Props = {
  stopData: Stop;
};

export const StopHeader = ({ stopData }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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
            <li className="hoverable">
              <span className="fa-s">&#xf304;</span>
              עריכה
            </li>
            <li className="hoverable">
              <span className="fa-s">&#xf1f8;</span>
              מחיקה
            </li>
          </menu>
        )}
      </div>
    </div>
  );
};
