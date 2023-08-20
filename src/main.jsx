import React from "react";
import ReactDOM from "react-dom/client";
// import { LandingPage } from "./pages/home/landing/LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/main.css";
import { Routing } from "./Router";
// import { RegisterPage } from "./pages/home/auth/RegisterPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
