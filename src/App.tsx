import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { MainPage, MapPage } from "./pages";

const router = createHashRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/map/:lineId?",
    element: <MapPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// TODO
// - use try catch on requests?
// - display line route on map (option to reverse direction?)
// - display on map starred stops differently
// - home page option to expand stop and watch full schedule
// - in stop modal display routes options
// - store of modals, modals render only on Layout with Outlet
// - use password (https://bigprimes.org/)
