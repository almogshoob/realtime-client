import { MapCard } from "../../components";
import { LocationLayer, StopsLayer } from "../../layers";
import "./MapPage.css";

export const MapPage = () => {
  return (
    <>
      <main className="content map-content">
        <div className="map-wrapper">
          <MapCard />
          <StopsLayer />
          <div className="map-action-buttons">
            <LocationLayer />
          </div>
        </div>
      </main>
    </>
  );
};
