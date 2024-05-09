import { Outlet, Route, Routes } from "react-router-dom";
import { BrokerNav } from "../components/nav/BrokerNav.jsx";
import { Welcome } from "../components/welcome/Welcome.jsx";
import { Clients } from "../components/clients/Clients.jsx";
//import { Home } from "../components/home/Home.jsx";
import { Trading } from "../components/trading/Trading.jsx";
//import { BasicChart } from "../components/home/BasicChart.jsx";
import { TopGainers } from "../components/home/TopGainers.jsx";
import { BasicChart } from "../components/home/BasicChart.jsx";
import { NewTrading } from "../components/trading/NewTrading.jsx";

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
        <Route
          path="/home"
          element={<TopGainers currentUser={currentUser} />}
        />
        <Route
          path="/clients"
          element={<BasicChart currentUser={currentUser} />}
        />
        <Route
          path="/trading"
          element={<NewTrading currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
