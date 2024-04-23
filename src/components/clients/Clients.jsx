import { Button, Container, Row, Col } from "react-bootstrap";

export const Clients = () => {
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
            <Col className="text-center">AUM</Col>
            <Col className="text-center">Clients</Col>
            <Col className="text-center">Positions</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
