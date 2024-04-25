import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import {
  getBrokerByUserId,
  getClientsByBrokerId,
} from "../../services/clientServices.jsx";
import { Positions } from "./Positions.jsx";

export const Clients = ({ currentUser }) => {
  const [broker, setBroker] = useState({});
  const [clients, setClients] = useState([]);

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

  const renderClientCards = () => {
    return clients.map((client) => (
      <Col key={client.id} xs={12} sm={6} md={4} lg={3}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>{client.user.fullName}</Card.Title>
            <Card.Text>Email: {client.user.email}</Card.Text>
            <Card.Text>Cash: ${client.cash.toLocaleString()}</Card.Text>
            <Card.Text>{<Positions clientId={client.id} />}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <Container fluid>
      <Row>{renderClientCards()}</Row>
    </Container>
  );
};
