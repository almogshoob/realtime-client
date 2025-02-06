import { create } from "zustand";
import { StopsSchedule, UserStops } from "../types";

// const userStopsAlmog: UserStops = {
//   25197: ["84", "84א"],
//   25192: ["84", "84א"],
//   35694: ["180", "292", "166", "470", "471", "472", "473"],
//   25092: ["292", "166", "472", "473", "68"],
//   39311: ["68", "70", "250"],
//   13274: ["68", "70", "180", "292"],
//   13207: ["68", "70", "292"],
//   15639: ["471"],
//   48863: ["R1", "R2", "R3"],
// };

// if (!localStorage.getItem("stops"))
//   localStorage.setItem("stops", JSON.stringify(userStopsAlmog));

type StopsStore = {
  userStops: UserStops;
  setUserStops: (userStops: UserStops) => void;
  setUserStop: (stopId: string, routes: string[]) => void;
  removeUserStop: (stopId: string) => void;
  stopsSchedule: StopsSchedule;
  setStopsSchedule: (stopsSchedule: StopsSchedule) => void;
};

const localStorageStops = JSON.parse(localStorage.getItem("stops") || "{}");

const useStopsStore = create<StopsStore>((set, _get) => ({
  userStops: localStorageStops,
  setUserStops: (userStops) => {
    localStorage.setItem("stops", JSON.stringify(userStops));
    set({ userStops });
  },
  setUserStop: (stopId, routes) => {
    set((state) => {
      const newUserStops = { ...state.userStops, [stopId]: routes };
      localStorage.setItem("stops", JSON.stringify(newUserStops));
      return { userStops: newUserStops };
    });
  },
  removeUserStop: (stopId) => {
    set((state) => {
      const { [stopId]: removed, ...newUserStops } = state.userStops;
      localStorage.setItem("stops", JSON.stringify(newUserStops));
      return { userStops: newUserStops };
    });
  },
  stopsSchedule: {},
  setStopsSchedule: (stopsSchedule) => set({ stopsSchedule }),
}));

export default useStopsStore;
