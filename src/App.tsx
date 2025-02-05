import { useMemo } from "react";
import "./App.css";
import { stops as stopsStaticData } from "./assets/data";
import { Navbar, SearchBar, StopCard } from "./components";
import useLocationStore from "./stores/location";
import useStopsStore from "./stores/stops";
import { Stop } from "./types";
import { toSortedByDistance } from "./utils";

function App() {
  const userStops = useStopsStore((state) => state.userStops);
  const location = useLocationStore((state) => state.location);

  const stops: Stop[] = useMemo(() => {
    return toSortedByDistance(
      Object.keys(userStops).map(
        (stopId) => stopsStaticData.find((stop) => stop.id === stopId)!
      ),
      location
    );
  }, [userStops, location]);

  return (
    <>
      <Navbar />
      <main className="content">
        <SearchBar />
        <div className="stop-list">
          {stops.map((stopData) => (
            <StopCard key={stopData.id} stopData={stopData} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;

// TODO
// - search to add
// - stop 3 dots menu: edit, delete
// - show routes from init without times --:-- (update each route individually)
// - location store
// - map to search nearby
// - update time every 30s and clean past (then use minutes left instead of time)
// - use password (https://bigprimes.org/)
// - remove component not used (templates. icons)

// GET ROUTES IN STOP https://api.busnearby.co.il/directions/index/stops/1:48863/routes
