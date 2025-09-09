import { Navbar, SearchBar, StopList } from "../../components";
import { useLocationStore, useStopsStore } from "../../stores";
import { getDeviceLocation, getStopsSchedules } from "../../utils";

export const MainPage = () => {
  const getUserStops = useStopsStore((state) => state.getUserStops);
  const setStopsSchedule = useStopsStore((state) => state.setStopsSchedule);
  const setLocation = useLocationStore((state) => state.setLocation);

  const navRefresh = async () => {
    const res = await Promise.all([
      getDeviceLocation(),
      getStopsSchedules(getUserStops()),
    ]);
    if (res[0]) setLocation(res[0]);
    // setStopsSchedule(DEMO_DATA);
    setStopsSchedule(res[1]);
  };

  return (
    <>
      <Navbar refresh={navRefresh} />
      <main className="content">
        <SearchBar />
        <StopList />
      </main>
    </>
  );
};
