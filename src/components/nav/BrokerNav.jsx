import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const BrokerNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("broker_user");
    navigate("/", { replace: true });
  };

  return (
    <Navbar bg="light" variant="light" expand="md" className="sticky-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Stonky Tonk
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/clients">
              Clients
            </Nav.Link>
            <Nav.Link as={Link} to="/trading">
              Trading
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{ marginRight: "15px" }} onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
