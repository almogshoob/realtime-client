import { ChangeEvent, MouseEventHandler, useState } from "react";
import { stops } from "../../assets/data";
import { Stop } from "../../types";
import "./SearchBar.css";

const stopsOptions = stops.filter((stop) => !stop.parent);

type Props = {};

export const SearchBar = ({}: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState<Stop[]>([]);

  const updateOptions = (searchValue: string) => {
    if (!searchValue) setOptions([]);
    else if (searchValue.length > 3)
      setOptions(
        stopsOptions
          .filter(
            (stop) =>
              stop.code.includes(searchValue) || stop.name.includes(searchValue)
          )
          .slice(0, 10)
      );
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
      console.log("SELECT", stop.name);
      setSearchValue("");
      setOptions([]);
    };

  return (
    <div className="searchbar-wrapper">
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
  );
};
