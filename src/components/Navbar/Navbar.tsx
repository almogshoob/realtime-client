import { useState } from "react";
import { RefreshIcon } from "../../assets/icons";
import useStopsStore from "../../stores/stops";
import { getStopsSchedules, updateLastLocation } from "../../utils";
import "./Navbar.css";

export const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const userStops = useStopsStore((state) => state.userStops);
  const setStopsSchedule = useStopsStore((state) => state.setStopsSchedule);
  
  const handleFetch = async () => {
    setIsLoading(true);
    try {
      const res = await Promise.all([
        updateLastLocation(),
        getStopsSchedules(userStops),
      ]);
      // const stopsScheduleData = DEMO_DATA;
      const stopsScheduleData = res[1];
      setStopsSchedule(stopsScheduleData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("שגיאה");
    }
  };

  return (
    <nav className="nav">
      <h1>Real Time</h1>
      <button
        className="icon-button"
        disabled={isLoading}
        onClick={handleFetch}
      >
        <RefreshIcon />
      </button>
    </nav>
  );
};
