import { useEffect, useState } from "react";
import "./App.css";
import { stops as stopsStaticData } from "./assets/data";
import { Navbar, SearchBar, StopCard } from "./components";
import { RouteSchedule, Stop } from "./types";
import {
  getStopsSchedules,
  sortStopsByDistance,
  updateLastLocation,
} from "./utils";

const userStops: { [key: string]: string[] } = {
  38234: ["84", "84א"],
  38229: ["84", "84א"],
  37995: ["180", "292", "166", "470", "471", "472", "473"],
  38129: ["292", "166", "472", "473", "68"],
  30530: ["68", "70", "250"],
  22942: ["68", "70", "180", "292"],
  21684: ["68", "70", "292"],
  31366: ["471"],
  20717: ["R1", "R2", "R3"],
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [stops, setStops] = useState<
    {
      stopData: Stop;
      routes: RouteSchedule[];
    }[]
  >([]);

  const userStopsById = Object.fromEntries(
    Object.entries(userStops).map(([stopCode, routes]) => {
      const stopId = stopsStaticData.find((stop) => stop.code === stopCode)!.id;
      return [stopId, routes];
    })
  );

  const handleFetch = async () => {
    await updateLastLocation();
    setIsLoading(true);
    try {
      // const stopsScheduleData = DEMO_DATA;
      const stopsScheduleData = await getStopsSchedules(userStopsById);
      const stopsData = Object.entries(stopsScheduleData).map(
        ([stopId, routes]) => {
          const stopData = stopsStaticData.find((stop) => stop.id === stopId)!;
          return { stopData, routes };
        }
      );
      setStops(stopsData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("שגיאה");
    }
  };

  return (
    <>
      <Navbar handleRefresh={handleFetch} isLoading={isLoading} />
      <main className="content">
        <SearchBar />
        <div className="stop-list">
          {stops.sort(sortStopsByDistance).map(({ stopData, routes }) => (
            <StopCard key={stopData.id} stopData={stopData} routes={routes} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;

// TODO
// - search to add (suggest nearby?) + add modal
// - stop 3 dots menu: edit, delete
// - update time every 30s and clean past (then use minutes left instead of time)
// - use password (https://bigprimes.org/)
// - remove component not used (templates. icons)

// GET ROUTES IN STOP https://api.busnearby.co.il/directions/index/stops/1:48863/routes
