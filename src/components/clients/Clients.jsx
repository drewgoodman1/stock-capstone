import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import {
  getBrokerByUserId,
  getClientsByBrokerId,
} from "../../services/clientServices.jsx";

export const Clients = ({ currentUser }) => {
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
        <Col className="text-center col-3" style={{ paddingTop: "80px" }}>
          <div style={{ marginBottom: "10px" }}>
            <Button>Open Account</Button>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Button>Reports</Button>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Button>Schedule Appointment</Button>
          </div>
        </Col>
        <Col className="text-center col-9" style={{ paddingTop: "80px" }}>
          <div>Book of Business</div>
          <Row style={{ paddingTop: "80px" }}>
            <Col className="text-center">
              AUM
              <div>${totalCash.toLocaleString()}</div>{" "}
              {/* Display total cash */}
            </Col>
            <Col className="text-center">Clients</Col>
            <Col className="text-center">Positions</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

/*export const Clients = ({ currentUser }) => {
  const [broker, setBroker] = useState({});
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (currentUser.id) {
      getBrokerByUserId(currentUser.id).then((data) => {
        const brokerObject = data[0];
        setBroker(brokerObject);
      });
    }
    if (broker.id) {
      getClientsByBrokerId(broker.id).then((brokerClients) => {
        setClients(brokerClients);
      });
    }
  }, [broker.id, currentUser.id]);

  return (
    <Container fluid>
      <Row>
        <Col className="text-center col-3" style={{ paddingTop: "80px" }}>
          <div style={{ marginBottom: "10px" }}>
            <Button>Open Account</Button>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Button>Reports</Button>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Button>Schedule Appointment</Button>
          </div>
        </Col>
        <Col className="text-center col-9" style={{ paddingTop: "80px" }}>
          <div>Book of Business</div>
          <Row style={{ paddingTop: "80px" }}>
            <Col className="text-center">
              AUM
              <div>clients</div>
            </Col>
            <Col className="text-center">Clients</Col>
            <Col className="text-center">Positions</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};*/
