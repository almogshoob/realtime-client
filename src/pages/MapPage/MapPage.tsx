import { useParams } from "react-router-dom";
import { stopsDataList } from "../../assets/data";
import { MapCard } from "../../components";
import { LocationLayer, RouteLayer, StopsLayer } from "../../layers";
import "./MapPage.css";

export const MapPage = () => {
  const routeParam = useParams();
  const { lineId } = routeParam;

  return (
    <>
      <main className="content map-content">
        <div className="map-wrapper">
          <MapCard />
          {lineId ? (
            <RouteLayer routePatternId={lineId} />
          ) : (
            <StopsLayer stops={stopsDataList} />
          )}
          <div className="map-action-buttons">
            <LocationLayer />
          </div>
        </div>
      </main>
    </>
  );
};
