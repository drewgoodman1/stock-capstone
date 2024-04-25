import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import {
  getBrokerByUserId,
  getClientsByBrokerId,
} from "../../services/clientServices.jsx";

export const Home = ({ currentUser }) => {
  const [broker, setBroker] = useState({});
  const [clients, setClients] = useState([]);
  const [totalAUM, setTotalAUM] = useState(0);
  const [topClients, setTopClients] = useState([]);
  const [topPositions, setTopPositions] = useState([]);

  useEffect(() => {
    if (currentUser.id) {
      getBrokerByUserId(currentUser.id).then((data) => {
        const brokerObject = data[0];
        setBroker(brokerObject);
      });
    }
  }, [currentUser.id]);

  useEffect(() => {
    if (broker.id) {
      getClientsByBrokerId(broker.id).then((brokerClients) => {
        setClients(brokerClients);

        // Calculate total AUM
        const totalAum = brokerClients.reduce((total, client) => {
          return total + client.cash;
        }, 0);
        setTotalAUM(totalAum);

        // Find top clients (you can adjust this logic based on your criteria)
        const sortedClients = [...brokerClients].sort(
          (a, b) => b.totalInvestment - a.totalInvestment
        );
        const topClients = sortedClients.slice(0, 3);
        setTopClients(topClients);

        // Find top positions (you can adjust this logic based on your criteria)
        const allPositions = brokerClients.flatMap(
          (client) => client.positions
        );
        const positionCounts = allPositions.reduce((counts, position) => {
          counts[position] = (counts[position] || 0) + 1;
          return counts;
        }, {});
        const sortedPositions = Object.entries(positionCounts).sort(
          (a, b) => b[1] - a[1]
        );
        const topPositions = sortedPositions.slice(0, 3);
        setTopPositions(topPositions);
      });
    }
  }, [broker.id]);

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col xs={12} md={4} className="text-center">
          <Card>
            <Card.Body>
              <Card.Title>Actions</Card.Title>
              <div style={{ marginBottom: "10px" }}>
                <Button block>Open Account</Button>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Button block>Reports</Button>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Button block>Schedule Appointment</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={8} className="text-center">
          <Card>
            <Card.Body>
              <Card.Title>Book of Business</Card.Title>
              <Row className="mt-4">
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title>Total AUM</Card.Title>
                      <Card.Text>${totalAUM.toLocaleString()}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title>Top Clients</Card.Title>
                      <Card.Text>
                        {topClients.map((client) => (
                          <div key={client.id}>{client.name}</div>
                        ))}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title>Top Positions</Card.Title>
                      <Card.Text>
                        {topPositions.map(([position, count]) => (
                          <div key={position}>{`${position}: ${count}`}</div>
                        ))}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

/*import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import {
  getBrokerByUserId,
  getClientsByBrokerId,
} from "../../services/clientServices.jsx";

export const Home = ({ currentUser }) => {
  const [broker, setBroker] = useState({});
  const [clients, setClients] = useState([]);
  // Calculate total cash using reduce method directly on clients state
  const totalCash = clients.reduce((total, client) => {
    return total + client.cash;
  }, 0);

  useEffect(() => {
    if (currentUser.id) {
      getBrokerByUserId(currentUser.id).then((data) => {
        const brokerObject = data[0];
        setBroker(brokerObject);
      });
    }
  }, [currentUser.id]);

  useEffect(() => {
    if (broker.id) {
      getClientsByBrokerId(broker.id).then((brokerClients) => {
        setClients(brokerClients);
      });
    }
  }, [broker.id]);

  return (
    <Container fluid>
      <Row>
        <Col
          xs={12}
          md={4}
          className="text-center"
          style={{ paddingTop: "80px" }}
        >
          <div style={{ marginBottom: "10px" }}>
            <Button block>Open Account</Button>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Button block>Reports</Button>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Button block>Schedule Appointment</Button>
          </div>
        </Col>
        <Col
          xs={12}
          md={8}
          className="text-center"
          style={{ paddingTop: "80px" }}
        >
          <div>Book of Business</div>
          <Row style={{ paddingTop: "80px" }}>
            <Col className="text-center">
              AUM
              <div>${totalCash.toLocaleString()}</div>{" "}
              {/* Display total cash */
// </Col>
/* <Col className="text-center">Clients</Col>
            <Col className="text-center">Positions / Top client posiotns</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};*/
