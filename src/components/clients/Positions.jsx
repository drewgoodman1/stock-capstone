import React, { useEffect, useState } from "react";
import { getPositionsByClientId } from "../../services/clientServices.jsx";

export const Positions = ({ clientId }) => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (clientId) {
      getPositionsByClientId(clientId).then((currentPositions) => {
        setPositions(currentPositions);
      });
    }
  }, [clientId]);

  return (
    <>
      {positions.map((position) => (
        <div key={position.id}>
          {position.stock.ticker} - {position.shares} shares
        </div>
      ))}
    </>
  );
};
