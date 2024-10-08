import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter, Routes, Route } from "react-router-dom";
import PageNationOnly from "./PageNationOnly";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HashRouter>
    <Routes>
      <Route path="/*" element={<App />} />
      <Route path="/page" element={<PageNationOnly />} />
    </Routes>
  </HashRouter>
);
