import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { BrokerNav } from "../components/nav/BrokerNav.jsx";
import { Welcome } from "../components/welcome/Welcome.jsx";
import { Clients } from "../components/clients/Clients.jsx";

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
        <Route path="/clients" element={<Clients />} />
        <Route path="/trading" element={<h1>Trading Gains</h1>} />
      </Route>
    </Routes>
  );
};
