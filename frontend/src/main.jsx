import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
import UserRoute from "./routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserRoute />
  </StrictMode>
);
