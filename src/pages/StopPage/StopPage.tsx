import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { stopsData } from "../../assets/data";
import { Navbar, StopCard } from "../../components";
import { RouteSchedule } from "../../types";
import { getStopSchedule } from "../../utils";

export const StopPage = () => {
  const routeParam = useParams();
  const stopId = routeParam.stopId!;

  const [routes, setRoutes] = useState<RouteSchedule[]>([]);

  const navRefresh = async () => {
    const routes = await getStopSchedule(stopId);
    setRoutes(routes);
  };

  return (
    <>
      <Navbar refresh={navRefresh} />
      <main className="content">
        <StopCard stopData={stopsData[stopId]} routesOverride={routes} />
      </main>
    </>
  );
};
