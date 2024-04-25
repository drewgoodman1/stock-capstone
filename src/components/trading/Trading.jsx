import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import {
  getBrokerByUserId,
  getClientsByBrokerId,
} from "../../services/clientServices.jsx";

import { Positions } from "../clients/Positions.jsx";
import { useEffect, useState } from "react";

export const Trading = ({ currentUser }) => {
  const [broker, setBroker] = useState({});
  const [clients, setClients] = useState([]);

  const [selectedClient, setSelectedClient] = useState(null);
  const [tickerSymbol, setTickerSymbol] = useState("");
  const [numberOfShares, setNumberOfShares] = useState("");

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

  const handleClientSelect = (clientId) => {
    setSelectedClient(clientId);
  };

  const handleTickerSymbolChange = (e) => {
    setTickerSymbol(e.target.value);
  };

  const handleNumberOfSharesChange = (e) => {
    setNumberOfShares(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., call an API to process the buy/sell action
    console.log("Ticker Symbol:", tickerSymbol);
    console.log("Number of Shares:", numberOfShares);
    // Reset form fields after submission
    setTickerSymbol("");
    setNumberOfShares("");
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Select a Client</h1>
          <Form.Select onChange={(e) => handleClientSelect(e.target.value)}>
            <option>Select a client...</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.user.fullName}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      {selectedClient && (
        <Row>
          <Col>
            <h2>Client Details</h2>
            <Card className="mb-3">
              <Card.Body>
                <Card.Text>
                  <strong>Selected Client:</strong>{" "}
                  {
                    clients.find((client) => client.id === selectedClient)?.user
                      ?.fullName
                  }
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong>{" "}
                  {selectedClient &&
                    clients.find((client) => client.id === selectedClient)?.user
                      ?.email}
                </Card.Text>
                <Card.Text>
                  <strong>Cash:</strong> $
                  {selectedClient &&
                    clients
                      .find((client) => client.id === selectedClient)
                      ?.cash.toLocaleString()}
                </Card.Text>
                <Card.Text>
                  <strong>Positions:</strong>{" "}
                  {selectedClient && <Positions clientId={selectedClient} />}
                </Card.Text>
              </Card.Body>
            </Card>
            <h2>Buy/Sell Form</h2>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="tickerSymbol">
                <Form.Label>Ticker Symbol</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ticker symbol"
                  value={tickerSymbol}
                  onChange={handleTickerSymbolChange}
                />
              </Form.Group>
              <Form.Group controlId="numberOfShares">
                <Form.Label>Number of Shares</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter number of shares"
                  value={numberOfShares}
                  onChange={handleNumberOfSharesChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};
