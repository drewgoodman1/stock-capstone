import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { BrokerNav } from "../components/nav/BrokerNav.jsx";
import { Welcome } from "../components/welcome/Welcome.jsx";

export const BrokerViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <BrokerNav />
            <Outlet />
          </>
        }
      >
        {/* Nested Route components */}
        <Route index element={<Welcome />} />
        <Route path="/clients" element={<h1>Honky</h1>} />
        <Route path="/trading" element={<h1>Trading Gains</h1>} />
      </Route>
    </Routes>
  );
};
