import { ChangeEvent, MouseEventHandler, useState } from "react";
import { Stop } from "../../types";
import "./SearchBar.css";
import { EditModal } from "../EditModal/EditModal";
import { MapIcon } from "../../assets/icons";
import { Modal } from "../templates";
import { MapCard } from "../MapCard/MapCard";
import { stopsDataList } from "../../assets/data";
import { doesTextMatchQuery } from "../../utils";
import { Link } from "react-router-dom";

type Props = {};

export const SearchBar = ({}: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState<Stop[]>([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStop, setSelectedStop] = useState<Stop>();

  const updateOptions = (searchValue: string) => {
    if (!searchValue) setOptions([]);
    else if (searchValue.length > 3) {
      const stopsByQuery = stopsDataList.filter(
        (stop) =>
          stop.code.includes(searchValue) ||
          doesTextMatchQuery(stop.name, searchValue)
      );
      setOptions(stopsByQuery.slice(0, 10));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    updateOptions(value);
  };

  const handleFocus = () => {
    updateOptions(searchValue);
  };

  const handleBlur = () => {
    setOptions([]);
  };

  const getSelectStopHandler =
    (stop: Stop): MouseEventHandler<HTMLLIElement> =>
    () => {
      setSelectedStop(stop);
      setIsEditModalOpen(true);
      setSearchValue("");
      setOptions([]);
    };

  return (
    <div className="searchbar-wrapper">
      <div className="autocomplete-wrapper">
        <input
          value={searchValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="חיפוש שם או מספר תחנה..."
          className="searchbar"
        />
        {options.length > 0 && (
          <menu className="autocomplete">
            {options.map((stop) => (
              <li
                key={stop.id}
                onMouseDown={(e) => e.preventDefault()} // prevent onBlur
                onClick={getSelectStopHandler(stop)}
                className="hoverable"
              >
                <span>{stop.name}</span>
                <span>{stop.code}</span>
              </li>
            ))}
          </menu>
        )}
      </div>
      <Link to="/map" className="map-button | link-button hoverable">
        <MapIcon />
      </Link>

      {selectedStop && (
        <EditModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          stopData={selectedStop}
          mode="add"
        />
      )}
    </div>
  );
};
