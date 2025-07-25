import { create } from "zustand";
import { Coordinate } from "../types";
import { getLastLocation } from "../utils";

type LocationStore = {
  location: Coordinate;
  setLocation: (location: Coordinate) => void;
};

export const useLocationStore = create<LocationStore>((set, _get) => ({
  location: getLastLocation(),
  setLocation: (location) => {
    localStorage.setItem("last-location", JSON.stringify(location));
    set({ location });
  },
}));
