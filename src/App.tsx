import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import "./App.css";
import { MainPage, MapPage, StopPage } from "./pages";

const router = createHashRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/map/:lineId?",
    element: <MapPage />,
  },
  {
    path: "/stop/:stopId",
    element: <StopPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// TODO

// map route:
// - fix bug stops not always displayed
// - reverse direction?

// - add stop route full schedule (where?)
// - display unsaved stop live schedule (from map)

// - different map icon for starred stops
// - in add stop modal display routes options

// - store of modals, modals render only on Layout with Outlet
// - use password (https://bigprimes.org/)
