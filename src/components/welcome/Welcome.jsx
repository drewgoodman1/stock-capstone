import { Container, Row, Col } from "react-bootstrap";

export const Welcome = () => {
  return (
    <Container fluid>
      <Row>
        <Col className="text-center" style={{ paddingTop: "80px" }}>
          <h1>Honky Stonks??</h1>
        </Col>
      </Row>
      <Row>
        <Col className="text-center" style={{ paddingTop: "60px" }}>
          <h4>Market info coming soon</h4>
        </Col>
      </Row>
    </Container>
  );
};
