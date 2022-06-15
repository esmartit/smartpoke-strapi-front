import { lazy } from "react";
const FullLayout = lazy(() => import("../_splayouts/FullLayout.js"));
const BlankLayout = lazy(() => import("../_splayouts/BlankLayout.js"));
var indexRoutes = [
  { path: "/authentication", name: "Athentication", component: BlankLayout },
  { path: "/", name: "Dashboard", component: FullLayout },
];

export default indexRoutes;
