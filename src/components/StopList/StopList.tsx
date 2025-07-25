import { useMemo } from "react";
import { stopsData } from "../../assets/data";
import { useLocationStore, useStopsStore } from "../../stores";
import { Stop } from "../../types";
import { toSortedByDistance } from "../../utils";
import { StopCard } from "../StopCard/StopCard";
import "./StopList.css";

export const StopList = () => {
  const userStops = useStopsStore((state) => state.userStops);
  const location = useLocationStore((state) => state.location);

  const stops: Stop[] = useMemo(() => {
    return toSortedByDistance(
      Object.keys(userStops).map((stopId) => stopsData[stopId]),
      location
    );
  }, [userStops, location]);

  return (
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
  );
};
