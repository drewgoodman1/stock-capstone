import { Outlet, Route, Routes } from "react-router-dom";
import { BrokerNav } from "../components/nav/BrokerNav.jsx";
import { Welcome } from "../components/welcome/Welcome.jsx";
import { Clients } from "../components/clients/Clients.jsx";
import { Home } from "../components/home/Home.jsx";
import { Trading } from "../components/trading/Trading.jsx";

export const BrokerViews = ({ currentUser }) => {
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
        <Route path="/home" element={<Home currentUser={currentUser} />} />
        <Route
          path="/clients"
          element={<Clients currentUser={currentUser} />}
        />
        <Route
          path="/trading"
          element={<Trading currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
