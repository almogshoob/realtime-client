import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { MainPage, MapPage } from "./pages";

const router = createHashRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/map",
    element: <MapPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// TODO
// - map as another page
// - store of modals, modals render only on Layout with Outlet
// - add stop using map
// - focus to location and update untill off
// - show line route on map
// NTH
// - use password (https://bigprimes.org/)
// GET ROUTES IN STOP https://api.busnearby.co.il/directions/index/stops/1:48863/routes
