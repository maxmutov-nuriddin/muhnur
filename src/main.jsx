import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { installGlobalErrorReporting } from "./lib/reportError.js";
import "./styles/base.css";
import "./styles/book.css";
import "./styles/fold.css";
import "./styles/responsive.css";

installGlobalErrorReporting();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
