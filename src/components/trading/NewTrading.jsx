import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import {
  getBrokerByUserId,
  getClientsByBrokerId,
  getPositionsByClientId,
} from "../../services/clientServices.jsx";
import { ClientTradingProfile } from "./ClientTradingProfile.jsx";

import { Research } from "./Research.jsx";

export const NewTrading = ({ currentUser }) => {
  const [broker, setBroker] = useState();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // Fetch broker and clients for the current user
    const fetchData = async () => {
      if (currentUser.id) {
        const brokerData = await getBrokerByUserId(currentUser.id);
        const brokerObject = brokerData[0];
        setBroker(brokerObject);

        if (brokerObject && brokerObject.id) {
          const brokerClients = await getClientsByBrokerId(brokerObject.id);
          setClients(brokerClients);
        }
      }
    };

    fetchData();
  }, [currentUser.id]);

  useEffect(() => {
    const fetchPositions = async () => {
      if (selectedClient && selectedClient.id) {
        // Fetch positions for the selected client
        const clientPositions = await getPositionsByClientId(selectedClient.id);
        setPositions(clientPositions);
      }
    };

    fetchPositions();
  }, [selectedClient]);

  const handleClientSelect = (clientId) => {
    const selected = clients.find((client) => client.id === parseInt(clientId));
    setSelectedClient(selected);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <br></br>
          <h4>Select a Client</h4>
          <Form.Select
            onChange={(event) => handleClientSelect(event.target.value)}
          >
            <option>Select a client ..</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.user.fullName}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <br />
      {selectedClient && (
        <>
          <Row>
            <Col>
              <ClientTradingProfile
                client={selectedClient}
                setClient={setSelectedClient}
                positions={positions}
                setPositions={setPositions}
              />
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
        </>
      )}
    </Container>
  );
};
