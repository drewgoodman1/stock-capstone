import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { getPositionsByClientId } from "../../services/clientServices.jsx";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { Research } from "./Research.jsx";

export const ClientTradingProfile = ({
  client,
  setClient,
  positions,
  setPositions,
}) => {
  const [portfolioChart, setPortfolioChart] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });
  useEffect(() => {
    getPositionsByClientId(client.id).then((data) => {
      setPositions(data);
    });
  }, [client.id]);

  useEffect(() => {
    if (positions && positions.length > 0) {
      const labels = positions.map((position) => position.ticker);
      const positionValue = positions.map(
        (position) => position.shares * position.purchasePrice
      );

      setPortfolioChart({
        labels: labels,
        datasets: [
          {
            label: "Portfolio",
            data: positionValue,
            backgroundColor: [
              "#3772FF",
              "#F038FF",
              "#EF709D",
              "#E2EF70",
              "#70E4EF",
            ],
          },
        ],
      });
    }
  }, [positions]);

  return (
    <>
      {client.user && (
        <Card>
          <Card.Body>
            <>
              <Card.Title>{client.user.fullName}</Card.Title>
              <Card.Text>Email: {client.user.email}</Card.Text>
              <Card.Text>Cash: ${client.cash}</Card.Text>
              {positions.length > 0 && (
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <div style={{ height: "200px", width: "200px" }}>
                        <Pie data={portfolioChart} />
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
              <Row>
                <Col>
                  <Research
                    client={client}
                    setClient={setClient}
                    positions={positions}
                    setPositions={setPositions}
                  />{" "}
                  {/* Include the Research component */}
                </Col>
              </Row>
            </>
          </Card.Body>
        </Card>
      )}
    </>
  );
};
/*export const ClientTradingProfile = ({ client }) => {
  const [positions, setPositions] = useState([]);

  const [portfolioChart, setPortfolioChart] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });

  useEffect(() => {
    getPositionsByClientId(client.id).then((data) => {
      setPositions(data);
    });
  }, [client.id]);

  useEffect(() => {
    if (positions) {
      const labels = positons.map((position) => position.ticker);
      const postionValue = posiitons.map(
        (position) => position.shares * position.purchasePrice
      );
    }
    setPortfolioChart({
      labels: labels,
      datasets: [
        {
          label: "Portfolio",
          data: positionValue,
          type: "pie",
        },
      ],
    });
  }, []);

  return (
    <>
      {client.user && (
        <Card>
          <Card.Body>
            <>
              <Card.Title>{client.user.fullName}</Card.Title>
              <Card.Text>Email: {client.user.email}</Card.Text>
              <Card.Text>Cash: ${client.cash}</Card.Text>
            </>
          </Card.Body>
        </Card>
      )}
    </>
  );
};*/
