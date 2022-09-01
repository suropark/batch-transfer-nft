import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./components/Layout";
import { NftTransfer } from "./pages";
import { Button } from "@mui/joy";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/nft" />} />
          <Route path="/nft" element={<NftTransfer />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          {/* <Route path="*" element={<NotFound />} />  */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
