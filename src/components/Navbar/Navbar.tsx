import { useEffect, useState } from "react";
import { RefreshIcon } from "../../assets/icons";
import { useLocationStore, useStopsStore } from "../../stores";
import { getDeviceLocation, getStopsSchedules } from "../../utils";
import "./Navbar.css";

export const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const userStops = useStopsStore((state) => state.userStops);
  const setStopsSchedule = useStopsStore((state) => state.setStopsSchedule);
  const setLocation = useLocationStore((state) => state.setLocation);

  const handleFetch = async () => {
    setIsLoading(true);
    try {
      const res = await Promise.all([
        getDeviceLocation(),
        getStopsSchedules(userStops),
      ]);
      if (res[0]) setLocation(res[0]);
      // setStopsSchedule(DEMO_DATA);
      setStopsSchedule(res[1]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("שגיאה");
    }
  };

  useEffect(() => {
    getDeviceLocation().then((location) => {
      if (location) setLocation(location);
    });
  }, []);

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
