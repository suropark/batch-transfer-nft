import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Vault } from "./pages";

function App() {
  return;
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Vault />} />
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* <Route path="*" element={<NotFound />} />  */}
    </Routes>
  </BrowserRouter>;
}

export default App;
