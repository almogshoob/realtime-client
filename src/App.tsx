import { useMemo } from "react";
import "./App.css";
import { stops as stopsStaticData } from "./assets/data";
import { Navbar, SearchBar, StopCard } from "./components";
import useStopsStore from "./stores/stops";
import { Stop } from "./types";
import { sortStopsByDistance } from "./utils";

function App() {
  const userStops = useStopsStore((state) => state.userStops);

  const stops: Stop[] = useMemo(
    () =>
      Object.keys(userStops).map(
        (stopId) => stopsStaticData.find((stop) => stop.id === stopId)!
      ),
    [userStops]
  );

  return (
    <>
      <Navbar />
      <main className="content">
        <SearchBar />
        <div className="stop-list">
          {stops.sort(sortStopsByDistance).map((stopData) => (
            <StopCard key={stopData.id} stopData={stopData} />
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
