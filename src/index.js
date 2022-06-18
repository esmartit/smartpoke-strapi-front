import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import Spinner from "./_spviews/_spspinner/Spinner";
import "./assets/scss/style.scss";
import "./data";

// setup fake backend
import { ConfigureBackend } from "./_spjwt/_sphelpers";
ConfigureBackend();
const App = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import("./app")), 0);
    })
);

ReactDOM.render(
  <Suspense fallback={<Spinner />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);
