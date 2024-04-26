import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import {
  getBrokerByUserId,
  getClientsByBrokerId,
  getPositionsByClientId,
} from "../../services/clientServices.jsx";

import { Positions } from "../clients/Positions.jsx";
import { useEffect, useState } from "react";
import {
  buyStock,
  getStocks,
  sellAllStock,
  sellStock,
} from "../../services/equityServices.jsx";

export const Trading = ({ currentUser }) => {
  const [broker, setBroker] = useState({});
  const [clients, setClients] = useState([]);

  const [selectedClient, setSelectedClient] = useState(null);
  const [numberOfShares, setNumberOfShares] = useState("");
  const [tickerSymbol, setTickerSymbol] = useState(""); // Add tickerSymbol state

  const [stocks, setStocks] = useState([]);
  const [positions, setPositions] = useState([]);

  //for current broker
  useEffect(() => {
    if (currentUser.id) {
      getBrokerByUserId(currentUser.id).then((data) => {
        const brokerObject = data[0];
        setBroker(brokerObject);
      });
    }
  }, [currentUser.id]);

  //for current broker's clients
  useEffect(() => {
    if (broker.id) {
      getClientsByBrokerId(broker.id).then((brokerClients) => {
        setClients(brokerClients);
      });
    }
  }, [broker.id]);

  //for stocks available
  useEffect(() => {
    getStocks().then((currentStocks) => {
      setStocks(currentStocks);
    });
  }, []);

  useEffect(() => {
    getPositionsByClientId(selectedClient).then((currentPositions) => {
      setPositions(currentPositions);
    });
  }, [selectedClient]);

  //handle dropdown and form
  const handleClientSelect = (clientId) => {
    setSelectedClient(clientId);
  };

  const handleNumberOfSharesChange = (e) => {
    setNumberOfShares(e.target.value);
  };

  const handleTickerSymbolChange = (e) => {
    setTickerSymbol(e.target.value);
  };

  const handleBuy = async () => {
    const newPosition = {
      shares: parseInt(numberOfShares),
      purchasePrice: 1, // Placeholder value, replace with actual purchase price
      clientId: parseInt(selectedClient),
      stockId: parseInt(tickerSymbol), // Use tickerSymbol state as stockId
      typeID: 1, // Placeholder value, replace with actual type ID
    };

    buyStock(newPosition);

    setNumberOfShares("");
    setTickerSymbol(""); // Reset tickerSymbol after buy
  };

  const handleSell = () => {
    getPositionsByClientId(selectedClient).then((positions) => {
      const sellThisStock = positions.find(
        (position) => position.stockId === parseInt(tickerSymbol)
      );

      if (sellThisStock) {
        if (sellThisStock.shares === parseInt(numberOfShares)) {
          sellAllStock(sellThisStock);
        } else {
          sellThisStock.shares =
            sellThisStock.shares - parseInt(numberOfShares);
          console.log("Found position to sell:", sellThisStock);
          sellStock(sellThisStock);
        }
        // Reset form fields
        setNumberOfShares("");
        setTickerSymbol("");
      } else {
        console.log(
          "No position found to sell for ticker symbol:",
          tickerSymbol
        );
      }
    });
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
                {selectedClient && (
                  <>
                    {(() => {
                      const client = clients.find(
                        (client) => client.id === parseInt(selectedClient)
                      );
                      if (client) {
                        return (
                          <>
                            <Card.Text>
                              <strong>Selected Client:</strong>{" "}
                              {client.user?.fullName}
                            </Card.Text>
                            <Card.Text>
                              <strong>Email:</strong> {client.user?.email}
                            </Card.Text>
                            <Card.Text>
                              <strong>Cash:</strong> $
                              {client.cash.toLocaleString()}
                            </Card.Text>
                            <Card.Text>
                              <strong>Positions:</strong>{" "}
                              <Positions
                                clientId={selectedClient}
                                positions={positions}
                              />
                            </Card.Text>
                          </>
                        );
                      }
                      return null;
                    })()}
                  </>
                )}
              </Card.Body>
            </Card>
            <h2>Buy/Sell Form</h2>
            <Form>
              <Form.Group controlId="tickerSymbol">
                <Form.Label>Ticker Symbol</Form.Label>
                <Form.Select
                  value={tickerSymbol}
                  onChange={handleTickerSymbolChange}
                >
                  <option value="">Select a ticker symbol...</option>
                  {stocks.map((stock) => (
                    <option key={stock.id} value={stock.id}>
                      {stock.ticker}
                    </option>
                  ))}
                </Form.Select>
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
              <Button
                variant="success"
                onClick={handleBuy}
                disabled={!tickerSymbol || !numberOfShares}
              >
                Buy
              </Button>
              <Button
                variant="danger"
                onClick={handleSell}
                disabled={!tickerSymbol || !numberOfShares}
              >
                Sell
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};
