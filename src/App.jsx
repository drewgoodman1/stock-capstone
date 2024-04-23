import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

import { BrokerViews } from "./views/BrokerViews.jsx";

const App = () => {
  return (
    <>
      <BrokerViews />
    </>
  );
};

export default App;
