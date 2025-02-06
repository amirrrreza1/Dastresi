import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App/App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
