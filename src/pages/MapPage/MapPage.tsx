import { MapCard } from "../../components";
import "./MapPage.css"

export const MapPage = () => {
  return (
    <>
      <main className="content map-content">
        <div className="map-modal">
          <MapCard />
        </div>
      </main>
      {/* {selectedStop && (
        <EditModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          stopData={selectedStop}
          mode="add"
        />
      )} */}
    </>
  );
};
