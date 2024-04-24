import { useEffect, useState } from "react";
import { BrokerNav } from "../components/nav/BrokerNav.jsx";
import { BrokerViews } from "./BrokerViews.jsx";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localBrokerUser = localStorage.getItem("broker_user");
    const brokerUserObject = JSON.parse(localBrokerUser);
    setCurrentUser(brokerUserObject);
  }, []);
  return (
    <>
      <BrokerViews currentUser={currentUser} />
    </>
  );
};
