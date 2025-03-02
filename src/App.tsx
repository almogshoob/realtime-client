import { useMemo } from "react";
import "./App.css";
import { Navbar, SearchBar, StopCard } from "./components";
import useLocationStore from "./stores/location";
import useStopsStore from "./stores/stops";
import { Stop } from "./types";
import { toSortedByDistance } from "./utils";
import { stopsData } from "./assets/data";

function App() {
  const userStops = useStopsStore((state) => state.userStops);
  const location = useLocationStore((state) => state.location);

  const stops: Stop[] = useMemo(() => {
    return toSortedByDistance(
      Object.keys(userStops).map((stopId) => stopsData[stopId]),
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
          {!stops.length && (
            <div className="no-data">
              <p>אין כאן תחנות 😯</p>
              <p>השתמשו בחיפוש כדי להוסיף תחנה</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;

// TODO
// - enhance search
// - add stop using map
// - focus to location and update untill off
// NTH
// - use password (https://bigprimes.org/)
// - remove component not used (templates. icons)
// GET ROUTES IN STOP https://api.busnearby.co.il/directions/index/stops/1:48863/routes
