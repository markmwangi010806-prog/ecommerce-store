
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import { StoreProvider } from "./context/StoreContext";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <App />
        <Toaster position="top-right" richColors />
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>
);
