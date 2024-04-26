/*import React, { useEffect, useState } from "react";
import { getPositionsByClientId } from "../../services/clientServices.jsx";

export const Positions = ({ positions }) => {
  //
  //passing clientId
  //const [positions, setPositions] = useState([]);

  /*useEffect(() => {
    if (clientId) {
      getPositionsByClientId(clientId).then((currentPositions) => {
        setPositions(currentPositions);
      });
    }
  }, [clientId]);*/

export const Positions = ({ positions }) => {
  return (
    <>
      {positions &&
        positions.map((position) => (
          <div key={position.id}>
            {position.stock.ticker} - {position.shares} shares
          </div>
        ))}
    </>
  );
};
