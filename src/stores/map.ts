import { Map } from "maplibre-gl";
import { create } from "zustand";

type MapStore = {
  map?: Map;
  setMap: (map?: Map) => void;
};

export const useMapStore = create<MapStore>((set, _get) => ({
  map: undefined,
  setMap: (map) => set({ map }),
}));
